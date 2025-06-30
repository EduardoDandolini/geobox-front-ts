import { FaCheck, FaUserAlt } from 'react-icons/fa';
import { useState, FormEvent } from 'react';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import "./CriarMotorista.css";

const CriarMotorista = () => {
    const [nome, setNome] = useState<string>("");
    const [error, setError] = useState<string>("");

    const capitalizeWords = (str: string) => {
        return str
            .split(' ')
            .filter(Boolean) // remove strings vazias para evitar espaços duplos
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

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
        <div className="container">
            <Header />
            <NavBar />
            <form onSubmit={handleSubmit}>
                <h1>Criar novo motorista</h1>

                <div className="input-fields">
                    <input
                        type="text"
                        placeholder="Nome do motorista"
                        value={nome}
                        onChange={handleInputChange}
                        maxLength={100}
                    />
                    <FaUserAlt className="icon" />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className='create-button'>Criar
                    <FaCheck className="button-icon" />
                </button>
            </form>
        </div>
    );
};

export default CriarMotorista;
