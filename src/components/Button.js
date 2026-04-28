import PropTypes from 'prop-types';
import './Button.css';

function Button({ children, onClick, variante = 'primario', tipo = 'button' }) {
  const classe = `botao botao-${variante}`;
  return (
    <button type={tipo} className={classe} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variante: PropTypes.oneOf(['primario', 'secundario']),
  tipo: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
