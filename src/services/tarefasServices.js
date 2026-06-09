const API_URL = "http://localhost:3003/api/tarefas";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json; charset=UTF-8",
    "authorization": token 
  };
};

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
    
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao buscar", erro);
    return [];
  }
}

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