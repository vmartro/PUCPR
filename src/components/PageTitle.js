import PropTypes from 'prop-types';
import './PageTitle.css';

function PageTitle({ titulo, subtitulo }) {
  return (
    <header className="page-title">
      <h1 className="page-title-titulo">{titulo}</h1>
      {subtitulo && <p className="page-title-subtitulo">{subtitulo}</p>}
    </header>
  );
}

PageTitle.propTypes = {
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string,
};

export default PageTitle;
