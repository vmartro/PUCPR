import PropTypes from 'prop-types';
import './Footer.css';

function Footer({ disciplina, ano, autores }) {
  return (
    <footer className="footer">
      <p className="footer-texto">
        {disciplina} &middot; {ano}
      </p>
      <p className="footer-texto">
        Desenvolvido por: {autores.join(', ')}
      </p>
    </footer>
  );
}

Footer.propTypes = {
  disciplina: PropTypes.string.isRequired,
  ano: PropTypes.number.isRequired,
  autores: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Footer;
