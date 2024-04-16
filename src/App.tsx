import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import './styles.css';
import 'leaflet/dist/leaflet.css';
import MapEvents from './components/MapEvents';
import MapFlyTo from './components/MapFlyTo';
import countries from './assets/capitals.json';

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

  if (!center) return;

  return (
    <MapContainer center={center} zoom={9}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=LwTxjnv8mJzfa08KMbni"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <Marker position={center} icon={markerIcon}>
        <Popup>You are here</Popup>
      </Marker>
      <MapEvents setCenter={setCenter} />
      <MapFlyTo coords={center} />

      {countries.features.map((country) => {
        const [lng, lat] = country.geometry.coordinates;
        return (
          <Marker position={[lat, lng]}>
            <Popup>{country.properties.city}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default App;
