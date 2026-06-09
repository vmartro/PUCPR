const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "segredo_jwt"; 

const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ erro: "Nenhum token fornecido." });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ erro: "Token inválido ou expirado. Faça login novamente." });
    }
    
    req.usuario = decoded;
    next(); 
  });
};

app.post("/api/contato", verificarToken, (req, res) => {
  const { nome, email, mensagem } = req.body;

  console.log(`[Contato - API 2] Mensagem recebida de: ${nome} (${email})`);
  console.log(`[Conteúdo]: ${mensagem}`);
  console.log(`[Enviado por usuário autenticado]: ${req.usuario.email}`);

  res.json({
    sucesso: true,
    mensagem: "Mensagem recebida e registrada com sucesso pela API 2!",
  });
});

app.listen(3002, () => {
  console.log("API 2 (Contatos) rodando na porta 3002");
});