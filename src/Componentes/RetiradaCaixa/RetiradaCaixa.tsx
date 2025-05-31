import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
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
        setDeliveries(fetchedDeliveries);
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
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
    <div className="retirada-container">
      <Header />
      <h1>Retirada de Caixa</h1>
      <div className="input-fields">
        <div className="input-group">
          <select
            className="input-select"
            onChange={(e) => setSelectedDeliveryId(Number(e.target.value))}
          >
            <option value="">Selecione o código da entrega</option>
            {deliveries.map((delivery) => (
              <option key={delivery.id} value={delivery.id}>
                Código: {delivery.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {withdrawalMessage && <p className="success-text">{withdrawalMessage}</p>}
      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <button className="delivery-button" onClick={handleWithdrawal}>
        <FaCheck className="button-icon" /> Confirmar Retirada
      </button>

      <NavBar />
    </div>
  );
};

export default RetiradaCaixa;
