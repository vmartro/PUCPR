const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db"); // Importa a conexão com o MySQL`
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET;

const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ erro: "Nenhum token fornecido." });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ erro: "Token inválido." });
    req.usuario = decoded;
    next(); 
  });
};

app.post("/api/contato", verificarToken, async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    // Salva a mensagem fisicamente no banco de dados
    await db.execute(
      "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)",
      [nome, email, mensagem]
    );

    console.log(`Mensagem de ${nome} salva no banco de dados!`);

    res.json({ sucesso: true, mensagem: "Mensagem recebida e registrada no banco!" });
  } catch (erro) {
    console.error("Erro ao salvar contato no banco:", erro);
    res.status(500).json({ erro: "Erro ao processar mensagem." });
  }
});

app.listen(3002, () => {
  console.log("API 2 (Contatos) conectada ao MySQL na porta 3002");
});