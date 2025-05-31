import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';
import { getAllDeliveries } from '../../service/GeoBoxAPI';
import { DeliveryResponse } from '../../Interfaces/DeliveryResponse';
import MapContainer from './MapaComponent';
import NavBar from '../NavBar/NavBar';

const checkedIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon.png',
  iconSize: [25, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapView() {
  const mapRef = useRef<L.Map | null>(null);

  console.log('MapView component rendered');

  useEffect(() => {
    console.log('useEffect triggered');

    const mapDiv = document.getElementById('map');
    console.log('Map div:', mapDiv);

    if (!mapDiv) {
      console.error('Map div not found!');
    }

    if (!mapRef.current) {
      console.log('Initializing map...');
      mapRef.current = L.map('map',).setView([-28.4713, -49.0144], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      console.log('Map initialized');
    } else {
      console.log('Map already initialized');
    }

    const loadLocations = async () => {
      console.log('Loading locations...');
      try {
        const data: DeliveryResponse[] = await getAllDeliveries();
        console.log(`Loaded ${data.length} locations`);

        data.forEach((location) => {
          console.log('Adding marker:', location);
          if (mapRef.current) {
            const marker = L.marker([location.longitude, location.latitude], { icon: checkedIcon })
              .addTo(mapRef.current);

            marker.bindPopup(`
              <b>Código da Entrega:</b> ${location.id}<br>
              <b>Nome do Usuário:</b> ${location.username}
            `);
          }
        });
      } catch (error) {
        console.error('Erro ao carregar localizações:', error);
      }
    };

    loadLocations();

    return () => {
      console.log('Cleaning up map...');
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <MapContainer>
      <div className="map-wrapper">
         <div id="map"></div>
      </div>
    </MapContainer>
  );
}
