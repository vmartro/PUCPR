
export async function enviarMensagem(dados) {
  validarDados(dados);

  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    sucesso: true,
    mensagem: "Enviado com sucesso",
  };
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