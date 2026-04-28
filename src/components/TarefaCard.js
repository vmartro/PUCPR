import PropTypes from 'prop-types';
import Badge from './Badge';
import './TarefaCard.css';

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function TarefaCard({ titulo, descricao, prioridade, concluida, prazo }) {
  return (
    <article className={`tarefa-card ${concluida ? 'tarefa-card-concluida' : ''}`}>
      <header className="tarefa-card-cabecalho">
        <h3 className="tarefa-card-titulo">{titulo}</h3>
        <div className="tarefa-card-badges">
          <Badge tipo={prioridade}>{prioridade}</Badge>
          <Badge tipo={concluida ? 'concluida' : 'pendente'}>
            {concluida ? 'Concluída' : 'Pendente'}
          </Badge>
        </div>
      </header>
      <p className="tarefa-card-descricao">{descricao}</p>
      <p className="tarefa-card-prazo">Prazo: {formatarData(prazo)}</p>
    </article>
  );
}

TarefaCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  prioridade: PropTypes.oneOf(['alta', 'media', 'baixa']).isRequired,
  concluida: PropTypes.bool.isRequired,
  prazo: PropTypes.string.isRequired,
};

export default TarefaCard;
