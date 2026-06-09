const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Importa a conexão com o banco de dados que acabamos de criar!
const db = require("./db"); 

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "segredo_jwt"; 

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Vai no banco e busca o usuário com esse email
    const [linhas] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ?", 
      [email]
    );

    // 2. Se a lista estiver vazia, o email não existe
    if (linhas.length === 0) {
      return res.status(401).json({ erro: "E-mail não encontrado." });
    }

    const usuarioDoBanco = linhas[0];

    // 3. Compara a senha do banco com a senha digitada no React
    if (senha !== usuarioDoBanco.senha) {
      return res.status(401).json({ erro: "Senha incorreta." });
    }

    // 4. Se tudo deu certo, gera o token incluindo o ID real do banco!
    const token = jwt.sign(
      { id: usuarioDoBanco.id, email: usuarioDoBanco.email }, 
      SECRET, 
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (erro) {
    console.error("Erro ao acessar o banco de dados:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

app.listen(3001, () => {
  console.log("API 1 (Autenticação/Login) conectada ao MySQL rodando na porta 3001");
});