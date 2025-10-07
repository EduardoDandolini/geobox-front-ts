import { FaCheck, FaUserAlt, FaArrowLeft } from 'react-icons/fa';
import { useState, FormEvent } from 'react';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import "./CriarMotorista.css";

const CriarMotorista = () => {
    const [nome, setNome] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!nome.trim()) {
            setError("O nome não pode estar vazio.");
            return;
        }

        setError(""); // limpa erro
        alert("Motorista criado: " + nome);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    // Remove tudo que não for letra ou espaço
    rawValue = rawValue.replace(/[^a-zA-Z ]/g, '');

    // Remove espaços extras (mais de 1 espaço seguidos)
    rawValue = rawValue.replace(/ +/g, ' ');

    // Remove espaço no início (se tiver)
    rawValue = rawValue.trimStart();

    // Capitaliza cada palavra
    const formattedValue = rawValue
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    setNome(formattedValue);
    setError('');
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
                <h1 className="standard-title">Criar novo motorista</h1>

                <div className="standard-input-fields">
                    <div className="standard-input-group">
                        <input
                            className="standard-input"
                            type="text"
                            placeholder="Nome do motorista"
                            value={nome}
                            onChange={handleInputChange}
                            maxLength={100}
                        />
                        <FaUserAlt className="standard-form-icon" />
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

export default CriarMotorista;
