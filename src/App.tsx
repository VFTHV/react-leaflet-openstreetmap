import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';

import './styles.css';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: '/marker.png',
  iconSize: [35, 45],
  iconAnchor: [17.5, 45],
  popupAnchor: [0, -46],
});

function App() {
  const [center, setCenter] = useState<null | L.LatLngExpression>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('in useeffect');
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (posError) => {
        console.log(posError);
        alert(posError.message);
        setCenter({
          lat: 53,
          lng: 0,
        });
      }
    );
  }, []);

  // const map = useMap()
  // map.flyTo

  // const flyToNewCenter = (newCenter: L.LatLngExpression) => {

  // };

  const [coords, setCoords] = useState<null | L.LatLngExpression>(null);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => setCoords(e.latlng),
    });
    return null;
  };
  if (!center) return;

  const MapFlyTo = ({ coords }: { coords: null | L.LatLngExpression }) => {
    if (!coords) return;

    const map = useMap();
    useEffect(() => {
      console.log('in useeffect flyto');
      map.flyTo(coords);
    }, [coords]);

    return null;
  };

  return (
    <MapContainer center={center} zoom={9}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=LwTxjnv8mJzfa08KMbni"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <Marker position={center} icon={markerIcon}>
        <Popup>
          <b>You are here</b>
        </Popup>
      </Marker>
      <MapEvents />
      <MapFlyTo coords={coords} />
    </MapContainer>
  );
}

export default App;
