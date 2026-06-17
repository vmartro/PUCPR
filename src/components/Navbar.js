import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ titulo, links }) {
  // Estado para controlar se o menu mobile está aberto ou não
  const [menuAberto, setMenuAberto] = useState(false);

  // Função para alternar o estado do menu ao clicar no hambúrguer
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <nav className="navbar">
      {/* Container adicionado para alinhar o título e o botão lado a lado no celular */}
      <div className="navbar-container">
        <div className="navbar-marca">{titulo}</div>
        
        {/* --- BOTÃO HAMBÚRGUER --- */}
        <button className="menu-hamburguer" onClick={toggleMenu} aria-label="Abrir menu">
          <span className={`linha ${menuAberto ? 'aberto' : ''}`}></span>
          <span className={`linha ${menuAberto ? 'aberto' : ''}`}></span>
          <span className={`linha ${menuAberto ? 'aberto' : ''}`}></span>
        </button>
      </div>

      {/* A classe 'ativo' é adicionada ao <ul> quando o menu é aberto pelo botão */}
      <ul className={`navbar-links ${menuAberto ? 'ativo' : ''}`}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === '/'}
              // Fecha o menu automaticamente quando o usuário clica num link
              onClick={() => setMenuAberto(false)}
              className={({ isActive }) =>
                isActive ? 'navbar-link ativo' : 'navbar-link'
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  titulo: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Navbar;