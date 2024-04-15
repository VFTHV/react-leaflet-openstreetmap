import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import './styles.css';
import 'leaflet/dist/leaflet.css';

function App() {
  const [center, setCenter] = useState({ lat: 29.6458, lng: -95.6714 });
  const ZOOM_LEVEL = 9;

  return (
    // <div style={{ height: '100vh', width: '100vw' }}>
    <MapContainer center={center} zoom={13}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=LwTxjnv8mJzfa08KMbni"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
    </MapContainer>
    // </div>
  );
}

export default App;
