import React, { useState } from 'react';
import { FaBox, FaGamepad } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
    const [activeTab, setActiveTab] = useState('caixas');

    return (
        <div className="navbar">
            <div
                className={`navbar-item ${activeTab === 'caixas' ? 'active' : ''}`}
                onClick={() => setActiveTab('caixas')}
            >
                <FaBox className="navbar-icon" />
            </div>
            <div
                className={`navbar-item ${activeTab === 'gamificacao' ? 'active' : ''}`}
                onClick={() => setActiveTab('gamificacao')}
            >
                <FaGamepad className="navbar-icon" />
            </div>
        </div>
    );
};

export default NavBar;
