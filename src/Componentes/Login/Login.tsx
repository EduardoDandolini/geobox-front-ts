import { FaUser, FaLock } from 'react-icons/fa';
import { useState, FormEvent } from 'react';
import { login } from "../../service/GeoBoxAPI";
import { LoginDTO } from "../../Interfaces/LoginDTO";
import { LoginResponse } from '../../Interfaces/LoginResponse';

import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loginData: LoginDTO = {
            email: username,
            password: password
        };

        try {
            const response: LoginResponse = await login(loginData);
            console.log("Login bem-sucedido:", response);

            // sessionStorage.setItem("token", response.token);
            // navigate('/dashboard');
        } catch (error) {
            alert("Erro ao fazer login. Verifique seu e-mail e senha.");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="logo-container">
                    <img src="src/assets/Group 18.svg" alt="Logo do App" className="logo" />
                </div>

                <div className="input-fields">
                    <input
                        type="email"
                        placeholder="Endereço de e-mail"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-fields">
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>

                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Lembrar de mim
                    </label>
                    <a href="#">Esqueci minha senha</a>
                </div>

                <button type="submit">Entrar</button>

                <div className="signup-link">
                    <p>Não tem uma conta? <a href="#">Registre-se</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
