import { useState, useEffect } from 'react';
import { FaBox, FaGamepad, FaBoxOpen, FaMapMarkedAlt, FaFileAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation(); 

  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/entrega-caixa')) {
      setActiveTab('caixas');
    } else if (path.includes('/retirada-caixa')) {
      setActiveTab('retirada');
    } else if (path.includes('/mapa')) {
      setActiveTab('mapa');
    } else if (path.includes('/relatorio-entregas')) {
      setActiveTab('relatorio');
    } else if (path.includes('/ranking')) {
      setActiveTab('gamificacao');
    }
  }, [location]);

  return (
    <nav className="navbar">
      <Link to="/entrega-caixa" className={`navbar-item ${activeTab === 'caixas' ? 'active' : ''}`}>
        <FaBox className="navbar-icon" />
      </Link>
      <Link to="/retirada-caixa" className={`navbar-item ${activeTab === 'retirada' ? 'active' : ''}`}>
        <FaBoxOpen className="navbar-icon" />
      </Link>
      <Link to="/mapa" className={`navbar-item ${activeTab === 'mapa' ? 'active' : ''}`}>
        <FaMapMarkedAlt className="navbar-icon" />
      </Link>
      <Link to="/relatorio-entregas" className={`navbar-item ${activeTab === 'relatorio' ? 'active' : ''}`}>
        <FaFileAlt className="navbar-icon" />
      </Link>
      <Link to="/ranking" className={`navbar-item ${activeTab === 'gamificacao' ? 'active' : ''}`}>
        <FaGamepad className="navbar-icon" />
      </Link>
    </nav>
  );
};

export default NavBar;