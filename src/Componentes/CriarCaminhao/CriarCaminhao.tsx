import { FaTruck, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useState, FormEvent } from 'react';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import "./CriarCaminhao.css";

const CriarCaminhao = () => {
    const [placa, setPlaca] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (placa.length !== 7) {
            setError("A placa deve ter exatamente 7 caracteres.");
            return;
        }

        setError(""); // limpa erro
        alert("Caminhão criado: " + placa);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.toUpperCase();
        // Testa se tem caractere inválido
        if (/[^A-Z0-9]/.test(rawValue)) {
            setError("Use somente caracteres alfanuméricos (A-Z, 0-9).");
        } else if (rawValue.length > 7) {
            setError("A placa deve ter no máximo 7 caracteres.");
        } else {
            setError("");
        }

        const cleanedValue = rawValue.replace(/[^A-Z0-9]/g, '').slice(0, 7);
        setPlaca(cleanedValue);
    };

    return (
        <div className="standard-container">
            <Header />
            <NavBar />
            <button 
                className="back-button" 
                onClick={() => window.history.back()}
                type="button"
            >
                <FaArrowLeft className="back-icon" />
                Voltar
            </button>
            
            <form onSubmit={handleSubmit}>
                <h1 className="standard-title">Criar novo caminhão</h1>

                <div className="standard-input-fields">
                    <div className="standard-input-group">
                        <input
                            className="standard-input"
                            type="text"
                            placeholder="Placa do caminhão"
                            value={placa}
                            onChange={handleInputChange}
                            maxLength={7}
                        />
                        <FaTruck className="standard-form-icon" />
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className='standard-button'>Criar
                    <FaCheck className="standard-button-icon" />
                </button>
            </form>
        </div>
    );
};

export default CriarCaminhao;
