import { useNavigate } from 'react-router-dom';
import { FaBox, FaUserAlt, FaTruck, FaFileAlt } from 'react-icons/fa';
import "./Opcoes.css";
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';


const Opcoes = () => {
    const navigate = useNavigate();

    return (
        <div className="options-container">
            <Header />
            <NavBar />

            <h1>Opções</h1>
            <div className="button-group">
                <button 
                    className="option-button"
                    onClick={() => navigate('/criar-caixa')}
                >
                    Caixas
                    <FaBox className="icon" />
                </button>
                <button 
                    className="option-button"
                    onClick={() => navigate('/criar-motorista')}
                >
                    Motoristas
                    <FaUserAlt className="icon" />
                </button>
                <button 
                    className="option-button"
                    onClick={() => navigate('/criar-caminhao')}
                >
                    Caminhões
                    <FaTruck className="icon" />
                </button>
                <button 
                    className="option-button"
                    onClick={() => navigate('/relatorio-entregas')}
                >
                    Relatórios
                    <FaFileAlt className="icon" />
                </button>
            </div>
        </div>
    );
};

export default Opcoes;
