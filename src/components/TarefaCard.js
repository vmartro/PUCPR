// src/components/TarefaCard.js
import PropTypes from 'prop-types';
import Badge from './Badge';
import Button from './Button';
import './TarefaCard.css';

function formatarData(iso) {
  if (!iso) return '';
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function TarefaCard({ id, titulo, descricao, prioridade, concluida, prazo, onEdit, onDelete }) {
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
      
      {/* Nova área de botões do CRUD */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <Button variante="secundario" onClick={() => onEdit(id)}>
          ✏️ Editar
        </Button>
        <Button variante="secundario" onClick={() => onDelete(id)}>
          🗑️ Apagar
        </Button>
      </div>
    </article>
  );
}

TarefaCard.propTypes = {
  id: PropTypes.number.isRequired,
  titulo: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  prioridade: PropTypes.oneOf(['alta', 'media', 'baixa']).isRequired,
  concluida: PropTypes.bool.isRequired,
  prazo: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TarefaCard;