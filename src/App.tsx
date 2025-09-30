import './App.css'
import Entrega from './Componentes/EntregaCaixa/EntregaCaixa';
import Login from './Componentes/Login/Login'
import MapView from './Componentes/Mapa-Gestor/Mapa';
import Ranking from './Componentes/Gamificação/Ranking'
import RelatorioEntregas from './Componentes/Relatorios/RelatorioEntregas';
import RetiradaCaixa from './Componentes/RetiradaCaixa/RetiradaCaixa';
import RecuperacaoSenha from './Componentes/Login/RecuperarSenha/RecuperacaoSenha'
import RedefinirSenha from './Componentes/Login/RecuperarSenha/RedefinirSenha'
import { ProtectedRoute } from "./Componentes/Utils/ProtectedRoute";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />

          {/* User e Admin podem acessar */}
          <Route
            path="/entrega-caixa"
            element={
              <ProtectedRoute allowedRoles={["User", "Admin"]}>
                <Entrega />
              </ProtectedRoute>
            }
          />
          <Route
            path="/retirada-caixa"
            element={
              <ProtectedRoute allowedRoles={["User", "Admin"]}>
                <RetiradaCaixa />
              </ProtectedRoute>
            }
          />

          {/* Somente Admin */}
          <Route
            path="/mapa"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <MapView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Ranking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/relatorio-entregas"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <RelatorioEntregas />
              </ProtectedRoute>
            }
          />

          {/* Outras rotas */}
          <Route path="/recuperar-senha" element={<RecuperacaoSenha />} />
          <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />

          {/* Página de acesso negado */}
          <Route path="/unauthorized" element={<h1>Acesso Negado</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
