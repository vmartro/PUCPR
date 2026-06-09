// Configuração central da URL do seu backend local
const API_URL = "http://localhost:3001/api/tarefas";

// Função para pegar o token e montar o cabeçalho
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json; charset=UTF-8",
    "authorization": token // Envia a chave de segurança
  };
};

// Função para forçar o logout se o token for inválido
const tratarErroAutenticacao = (status) => {
  if (status === 401 || status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
};

// [READ] Buscar todas
export async function buscarTarefas() {
  try {
    const resposta = await fetch(API_URL, {
      method: "GET",
      headers: getHeaders(),
    });

    tratarErroAutenticacao(resposta.status);
    
    // Agora assumimos que o seu backend vai devolver os dados no formato correto
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao buscar", erro);
    return [];
  }
}

// [CREATE] Criar nova
export async function criarTarefa(novaTarefa) {
  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(novaTarefa),
    });

    tratarErroAutenticacao(resposta.status);

    const dados = await resposta.json();
    return dados; 
  } catch (erro) {
    throw new Error("Erro ao criar tarefa.");
  }
}

// [UPDATE] Atualizar existente
export async function atualizarTarefa(id, tarefaAtualizada) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(tarefaAtualizada),
    });

    tratarErroAutenticacao(resposta.status);

    return await resposta.json();
  } catch (erro) {
    throw new Error("Erro ao atualizar tarefa.");
  }
}

// [DELETE] Excluir
export async function excluirTarefa(id) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, { 
      method: "DELETE",
      headers: getHeaders()
    });

    tratarErroAutenticacao(resposta.status);

    return true;
  } catch (erro) {
    throw new Error("Erro ao excluir tarefa.");
  }
}