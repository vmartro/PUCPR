import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ titulo, links }) {
  return (
    <nav className="navbar">
      <div className="navbar-marca">{titulo}</div>
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === '/'}
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
