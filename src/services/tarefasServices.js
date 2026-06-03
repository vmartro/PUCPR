import tarefasIniciais from '../data/tarefas';

// Nome do "cofre" (chave) onde o navegador vai guardar os nossos dados
const CHAVE_STORAGE = 'tarefas_app_dados';

// FUNÇÕES DE DISCO (Falam com o LocalStorage)

// Lê os dados salvos. Se for a primeira vez (vazio), carrega as tarefas iniciais.
function obterDados() {
  const dadosGuardados = localStorage.getItem(CHAVE_STORAGE);
  if (!dadosGuardados) {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefasIniciais));
    return [...tarefasIniciais];
  }
  return JSON.parse(dadosGuardados); // Transforma o texto (JSON) de volta numa lista do JavaScript
}

// Transforma a lista atualizada num texto (JSON) e guarda no cofre do navegador
function guardarDados(dados) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(dados));
}

// SIMULAÇÃO DE API (O "Backend" Fake)

// [READ] Busca todas as tarefas
export async function buscarTarefas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dados = obterDados(); // Pega o que está salvo
      resolve(dados); // Entrega para a tela
    }, 300); // Finge que demorou 300ms
  });
}

// [CREATE] Adiciona uma nova tarefa
export async function criarTarefa(novaTarefa) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dados = obterDados();
      const tarefaComId = { ...novaTarefa, id: Date.now() }; // Gera um ID único na hora
      
      const novosDados = [tarefaComId, ...dados]; // Coloca a nova tarefa no topo da lista
      guardarDados(novosDados); // Salva a lista nova no navegador
      
      resolve(tarefaComId);
    }, 400);
  });
}

// [UPDATE] Edita uma tarefa existente
export async function atualizarTarefa(id, tarefaAtualizada) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let dados = obterDados();
      // Olha a lista e substitui apenas a tarefa que tem o mesmo ID
      dados = dados.map(t => t.id === id ? tarefaAtualizada : t);
      
      guardarDados(dados); // Salva no navegador
      resolve(tarefaAtualizada);
    }, 400);
  });
}

// [DELETE] Apaga uma tarefa
export async function excluirTarefa(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let dados = obterDados();
      // Filtra a lista para manter todas as tarefas, MENOS aquela que queremos apagar
      dados = dados.filter(t => t.id !== id);
      
      guardarDados(dados); // Salva a lista
      resolve(true); // Confirma que deu certo
    }, 400);
  });
}