import PropTypes from 'prop-types';
import './Badge.css';

function Badge({ tipo, children }) {
  return <span className={`badge badge-${tipo}`}>{children}</span>;
}

Badge.propTypes = {
  tipo: PropTypes.oneOf(['alta', 'media', 'baixa', 'concluida', 'pendente'])
    .isRequired,
  children: PropTypes.node.isRequired,
};

export default Badge;
