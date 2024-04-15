import React from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';

type MapEventsProps = {
  setCenter: React.Dispatch<React.SetStateAction<L.LatLngExpression | null>>;
};

export default function MapEvents({ setCenter }: MapEventsProps) {
  useMapEvents({
    click: (e) => setCenter(e.latlng),
  });
  return null;
}
