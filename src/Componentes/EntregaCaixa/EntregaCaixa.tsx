import { useEffect, useState } from 'react';
import { FaBox, FaTruck, FaCheck } from 'react-icons/fa';
import "./EntregaCaixa.css";
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import { getTrucks, getBoxes, saveDelivery } from '../../service/GeoBoxAPI'; 
import { TruckResponse } from '../../Interfaces/TruckResponse';
import { BoxResponse } from '../../Interfaces/BoxResponse';
import { DeliveryRequest } from '../../Interfaces/DeliveryRequest';

const Entrega = () => {
    const [trucks, setTrucks] = useState<TruckResponse[]>([]);
    const [boxes, setBoxes] = useState<BoxResponse[]>([]);
    const [selectedTruck, setSelectedTruck] = useState<string>('');
    const [selectedBox, setSelectedBox] = useState<string>('');
    const userId = sessionStorage.getItem("user");
    console.log(userId);

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
        if (!selectedTruck || !selectedBox) {
            console.error('Por favor, selecione um caminhão e uma caixa antes de continuar.');
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const deliveryRequest: DeliveryRequest = {
                    latitude,
                    longitude,
                    truckPlate: selectedTruck, 
                    userId: Number(userId),
                    boxNumber: selectedBox,
                };

                await saveDelivery(deliveryRequest);
                console.log('Entrega salva com sucesso!'); 
            }, (error) => {
                console.error('Erro ao obter localização:', error);
            });
        } else {
            console.error('Geolocalização não é suportada neste navegador.');
        }
    };

    return (
        <div className="entrega-container">
            <Header />
            <h1>Entrega</h1>
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

            <button className="delivery-button" onClick={handleDelivery}>
                <FaCheck className="button-icon" />
            </button>

            <NavBar />
        </div>
    );
};

export default Entrega;