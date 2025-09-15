import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { ICart } from "@/types";

import { markerStyles } from "@/utils/styles/markerStyles";

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;

const useGoogleMaps = (
  items: ICart[],
  center: google.maps.LatLngLiteral,
  onLocationSelect?: (address: string) => void,
) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapInstance = useRef<google.maps.Map | null>(null);

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

      const { AdvancedMarkerElement } = google.maps.marker;

      const storesMap = new Map<
        string,
        { name: string; location: google.maps.LatLngLiteral }
      >();

      items.forEach((item) => {
        if (
          item.category &&
          item.category.id &&
          item.category.location.coordinates
        ) {
          const coords = item.category.location.coordinates;
          const lng = Number(coords[0]);
          const lat = Number(coords[1]);

          if (!isNaN(lat) && !isNaN(lng)) {
            const categoryId = item.category.id;

            if (!storesMap.has(categoryId)) {
              storesMap.set(categoryId, {
                name: item.category.name,
                location: { lat, lng },
              });
            }
          }
        }
      });

      storesMap.forEach((store) => {
        const markerDiv = document.createElement("div");

        Object.assign(markerDiv.style, markerStyles.container);

        const label = document.createElement("div");

        label.textContent = store.name;
        Object.assign(label.style, markerStyles.label);

        const markerCircle = document.createElement("div");

        Object.assign(markerCircle.style, markerStyles.storeCircle);

        markerDiv.appendChild(label);
        markerDiv.appendChild(markerCircle);

        new AdvancedMarkerElement({
          map: googleMapInstance.current!,
          position: store.location,
          content: markerDiv,
        });
      });

      if (onLocationSelect) {
        const geocoder = new google.maps.Geocoder();
        let clickMarker: google.maps.marker.AdvancedMarkerElement | null = null;

        googleMapInstance.current.addListener(
          "click",
          (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;

            const latLng = event.latLng;

            if (!clickMarker) {
              const markerDiv = document.createElement("div");

              Object.assign(markerDiv.style, markerStyles.clickCircle);

              clickMarker = new google.maps.marker.AdvancedMarkerElement({
                position: latLng,
                map: googleMapInstance.current!,
                content: markerDiv,
                title: "Selected location",
              });
            } else {
              clickMarker.position = latLng;
            }

            geocoder.geocode({ location: latLng }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                onLocationSelect(results[0].formatted_address);
              }
            });
          },
        );
      }
    };

    loadMap();

    return () => {
      googleMapInstance.current = null;
    };
  }, [items, center, onLocationSelect]);

  return mapRef;
};

export { useGoogleMaps };
