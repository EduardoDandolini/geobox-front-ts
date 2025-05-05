import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapa.css";
import { getAllDeliveries } from "../../service/GeoBoxAPI";
import { DeliveryResponse } from "../../Interfaces/DeliveryResponse";

const checkedIcon = L.icon({
  iconUrl: "/icons/marker.png", // Atualize para o caminho correto do ícone
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function MapView() {
  useEffect(() => {
    const mapContainer = document.getElementById("map");

    if (!mapContainer) {
      console.error("Contêiner do mapa não encontrado!");
      return;
    }

    // Inicializando o mapa
    const map = L.map(mapContainer).setView([-28.4713, -49.0144], 13);

    // Adicionando camada do OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Função para carregar as localizações
    const loadLocations = async () => {
      try {
        const data: DeliveryResponse[] = await getAllDeliveries();
        console.log("Localizações carregadas:", data);

        data.forEach((location) => {
          if (location.latitude && location.longitude) {
            L.marker([location.latitude, location.longitude], { icon: checkedIcon }).addTo(map);
          } else {
            console.warn("Localização inválida:", location);
          }
        });
      } catch (error) {
        console.error("Erro ao carregar localizações:", error);
      }
    };

    loadLocations();
  }, []);

  return <div id="map"></div>;
}
