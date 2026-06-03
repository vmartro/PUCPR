// [READ] Buscar todas
export async function buscarTarefas() {
  try {
    const resposta = await fetch("https://jsonplaceholder.typicode.com/todos");
    const dados = await resposta.json();
    return dados.slice(0, 4).map((todo) => ({
      id: todo.id,
      titulo: todo.title,
      descricao: "Tarefa importada via API",
      prioridade: todo.id % 2 === 0 ? "alta" : "media",
      concluida: todo.completed,
      prazo: "2026-06-03",
    }));
  } catch (erro) {
    console.error("Erro ao buscar", erro);
    return [];
  }
}

// [CREATE] Criar nova
export async function criarTarefa(novaTarefa) {
  try {
    const resposta = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(novaTarefa),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const dados = await resposta.json();
    // A API devolve um ID genérico (ex: 201). Vamos gerar um ID único com a data atual para o React não reclamar.
    return { ...novaTarefa, id: Date.now() }; 
  } catch (erro) {
    throw new Error("Erro ao criar tarefa.");
  }
}

// [UPDATE] Atualizar existente
export async function atualizarTarefa(id, tarefaAtualizada) {
  try {
    // Fazemos um PUT simulando a atualização do ID 1 da API
    await fetch(`https://jsonplaceholder.typicode.com/todos/1`, {
      method: "PUT",
      body: JSON.stringify(tarefaAtualizada),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    return tarefaAtualizada;
  } catch (erro) {
    throw new Error("Erro ao atualizar tarefa.");
  }
}

// [DELETE] Excluir
export async function excluirTarefa(id) {
  try {
    // Fazemos um DELETE simulando a exclusão
    await fetch(`https://jsonplaceholder.typicode.com/todos/1`, { method: "DELETE" });
    return true;
  } catch (erro) {
    throw new Error("Erro ao excluir tarefa.");
  }
}