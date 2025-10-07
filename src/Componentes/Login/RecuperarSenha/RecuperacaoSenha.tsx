import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { forgotPassword } from "../../../service/GeoBoxAPI";
import Header from "../../Header/Header";
import "./RecuperacaoSenha.css";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMensagem("Verifique seu e-mail para redefinir sua senha.");
    } catch (error) {
      setMensagem("Erro ao solicitar recuperação. Tente novamente.");
    }
  };

  return (
    <div className="standard-container">
      <Header/>
      <button 
        className="back-button" 
        onClick={() => window.history.back()}
        type="button"
      >
        <FaArrowLeft className="back-icon" />
        Voltar
      </button>
      
      <h1 className="standard-title">Recuperar Senha</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="standard-form-group">
          <input
            className="standard-form"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="standard-button">Enviar link</button>
        {mensagem && <p className={mensagem.includes("Erro") ? "error-text" : "success-text"}>{mensagem}</p>}
      </form>
    </div>
  );
};

export default RecuperarSenha;