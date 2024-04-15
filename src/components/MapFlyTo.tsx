import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

type MapFlyToProps = {
  coords: null | L.LatLngExpression;
};

export default function MapFlyTo({ coords }: MapFlyToProps) {
  if (!coords) return;

  const map = useMap();
  useEffect(() => {
    map.flyTo(coords);
  }, [coords]);

  return null;
}
