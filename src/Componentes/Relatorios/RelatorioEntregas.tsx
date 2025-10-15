import React, { useState } from 'react';
import './RelatorioEntregas.css';
import { generateSheetDelivery } from '../../service/GeoBoxAPI';
import NavBar from '../NavBar/NavBar';
import Header from '../Header/Header';
import { FaArrowLeft } from 'react-icons/fa';

const GenerateReport: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const response = await generateSheetDelivery();
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'relatorio-entregas.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    } finally {
      setLoading(false);
    }
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
      
      <h1 className="standard-title">Relatório de Entregas</h1>
      <button className="standard-button" onClick={handleGenerateReport} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar Relatório'}
      </button>
      {success && <p className="success-msg">Relatório gerado com sucesso!</p>}
      <NavBar />
    </div>
  );
};

export default GenerateReport;