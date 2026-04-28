import PageTitle from '../components/PageTitle';
import TarefaCard from '../components/TarefaCard';
import tarefas from '../data/tarefas';
import './Tarefas.css';

function Tarefas() {
  const totalConcluidas = tarefas.filter((t) => t.concluida).length;
  const totalPendentes = tarefas.length - totalConcluidas;

  return (
    <section>
      <PageTitle
        titulo="Minhas Tarefas"
        subtitulo={`${totalPendentes} pendente(s) · ${totalConcluidas} concluída(s)`}
      />

      <div className="tarefas-lista">
        {tarefas.map((tarefa) => (
          <TarefaCard
            key={tarefa.id}
            titulo={tarefa.titulo}
            descricao={tarefa.descricao}
            prioridade={tarefa.prioridade}
            concluida={tarefa.concluida}
            prazo={tarefa.prazo}
          />
        ))}
      </div>
    </section>
  );
}

export default Tarefas;
