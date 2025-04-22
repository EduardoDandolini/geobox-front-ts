import './App.css'
import Entrega from './Componentes/EntregaCaixa/EntregaCaixa';
import Login from './Componentes/Login/Login'
import MapView from './Componentes/Mapa-Gestor/Mapa';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rota de login */}
          <Route path="/login" element={<Login />} />
          
          {/* Rota do mapa */}
          <Route path="/mapa" element={<MapView />} />
          
          {/* Rota padrão redirecionando para o login */}
          <Route path="/" element={<Login />} />

          {/* Rota padrão redirecionando para o login */}
          <Route path="/entrega-caixa" element={<Entrega />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
