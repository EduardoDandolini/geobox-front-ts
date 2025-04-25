import React, { useState } from 'react';
import { FaBox, FaTruck, FaUser, FaCheck } from 'react-icons/fa';
import "./EntregaCaixa.css";
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

const Entrega = () => {

    return (
        <div className="entrega-container">
            <Header/>
            <h1>Entrega</h1>
            <div className="input-fields">
                <div className="input-group">
                    <select className="input-select">
                        <option value="">Selecione o número da caixa</option>
                        <option value="caixa1">1</option>
                        <option value="caixa2">2</option>
                        <option value="caixa3">3</option>
                        <option value="caixa4">4</option>
                    </select>
                    <FaBox className='icon' />
                </div>

                <div className="input-group">
                    <select className="input-select">
                        <option value="">Selecione o caminhão</option>
                        <option value="caminhao1">MGD 6545</option>
                        <option value="caminhao2">DAW 5413</option>
                        <option value="caminhao3">MCI 5579</option>
                        <option value="caminhao4">CPN 7213</option>
                    </select>
                    <FaTruck className='icon' />
                </div>

                <div className="input-group">
                    <select className="input-select">
                        <option value="">Selecione o Cliente</option>
                        <option value="cliente1">Metalúrgica</option>
                        <option value="cliente2">Supermercado</option>
                        <option value="cliente3">Loja</option>
                    </select>
                    <FaUser className='icon' />
                </div>
            </div>

            <button className="delivery-button">
                <FaCheck className="button-icon" />
            </button>

            <NavBar />
        </div>

    );
};

export default Entrega;
