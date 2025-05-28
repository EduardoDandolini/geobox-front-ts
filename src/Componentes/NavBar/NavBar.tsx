import React, { useState } from 'react';
import { FaBox, FaGamepad } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('caixas');

  return (
    <nav className="navbar">
      <Link to="/entrega-caixa" className={`navbar-item ${activeTab === 'caixas' ? 'active' : ''}`}>
        <FaBox className="navbar-icon" />
        Caixas
      </Link>
      <Link to="/ranking" className={`navbar-item ${activeTab === 'gamificacao' ? 'active' : ''}`}>
        <FaGamepad className="navbar-icon" />
        Gamificação
      </Link>
      <Link to="/mapa" className="navbar-item">
        Mapa
      </Link>
      <Link to="/relatorio-entregas" className="navbar-item">
        Relatório de Entregas
      </Link>
    </nav>
  );
};

export default NavBar;