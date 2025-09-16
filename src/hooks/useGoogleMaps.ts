import { useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { IStoreLocation } from "@/types";

import {
  storeMarkerStyles,
  clickMarkerStyles,
} from "@/utils/styles/mapMarkerStyles";

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;

const libraries: "marker"[] = ["marker"];

const useGoogleMaps = (
  items: IStoreLocation[],
  center: google.maps.LatLngLiteral,
  onLocationSelect?: (coords: google.maps.LatLng) => void,
  addressRef?: React.RefObject<HTMLInputElement | null>,
) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const markersRef = useRef<
    Map<string, google.maps.marker.AdvancedMarkerElement>
  >(new Map());

  const clickMarkerRef =
    useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries,
    mapIds: [GOOGLE_MAP_ID],
    language: navigator.language || "en",
  });

  const createMarkerDiv = (
    name: string,
    styles: typeof storeMarkerStyles | typeof clickMarkerStyles,
  ) => {
    const markerDiv = document.createElement("div");

    Object.assign(markerDiv.style, styles.container);

    if (name && styles.label) {
      const label = document.createElement("div");

      label.textContent = name;
      Object.assign(label.style, styles.label);
      markerDiv.appendChild(label);
    }

    if (styles.circle?.background) {
      const markerCircle = document.createElement("div");

      Object.assign(markerCircle.style, styles.circle);
      markerDiv.appendChild(markerCircle);
    }

    return markerDiv;
  };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    geocoderRef.current = new google.maps.Geocoder();

    items.forEach((store) => {
      if (markersRef.current.has(store.id)) return;

      const markerDiv = createMarkerDiv(store.name, storeMarkerStyles);

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: store.lat, lng: store.lng },
        content: markerDiv,
      });

      markersRef.current.set(store.id, marker);
    });
  };

  const onUnmount = () => {
    markersRef.current.forEach((marker) => (marker.map = null));
    markersRef.current.clear();

    if (clickMarkerRef.current) {
      clickMarkerRef.current.map = null;
      clickMarkerRef.current = null;
    }

    mapRef.current = null;
    geocoderRef.current = null;
  };

  const placeClickMarker = (
    position: google.maps.LatLng | google.maps.LatLngLiteral,
  ) => {
    if (!mapRef.current) return;

    if (!clickMarkerRef.current) {
      const markerDiv = createMarkerDiv("", clickMarkerStyles);

      clickMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        content: markerDiv,
        title: "Selected location",
      });
    }

    clickMarkerRef.current.position = position;
    mapRef.current.setCenter(position);
    mapRef.current.setZoom(14);

    if (position instanceof google.maps.LatLng) {
      onLocationSelect?.(position);
    }
  };

  const onClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng || !geocoderRef.current) return;

    placeClickMarker(event.latLng);

    if (addressRef?.current) {
      geocoderRef.current.geocode(
        { location: event.latLng },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            const inputWithFormValue =
              addressRef.current as HTMLInputElement & {
                setFormValue?: (address: string) => void;
              };

            if (inputWithFormValue?.setFormValue) {
              inputWithFormValue.setFormValue(results[0].formatted_address);
            } else {
              inputWithFormValue.value = results[0].formatted_address;
            }
          }
        },
      );
    }
  };

  const geocodeAddress = (address: string) => {
    if (!geocoderRef.current) return;

    geocoderRef.current.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;

        placeClickMarker(location);
      }
    });
  };

  const updateMarkers = () => {
    if (!mapRef.current || !isLoaded) return;

    items.forEach((store) => {
      if (markersRef.current.has(store.id)) return;

      const markerDiv = createMarkerDiv(store.name, storeMarkerStyles);

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: { lat: store.lat, lng: store.lng },
        content: markerDiv,
      });

      markersRef.current.set(store.id, marker);
    });

    markersRef.current.forEach((marker, id) => {
      if (!items.some((store) => store.id === id)) {
        marker.map = null;
        markersRef.current.delete(id);
      }
    });
  };

  const mapOptions: google.maps.MapOptions = {
    center,
    zoom: 12,
    mapId: GOOGLE_MAP_ID,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: true,
  };

  return {
    isLoaded,
    onLoad,
    onUnmount,
    onClick,
    mapOptions,
    geocodeAddress,
    updateMarkers,
  };
};

export { useGoogleMaps };
