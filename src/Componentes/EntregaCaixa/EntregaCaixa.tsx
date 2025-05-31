import React, { useEffect, useState } from 'react';
import { FaBox, FaTruck, FaCheck } from 'react-icons/fa';
import "./EntregaCaixa.css";
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import { getTrucks, getBoxes, saveDelivery } from '../../service/GeoBoxAPI';
import { TruckResponse } from '../../Interfaces/TruckResponse';
import { BoxResponse } from '../../Interfaces/BoxResponse';
import { DeliveryRequest } from '../../Interfaces/DeliveryRequest';

const Entrega: React.FC = () => {
  const [trucks, setTrucks] = useState<TruckResponse[]>([]);
  const [boxes, setBoxes] = useState<BoxResponse[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<string>('');
  const [selectedBox, setSelectedBox] = useState<string>('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [deliveryMessage, setDeliveryMessage] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const userId = sessionStorage.getItem("user");

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocalização não suportada pelo navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
      },
      (error) => {
        setGeoError("Erro ao obter localização: " + error.message);
        console.error("Erro ao obter localização:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTrucks = await getTrucks();
      const fetchedBoxes = await getBoxes();
      setTrucks(fetchedTrucks);
      setBoxes(fetchedBoxes);
    };

    fetchData();
  }, []);

  const handleDelivery = async () => {
    console.log("Latitude atual:", latitude);
    console.log("Longitude atual:", longitude);

    if (!selectedTruck || !selectedBox) {
      console.error('Por favor, selecione um caminhão e uma caixa antes de continuar.');
      return;
    }

    if (latitude === null || longitude === null) {
      console.error('Erro ao obter localização para envio.');
      return;
    }

    const deliveryRequest: DeliveryRequest = {
      latitude,
      longitude,
      truckPlate: selectedTruck,
      userId: Number(userId),
      boxNumber: selectedBox,
      status: Number(selectedStatus),
    };

    console.log("Enviando entrega:", deliveryRequest);

    await saveDelivery(deliveryRequest);
    setDeliveryMessage('Entrega salva com sucesso!');
    console.log('Entrega salva com sucesso!');
  };

  return (
    <div className="entrega-container">
      <Header />
      <h1>Entrega de Caixa</h1>
      <div className="input-fields">
        <div className="input-group">
          <select
            className="input-select"
            onChange={(e) => setSelectedTruck(e.target.value)}
          >
            <option value="">Selecione o caminhão</option>
            {trucks.map((truck) => (
              <option key={truck.plate} value={truck.plate}>
                {truck.plate}
              </option>
            ))}
          </select>
          <FaTruck className='icon' />
        </div>

        <div className="input-group">
          <select
            className="input-select"
            onChange={(e) => setSelectedBox(e.target.value)}
          >
            <option value="">Selecione o número da caixa</option>
            {boxes.map((box) => (
              <option key={box.boxNumber} value={box.boxNumber}>
                {box.boxNumber}
              </option>
            ))}
          </select>
          <FaBox className='icon' />
        </div>
      </div>

      {geoError && <p className="error-text">{geoError}</p>}
      {deliveryMessage && <p className="success-text">{deliveryMessage}</p>}

      <button className="delivery-button" onClick={handleDelivery}>
        <FaCheck className="button-icon" />
      </button>

      <NavBar />
    </div>
  );
};

export default Entrega;