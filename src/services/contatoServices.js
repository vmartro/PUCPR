const API_URL = "http://localhost:3002/api/contato";

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

export async function enviarMensagem(dados) {
  validarDados(dados);

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(dados),
    });

    tratarErroAutenticacao(resposta.status);

    if (!resposta.ok) {
      const erroDados = await resposta.json();
      throw new Error(erroDados.erro || "Erro ao enviar mensagem.");
    }

    return await resposta.json();
  } catch (erro) {
    throw new Error(erro.message || "Erro de conexão com o servidor.");
  }
}

function validarDados(dados) {
  const erros = [];

  if (!dados.nome || !dados.nome.trim()) {
    erros.push("O nome é obrigatório.");
  }
  
  // A validação de e-mail foi totalmente removida daqui!
  
  if (!dados.mensagem || dados.mensagem.trim().length < 10) {
    erros.push("A mensagem deve ter no mínimo 10 caracteres.");
  }

  if (erros.length > 0) {
    throw new Error(erros.join(" | "));
  }
}