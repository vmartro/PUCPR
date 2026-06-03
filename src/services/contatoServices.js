
export async function enviarMensagem(dados) {
  // Chama a função de validação interna
  validarDados(dados);

  // Simula o tempo de rede de uma API real (800 milissegundos)
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
  
  // Validação de e-mail via Regex
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(dados.email)) {
    erros.push("Insira um e-mail válido.");
  }
  
  if (!dados.mensagem || dados.mensagem.trim().length < 10) {
    erros.push("A mensagem deve ter no mínimo 10 caracteres.");
  }

  // Se houver qualquer erro, dispara uma exceção para o componente capturar
  if (erros.length > 0) {
    throw new Error(erros.join(" | "));
  }
}