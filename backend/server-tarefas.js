const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// A chave tem que ser IGUAL à do servidor de Login
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

app.get("/api/tarefas", verificarToken, (req, res) => {
  res.json([
    {
      id: 1,
      titulo: "Implementar JWT",
      descricao: "Separar backend em microsserviços.",
      prioridade: "alta",
      concluida: true,
      prazo: "2026-06-03"
    },
    {
      id: 2,
      titulo: "Configurar Banco de Dados",
      descricao: "Substituir esses dados simulados por dados reais do banco.",
      prioridade: "media",
      concluida: false,
      prazo: "2026-06-15"
    }
  ]);
});

app.listen(3003, () => {
  console.log("API 3 (Tarefas) rodando na porta 3003");
});