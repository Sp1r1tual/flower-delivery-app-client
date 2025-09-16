import { useEffect, useRef, useState, useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { IStoreLocation } from "@/types";
import { markerStyles } from "@/utils/styles/markerStyles";

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;

const useGoogleMaps = (
  items: IStoreLocation[],
  center: google.maps.LatLngLiteral,
  onLocationSelect?: (coords: google.maps.LatLng) => void,
  addressRef?: React.RefObject<HTMLInputElement | null>,
) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<
    Map<string, google.maps.marker.AdvancedMarkerElement>
  >(new Map());
  const clickMarker = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null,
  );

  const [mapReady, setMapReady] = useState(false);

  const placeClickMarker = useCallback(
    (position: google.maps.LatLng | google.maps.LatLngLiteral) => {
      if (!googleMapInstance.current) return;

      const { AdvancedMarkerElement } = google.maps.marker;

      if (!clickMarker.current) {
        const markerDiv = document.createElement("div");
        Object.assign(markerDiv.style, markerStyles.clickCircle);

        clickMarker.current = new AdvancedMarkerElement({
          position,
          map: googleMapInstance.current,
          content: markerDiv,
          title: "Selected location",
        });
      } else {
        clickMarker.current.position = position;
      }

      googleMapInstance.current.setCenter(position);
      googleMapInstance.current.setZoom(14);

      if (position instanceof google.maps.LatLng) {
        onLocationSelect?.(position);
      }
    },
    [onLocationSelect],
  );

  useEffect(() => {
    if (!mapRef.current) return;

    const loadMap = async () => {
      const loader = new Loader({
        apiKey: GOOGLE_MAP_API_KEY,
        version: "weekly",
        mapIds: [GOOGLE_MAP_ID],
      });

      await loader.importLibrary("marker");

      if (!mapRef.current) return;

      googleMapInstance.current = new google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
        mapId: GOOGLE_MAP_ID,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
      });

      setMapReady(true);
    };

    loadMap();
  }, [center]);

  useEffect(() => {
    if (!googleMapInstance.current) return;

    const geocoder = new google.maps.Geocoder();
    const map = googleMapInstance.current;

    const handleClick = (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;

      placeClickMarker(event.latLng);

      if (addressRef?.current) {
        geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const inputWithFormValue =
              addressRef.current as HTMLInputElement & {
                setFormValue?: (address: string) => void;
              };

            if (inputWithFormValue.setFormValue) {
              inputWithFormValue.setFormValue(results[0].formatted_address);
            } else {
              inputWithFormValue.value = results[0].formatted_address;
            }
          }
        });
      }
    };

    const listener = map.addListener("click", handleClick);

    return () => listener.remove();
  }, [mapReady, addressRef, placeClickMarker]);

  useEffect(() => {
    if (!googleMapInstance.current || !addressRef?.current) return;

    const geocoder = new google.maps.Geocoder();
    const inputEl = addressRef.current;

    const handleBlur = () => {
      const address = inputEl?.value;

      if (!address) return;

      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location;

          placeClickMarker(location);
        }
      });
    };

    inputEl.addEventListener("blur", handleBlur);
    return () => inputEl.removeEventListener("blur", handleBlur);
  }, [mapReady, addressRef, placeClickMarker]);

  useEffect(() => {
    if (!googleMapInstance.current || !mapReady) return;

    const { AdvancedMarkerElement } = google.maps.marker;

    items.forEach((store) => {
      if (markersRef.current.has(store.id)) return;

      const markerDiv = document.createElement("div");
      Object.assign(markerDiv.style, markerStyles.container);

      const label = document.createElement("div");
      label.textContent = store.name;
      Object.assign(label.style, markerStyles.label);

      const markerCircle = document.createElement("div");
      Object.assign(markerCircle.style, markerStyles.storeCircle);

      markerDiv.appendChild(label);
      markerDiv.appendChild(markerCircle);

      const marker = new AdvancedMarkerElement({
        map: googleMapInstance.current,
        position: { lat: store.lat, lng: store.lng },
        content: markerDiv,
      });

      markersRef.current.set(store.id, marker);
    });

    markersRef.current.forEach((marker, id) => {
      const stillExists = items.some((store) => store.id === id);

      if (!stillExists) {
        marker.map = null;
        markersRef.current.delete(id);
      }
    });
  }, [items, mapReady]);

  return mapRef;
};

export { useGoogleMaps };
