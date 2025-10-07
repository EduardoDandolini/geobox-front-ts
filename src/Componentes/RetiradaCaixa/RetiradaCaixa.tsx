import React, { useEffect, useState } from 'react';
import { FaCheck, FaBox } from 'react-icons/fa';
import "./RetiradaCaixa.css";
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import { getAllDeliveries, withdrawal } from '../../service/GeoBoxAPI';
import { DeliveryResponse } from '../../Interfaces/DeliveryResponse';
import { WithdrawalRequest } from '../../Interfaces/WithdrawalRequest';

const RetiradaCaixa: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliveryResponse[]>([]);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(null);
  const [withdrawalMessage, setWithdrawalMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const fetchedDeliveries = await getAllDeliveries();
        // Ensure data is always an array
        setDeliveries(Array.isArray(fetchedDeliveries) ? fetchedDeliveries : []);
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
        setDeliveries([]);
      }
    };

    fetchDeliveries();
  }, []);

  const handleWithdrawal = async () => {
  if (!selectedDeliveryId) {
    setErrorMessage('Por favor, selecione uma entrega.');
    return;
  }

  const withdrawalRequest: WithdrawalRequest = {
    deliveryId: Number(selectedDeliveryId)
  };

  try {
    await withdrawal(withdrawalRequest);
    console.log("Codigo de entrega: ", selectedDeliveryId);
    setWithdrawalMessage('Retirada realizada com sucesso!');
    setErrorMessage(null);
  } catch (error) {
    setErrorMessage('Erro ao realizar a retirada. Tente novamente.');
    setWithdrawalMessage(null);
  }
};

 return (
  <div className="standard-container">
    <Header />
    <h1 className="standard-title">Retirada de Caixa</h1>
    <div className="standard-input-fields">
      <div className="standard-input-group">
        <select
          className="standard-select"
          onChange={(e) => setSelectedDeliveryId(Number(e.target.value))}
        >
          <option value="">Selecione o código da entrega</option>
          {deliveries.map((delivery) => (
            <option key={delivery.id} value={delivery.id}>
              Código: {delivery.id}
            </option>
          ))}
        </select>
        <FaBox className='standard-form-icon' />
      </div>

      {withdrawalMessage && <p className="success-text">{withdrawalMessage}</p>}
      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <button className="standard-button" onClick={handleWithdrawal}>
        <FaCheck className="button-icon" /> Confirmar Retirada
      </button>
    </div>

    <NavBar />
  </div>
);
};

export default RetiradaCaixa;
