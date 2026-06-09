// URL do endpoint de contato no seu backend local
const API_URL = "http://localhost:3001/api/contato";

// Função auxiliar para capturar o token e gerar os cabeçalhos
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json; charset=UTF-8",
    "authorization": token // Envia o token JWT para o backend
  };
};

// Redireciona para o login se o token expirar no meio da sessão
const tratarErroAutenticacao = (status) => {
  if (status === 401 || status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
};

export async function enviarMensagem(dados) {
  // 1. Mantém a validação local no frontend para evitar requisições desnecessárias
  validarDados(dados);

  try {
    // 2. Faz a requisição real de POST enviando o token no cabeçalho
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(dados),
    });

    // 3. Verifica se o token ainda é válido
    tratarErroAutenticacao(resposta.status);

    if (!resposta.ok) {
      const erroDados = await resposta.json();
      throw new Error(erroDados.erro || "Erro ao enviar mensagem.");
    }

    return await resposta.json();
  } catch (erro) {
    // Repassa o erro estruturado para o componente exibir na tela
    throw new Error(erro.message || "Erro de conexão com o servidor.");
  }
}

function validarDados(dados) {
  const erros = [];

  if (!dados.nome || !dados.nome.trim()) {
    erros.push("O nome é obrigatório.");
  }
  
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(dados.email)) {
    erros.push("Insira um e-mail válido.");
  }
  
  if (!dados.mensagem || dados.mensagem.trim().length < 10) {
    erros.push("A mensagem deve ter no mínimo 10 caracteres.");
  }

  if (erros.length > 0) {
    throw new Error(erros.join(" | "));
  }
}