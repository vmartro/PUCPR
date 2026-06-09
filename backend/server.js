const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "segredo_jwt";

const usuarioFake = {
  email: "admin@email.com",
  senha: "123456"
};

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (email !== usuarioFake.email || senha !== usuarioFake.senha) {
    return res.status(401).json({
      erro: "Usuário inválido"
    });
  }

  const token = jwt.sign(
    { email },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// ==========================================
// 1. MIDDLEWARE PARA VERIFICAR O TOKEN
// ==========================================
const verificarToken = (req, res, next) => {
  // Captura o token enviado pelo frontend no cabeçalho
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ erro: "Nenhum token fornecido." });
  }

  // Verifica a validade do token
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ erro: "Token inválido ou expirado. Faça login novamente." });
    }
    
    // Salva as informações decodificadas do usuário para usar na rota
    req.usuario = decoded;
    
    // Libera o fluxo para a rota solicitada
    next(); 
  });
};

// ==========================================
// 2. ROTA PROTEGIDA (Exemplo: Tarefas)
// ==========================================

app.get("/api/tarefas", verificarToken, (req, res) => {
  res.json({ 
    mensagem: "Você tem acesso às tarefas!", 
    emailLogado: req.usuario.email 
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando");
});

// Rota PROTEGIDA para receber mensagens de contato
app.post("/api/contato", verificarToken, (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Aqui no futuro você poderá salvar essa mensagem em um banco de dados
  console.log(`[Contato] Mensagem recebida de: ${nome} (${email})`);
  console.log(`[Conteúdo]: ${mensagem}`);
  console.log(`[Enviado por usuário autenticado]: ${req.usuario.email}`);

  // Retorna o sucesso para o frontend
  res.json({
    sucesso: true,
    mensagem: "Mensagem recebida e registrada com sucesso!",
  });
});