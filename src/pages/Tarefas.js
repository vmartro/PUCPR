// src/pages/Tarefas.js
import { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import TarefaCard from '../components/TarefaCard';
import Button from '../components/Button';
import { buscarTarefas, criarTarefa, atualizarTarefa, excluirTarefa } from '../services/tarefasServices';
import './Tarefas.css';

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados do formulário CRUD
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

  // Controla o que é digitado no formulário
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  // Prepara o formulário para adicionar
  function abrirNovo() {
    setForm({ titulo: '', descricao: '', prioridade: 'media', prazo: '2026-06-03', concluida: false });
    setEditandoId(null);
    setMostrarForm(true);
  }

  // Prepara o formulário para editar
  function handleEditar(id) {
    const tarefaAlvo = tarefas.find(t => t.id === id);
    setForm(tarefaAlvo);
    setEditandoId(id);
    setMostrarForm(true);
  }

  // Ação da lixeira
  async function handleApagar(id) {
    if (window.confirm("Tem certeza que deseja apagar esta tarefa?")) {
      await excluirTarefa(id);
      setTarefas(tarefas.filter(t => t.id !== id)); // Remove da tela
    }
  }

  // Salvar (Criar ou Atualizar)
  async function handleSalvar(e) {
    e.preventDefault();
    if (editandoId) {
      // Atualizar
      const atualizada = await atualizarTarefa(editandoId, { ...form, id: editandoId });
      setTarefas(tarefas.map(t => (t.id === editandoId ? atualizada : t)));
    } else {
      // Criar
      const nova = await criarTarefa(form);
      setTarefas([nova, ...tarefas]); // Coloca a nova no começo da lista
    }
    setMostrarForm(false); // Esconde o form depois de salvar
  }

  const totalConcluidas = tarefas.filter((t) => t.concluida).length;
  const totalPendentes = tarefas.length - totalConcluidas;

  return (
    <section>
      <PageTitle
        titulo="Minhas Tarefas"
        subtitulo={loading ? "Carregando dados..." : `${totalPendentes} pendente(s) · ${totalConcluidas} concluída(s)`}
      />

      {/* Botão de Adicionar */}
      {!mostrarForm && (
        <div style={{ marginBottom: '20px' }}>
          <Button variante="primario" onClick={abrirNovo}>+ Adicionar Tarefa</Button>
        </div>
      )}

      {/* Formulário de Adicionar/Editar */}
      {mostrarForm && (
        <form onSubmit={handleSalvar} style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3>{editandoId ? '✏️ Editar Tarefa' : '+ Nova Tarefa'}</h3>
          
          <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
          <input type="text" name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
          <input type="date" name="prazo" value={form.prazo} onChange={handleChange} required />
          
          <select name="prioridade" value={form.prioridade} onChange={handleChange}>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>

          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" name="concluida" checked={form.concluida} onChange={handleChange} />
            Tarefa Concluída
          </label>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button tipo="submit" variante="primario">Salvar</Button>
            <Button tipo="button" variante="secundario" onClick={() => setMostrarForm(false)}>Cancelar</Button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Buscando tarefas na API...</p>
      ) : (
        <div className="tarefas-lista">
          {tarefas.map((tarefa) => (
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
    </section>
  );
}

export default Tarefas;