import './App.css'
import Entrega from './Componentes/EntregaCaixa/EntregaCaixa';
import Login from './Componentes/Login/Login'
import MapView from './Componentes/Mapa-Gestor/Mapa';
import Ranking from './Componentes/Gamificação/Ranking'
import RelatorioEntregas from './Componentes/Relatorios/RelatorioEntregas';
import RetiradaCaixa from './Componentes/RetiradaCaixa/RetiradaCaixa';
import RecuperacaoSenha from './Componentes/Login/RecuperarSenha/RecuperacaoSenha'
import RedefinirSenha from './Componentes/Login/RecuperarSenha/RedefinirSenha'
import CriarCaixa from './Componentes/CriarCaixa/CriarCaixa';
import CriarCaminhao from './Componentes/CriarCaminhao/CriarCaminhao';
import CriarMotorista from './Componentes/CriarMotorista/Criar Motorista';
import Opcoes from './Componentes/Opcoes/Opcoes';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/mapa" element={<MapView />} />
          
          <Route path="/" element={<Login />} />

          <Route path="/entrega-caixa" element={<Entrega />} />

          <Route path="/ranking" element={<Ranking />} />

          <Route path="/relatorio-entregas" element={<RelatorioEntregas />} />

          <Route path="/retirada-caixa" element={<RetiradaCaixa />} />

          <Route path="/recuperar-senha" element={<RecuperacaoSenha />} />

          <Route path="/redefinir-senha" element={<RedefinirSenha />} />

          <Route path='/opcoes' element={<Opcoes/>}/>

          <Route path="/criar-caixa" element={<CriarCaixa/>}/>

          <Route path='/criar-caminhao' element={<CriarCaminhao/>}/>

          <Route path='/criar-motorista' element={<CriarMotorista/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
