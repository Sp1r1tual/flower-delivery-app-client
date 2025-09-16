import { useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";

import { useGoogleMaps } from "@/hooks/useGoogleMaps";

import { DotsLoader } from "../ui/loaders/DotsLoader";

import { IStoreLocation } from "@/types";

import styles from "./styles/GoogleMaps.module.css";

interface IGoogleMapsProps {
  items: IStoreLocation[];
  onLocationSelect?: (coords: google.maps.LatLng) => void;
  addressRef?: React.RefObject<HTMLInputElement | null>;
}

const center: google.maps.LatLngLiteral = { lat: 50.45, lng: 30.52 };

const GoogleMaps = ({
  items,
  onLocationSelect,
  addressRef,
}: IGoogleMapsProps) => {
  const {
    isLoaded,
    onLoad,
    onUnmount,
    onClick,
    mapOptions,
    geocodeAddress,
    updateMarkers,
  } = useGoogleMaps(items, center, onLocationSelect, addressRef);

  useEffect(() => {
    updateMarkers();
  }, [items, updateMarkers]);

  useEffect(() => {
    if (!addressRef?.current || !isLoaded) return;

    const inputEl = addressRef.current;

    const handleBlur = () => {
      const address = inputEl?.value;

      if (address) {
        geocodeAddress(address);
      }
    };

    inputEl.addEventListener("blur", handleBlur);

    return () => inputEl.removeEventListener("blur", handleBlur);
  }, [addressRef, geocodeAddress, isLoaded]);

  if (!isLoaded) {
    return (
      <div className={styles.wrapper}>
        <DotsLoader />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <GoogleMap
        mapContainerClassName={styles.map}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      />
    </div>
  );
};

export { GoogleMaps };
