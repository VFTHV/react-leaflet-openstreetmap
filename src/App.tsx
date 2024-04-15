import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

import './styles.css';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: '/marker.png',
  iconSize: [35, 45],
});

function App() {
  const [center, setCenter] = useState<null | { lat: number; lng: number }>(
    null
  );

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

  if (!center) return;

  return (
    <MapContainer center={center} zoom={9}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=LwTxjnv8mJzfa08KMbni"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <Marker position={center} icon={markerIcon} riseOnHover />
    </MapContainer>
  );
}

export default App;
