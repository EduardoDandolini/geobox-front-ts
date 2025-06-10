import { useState } from "react";
import { resetPassword } from "../../../service/GeoBoxAPI";
import { useParams } from "react-router-dom";
import "./RedefinirSenha.css";

const RedefinirSenha = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const { token } = useParams();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await resetPassword(`${token}`, novaSenha);
    setMensagem("Senha redefinida com sucesso. Faça login.");
  } catch (error) {
    setMensagem("Erro ao redefinir senha. Tente novamente.");
  }
};

  return (
    <div className="redefinir-senha-container">
      <h2>Nova Senha</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="password"
            placeholder="Digite a nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            className="input-nova-senha"
          />
        </div>
        <button type="submit" className="button">Redefinir Senha</button>
        {mensagem && <p className={mensagem.includes("Erro") ? "error-text" : "success-text"}>{mensagem}</p>}
      </form>
    </div>
  );
};

export default RedefinirSenha;