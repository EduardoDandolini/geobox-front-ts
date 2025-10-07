import { FaBox, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useState, FormEvent } from 'react';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import "./CriarCaixa.css";

const CriarCaixa = () => {
    const [caixa, setCaixa] = useState<string>("");
    const [error, setError] = useState<string>("");


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (caixa.length !== 7) {
            setError("A placa deve ter exatamente 7 caracteres.");
            return;
        }

        setError(""); // limpa erro
        alert("Caixa criada: " + caixa);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.toUpperCase();
        // Testa se tem caractere inválido
        if (/[^0-9]/.test(rawValue)) {
            setError("Use somente caracteres numéricos (0-9).");
        } else {
            setError("");
        }

        const cleanedValue = rawValue.replace(/[^0-9]/g, '').slice(0, 7);
        setCaixa(cleanedValue);
    };

    return (
        <div className="standard-container">
            <Header />
            <button 
                className="back-button" 
                onClick={() => window.history.back()}
                type="button"
            >
                <FaArrowLeft className="back-icon" />
                Voltar
            </button>
            
            <form onSubmit={handleSubmit}>
                <h1 className="standard-title">Criar nova caixa</h1>

                <div className="standard-input-fields">
                    <div className="standard-input-group">
                        <input
                            className="standard-input"
                            type="text"
                            placeholder="Número da caixa"
                            value={caixa}
                            onChange={handleInputChange} 
                        />
                        <FaBox className="standard-form-icon" />
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}


                <button type="submit" className="standard-button">
                    Criar
                    <FaCheck className="standard-button-icon"/>
                </button>

            </form>
            <NavBar />
        </div>
    );
};

export default CriarCaixa;
