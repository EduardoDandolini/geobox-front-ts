import { Link } from 'react-router-dom';
import './NavegacaoTelas.css';

function Navbar() {

  const links = [
    { path: '/mapa', label: 'Mapa' },
    { path: '/entrega-caixa', label: 'Entrega' },
  ];

  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
