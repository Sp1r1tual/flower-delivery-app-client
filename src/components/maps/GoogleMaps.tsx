import { useGoogleMaps } from "@/hooks/cart/useGoogleMaps";

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
  const mapRef = useGoogleMaps(items, center, onLocationSelect, addressRef);

  return (
    <div className={styles.wrapper}>
      <div ref={mapRef} className={styles.map} />
    </div>
  );
};

export { GoogleMaps };
