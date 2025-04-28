import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';
import { getAllDeliveries } from '../../service/GeoBoxAPI';
import { DeliveryResponse } from '../../Interfaces/DeliveryResponse';

const checkedIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function MapView() {
  const mapRef = useRef<L.Map | null>(null); 

  useEffect(() => {
    console.log('Tentando inicializar o mapa...');

    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([-28.4713, -49.0144], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    const loadLocations = async () => {
      try {
        const data: DeliveryResponse[] = await getAllDeliveries();
        data.forEach((location) => {
          if (mapRef.current) { 
            L.marker([location.latitude, location.longitude], { icon: checkedIcon })
              .addTo(mapRef.current);  
          }
        });
      } catch (error) {
        console.error('Erro ao carregar localizações:', error);
      }
    };

    loadLocations();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map"></div>;
}