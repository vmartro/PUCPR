const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db"); 
const app = express();
require("dotenv").config()

app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET;

// [CREATE] Rota para cadastrar novos usuários (Sem Criptografia)
app.post("/cadastro", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [usuariosExistentes] = await db.execute(
      "SELECT id FROM usuarios WHERE email = ?", 
      [email]
    );

    if (usuariosExistentes.length > 0) {
      return res.status(400).json({ erro: "Este e-mail já está em uso." });
    }

    // Salva o usuário no MySQL com a senha em texto puro
    await db.execute(
      "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
      [email, senha]
    );

    res.status(201).json({ 
      sucesso: true, 
      mensagem: "Usuário cadastrado com sucesso! Você já pode fazer o login." 
    });

  } catch (erro) {
    console.error("Erro no cadastro:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
});


// [READ] Rota de Login (Comparação Simples)
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [linhas] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ?", 
      [email]
    );

    if (linhas.length === 0) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    const usuarioDoBanco = linhas[0];

    // Compara a senha digitada no React diretamente com a do banco
    if (senha !== usuarioDoBanco.senha) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    // Se a senha bater, gera o token
    const token = jwt.sign(
      { id: usuarioDoBanco.id, email: usuarioDoBanco.email }, 
      SECRET, 
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (erro) {
    console.error("Erro no login:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

app.listen(3001, () => {
  console.log("API 1 (Autenticação/Login) rodando na porta 3001");
});