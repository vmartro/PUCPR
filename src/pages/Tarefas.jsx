import { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import TarefaCard from '../components/TarefaCard';
import Button from '../components/Button';
import { buscarTarefas, criarTarefa, atualizarTarefa, excluirTarefa } from '../services/tarefasServices';
import './Tarefas.css';

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [tarefaParaApagar, setTarefaParaApagar] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false); 
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ titulo: '', descricao: '', prioridade: 'media', prazo: '2026-06-03', concluida: false }); 

  useEffect(() => {
    async function carregar() {
      const dados = await buscarTarefas();
      setTarefas(dados);
      setLoading(false);
    }
    carregar();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function abrirNovo() {
    setForm({ titulo: '', descricao: '', prioridade: 'media', prazo: '2026-06-03', concluida: false });
    setEditandoId(null);
    setMostrarForm(true);
  }

  function handleEditar(id) {
    const tarefaAlvo = tarefas.find(t => t.id === id);
    setForm(tarefaAlvo);
    setEditandoId(id);
    setMostrarForm(true);
  }

  function handleApagar(id) {
    setTarefaParaApagar(id);
  }

  async function confirmarApagar() {
    if (tarefaParaApagar !== null) {
      await excluirTarefa(tarefaParaApagar); 
      setTarefas(tarefas.filter(t => t.id !== tarefaParaApagar)); 
      setTarefaParaApagar(null); 
    }
  }

  async function handleSalvar(e) {
    e.preventDefault();
    if (editandoId) {
      const atualizada = await atualizarTarefa(editandoId, { ...form, id: editandoId });
      setTarefas(tarefas.map(t => (t.id === editandoId ? atualizada : t)));
    } else {
      const nova = await criarTarefa(form);
      setTarefas([nova, ...tarefas]);
    }
    setMostrarForm(false);
  }

  const totalConcluidas = tarefas.filter((t) => t.concluida).length;
  const totalPendentes = tarefas.length - totalConcluidas;

  const tarefasFiltradas = tarefas.filter((tarefa) =>
    tarefa.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <section>
      <PageTitle
        titulo="Minhas Tarefas"
        subtitulo={loading ? "Carregando dados..." : `${totalPendentes} pendente(s) · ${totalConcluidas} concluída(s)`}
      />

      {!mostrarForm && (
        <div style={{ marginBottom: '20px' }}>
          <input
            className="form-input"
            type="text"
            placeholder="🔍 Pesquisar tarefa pelo título..."
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
        </div>
      )}

      {!mostrarForm && (
        <div style={{ marginBottom: '20px' }}>
          <Button variante="primario" onClick={abrirNovo}>+ Adicionar Tarefa</Button>
        </div>
      )}

      {mostrarForm && (
        <form onSubmit={handleSalvar} className="form-container">
          <h3>{editandoId ? '✏️ Editar Tarefa' : '+ Nova Tarefa'}</h3>
          
          <input className="form-input" type="text" name="titulo" placeholder="Título da tarefa" value={form.titulo} onChange={handleChange} required />
          <input className="form-input" type="text" name="descricao" placeholder="Descrição detalhada da tarefa..." value={form.descricao} onChange={handleChange} required />
          <input className="form-input" type="date" name="prazo" value={formataDataInput(form.prazo)} onChange={handleChange} required />
          
          <select className="form-select" name="prioridade" value={form.prioridade} onChange={handleChange}>
            <option value="alta">Prioridade: Alta</option>
            <option value="media">Prioridade: Média</option>
            <option value="baixa">Prioridade: Baixa</option>
          </select>

          <label className="form-checkbox-label">
            <input type="checkbox" name="concluida" checked={form.concluida} onChange={handleChange} />
            Marcar tarefa como concluída
          </label>

          <div className="form-acoes">
            <Button tipo="submit" variante="primario">Salvar Tarefa</Button>
            <Button tipo="button" variante="secundario" onClick={() => setMostrarForm(false)}>Cancelar</Button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Buscando tarefas na API...</p>
      ) : (
        <div className="tarefas-lista">
          {tarefasFiltradas.length === 0 && termoPesquisa !== '' && (
            <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhuma tarefa encontrada com "{termoPesquisa}".</p>
          )}

          {tarefasFiltradas.map((tarefa) => (
            <TarefaCard
              key={tarefa.id}
              id={tarefa.id}
              titulo={tarefa.titulo}
              descricao={tarefa.descricao}
              prioridade={tarefa.prioridade}
              concluida={tarefa.concluida}
              prazo={tarefa.prazo}
              onEdit={handleEditar}
              onDelete={handleApagar}
            />
          ))}
        </div>
      )}
      
      {tarefaParaApagar !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>⚠️ Atenção</h3>
            <p>Tem certeza que deseja apagar esta tarefa? Esta ação não poderá ser desfeita.</p>
            <div className="modal-acoes">
              <Button variante="secundario" onClick={() => setTarefaParaApagar(null)}>
                Cancelar
              </Button>
              <button className="btn-apagar-confirmar" onClick={confirmarApagar}>
                Sim, Apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const formataDataInput = (dataBruta) => {
  if (!dataBruta) return '';
  
  const data = new Date(dataBruta);
  
  if (isNaN(data.getTime())) return ''; 
  
  return data.toISOString().substring(0, 10);
};

export default Tarefas;