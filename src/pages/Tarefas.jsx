import { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import TarefaCard from '../components/TarefaCard';
import Button from '../components/Button';
import { buscarTarefas, criarTarefa, atualizarTarefa, excluirTarefa } from '../services/tarefasServices';
import './Tarefas.css';

function Tarefas() {
  // 1. ESTADOS (Variáveis que atualizam a tela)
  const [tarefas, setTarefas] = useState([]); // Guarda a lista de tarefas
  const [loading, setLoading] = useState(true); // Controla o aviso de "Carregando..."
  const [termoPesquisa, setTermoPesquisa] = useState(''); // Guarda o texto da barra de pesquisa
  const [tarefaParaApagar, setTarefaParaApagar] = useState(null); // Guarda qual tarefa o usuário quer apagar (para o pop-up)
  const [mostrarForm, setMostrarForm] = useState(false); // Esconde ou mostra o formulário
  const [editandoId, setEditandoId] = useState(null); // Lembra qual tarefa estamos editando
  const [form, setForm] = useState({ titulo: '', descricao: '', prioridade: 'media', prazo: '2026-06-03', concluida: false }); // Dados do formulário

  // 2. EFEITOS (O que acontece ao abrir a página)
  useEffect(() => {
    // Busca as tarefas salvas assim que a tela carrega
    async function carregar() {
      const dados = await buscarTarefas();
      setTarefas(dados);
      setLoading(false); // Tira o aviso de "Carregando"
    }
    carregar();
  }, []);

  // 3. FUNÇÕES DO FORMULÁRIO E BOTÕES

  // Atualiza a variável 'form' sempre que o usuário digita algo
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  // Limpa o formulário e abre a tela para criar uma tarefa do zero
  function abrirNovo() {
    setForm({ titulo: '', descricao: '', prioridade: 'media', prazo: '2026-06-03', concluida: false });
    setEditandoId(null);
    setMostrarForm(true);
  }

  // Pega os dados de uma tarefa existente e joga dentro do formulário para editar
  function handleEditar(id) {
    const tarefaAlvo = tarefas.find(t => t.id === id);
    setForm(tarefaAlvo);
    setEditandoId(id);
    setMostrarForm(true);
  }

  // Apenas abre o pop-up de confirmação (ainda não apaga)
  function handleApagar(id) {
    setTarefaParaApagar(id);
  }

  // Apaga de verdade após o usuário clicar em "Sim" no pop-up
  async function confirmarApagar() {
    if (tarefaParaApagar !== null) {
      await excluirTarefa(tarefaParaApagar); // Apaga no banco/localStorage
      setTarefas(tarefas.filter(t => t.id !== tarefaParaApagar)); // Tira da tela
      setTarefaParaApagar(null); // Fecha o pop-up
    }
  }

  // Salva a tarefa (serve tanto para criar uma nova quanto para atualizar uma existente)
  async function handleSalvar(e) {
    e.preventDefault();
    if (editandoId) {
      // Se tem um ID, é porque estamos atualizando
      const atualizada = await atualizarTarefa(editandoId, { ...form, id: editandoId });
      setTarefas(tarefas.map(t => (t.id === editandoId ? atualizada : t)));
    } else {
      // Se não tem ID, é porque estamos criando uma nova
      const nova = await criarTarefa(form);
      setTarefas([nova, ...tarefas]); // Coloca a nova no topo da lista
    }
    setMostrarForm(false); // Fecha o formulário após salvar
  }

  // 4. LÓGICA DE EXIBIÇÃO (Cálculos para a tela)

  // Conta quantas estão prontas e quantas faltam para mostrar no título
  const totalConcluidas = tarefas.filter((t) => t.concluida).length;
  const totalPendentes = tarefas.length - totalConcluidas;

  // Filtra a lista em tempo real com base no que foi digitado na pesquisa
  const tarefasFiltradas = tarefas.filter((tarefa) =>
    tarefa.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  // 5. O QUE VAI APARECER NA TELA 
  return (
    <section>
      {/* Título dinâmico */}
      <PageTitle
        titulo="Minhas Tarefas"
        subtitulo={loading ? "Carregando dados..." : `${totalPendentes} pendente(s) · ${totalConcluidas} concluída(s)`}
      />

      {/* Barra de Pesquisa (some se o form estiver aberto) */}
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

      {/* Botão de Adicionar (some se o form estiver aberto) */}
      {!mostrarForm && (
        <div style={{ marginBottom: '20px' }}>
          <Button variante="primario" onClick={abrirNovo}>+ Adicionar Tarefa</Button>
        </div>
      )}

      {/* Formulário de Criação/Edição */}
      {mostrarForm && (
        <form onSubmit={handleSalvar} className="form-container">
          <h3>{editandoId ? '✏️ Editar Tarefa' : '+ Nova Tarefa'}</h3>
          
          <input className="form-input" type="text" name="titulo" placeholder="Título da tarefa" value={form.titulo} onChange={handleChange} required />
          <input className="form-input" type="text" name="descricao" placeholder="Descrição detalhada da tarefa..." value={form.descricao} onChange={handleChange} required />
          <input className="form-input" type="date" name="prazo" value={form.prazo} onChange={handleChange} required />
          
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

      {/* Lista de Tarefas */}
      {loading ? (
        <p>Buscando tarefas na API...</p>
      ) : (
        <div className="tarefas-lista">
          {/* Mensagem caso a pesquisa não encontre nada */}
          {tarefasFiltradas.length === 0 && termoPesquisa !== '' && (
            <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhuma tarefa encontrada com "{termoPesquisa}".</p>
          )}

          {/* Desenha os cartões na tela usando a lista filtrada */}
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
      
      {/* Pop-up (Modal) de confirmação de exclusão */}
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

export default Tarefas;