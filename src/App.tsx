import './App.css'
import Entrega from './Componentes/EntregaCaixa/EntregaCaixa';
import Login from './Componentes/Login/Login'
import MapView from './Componentes/Mapa-Gestor/Mapa';
import Ranking from './Componentes/Gamificação/Ranking'
import RelatorioEntregas from './Componentes/Relatorios/RelatorioEntregas';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
