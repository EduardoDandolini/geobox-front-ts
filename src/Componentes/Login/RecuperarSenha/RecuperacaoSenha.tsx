import { useState } from "react";
import { forgotPassword } from "../../../service/GeoBoxAPI";
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
    <div className="recuperar-senha-container">
      <h2>Recuperar Senha</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-email"
          />
        </div>
        <button type="submit" className="button">Enviar link</button>
        {mensagem && <p className={mensagem.includes("Erro") ? "error-text" : "success-text"}>{mensagem}</p>}
      </form>
    </div>
  );
};

export default RecuperarSenha;