const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db"); 
const app = express();
const multer = require("multer");
const path = require("path");

require("dotenv").config()

app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null,uniqueName);
  }
});

function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de imagem inválido."), false);
  }
}

const upload = multer ({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 //5mb 
  },
})

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: "Token ausente." });

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  try {
    req.usuario = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido." });
  }
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post(
  "/upload",
  authMiddleware,            // exige JWT válido
  upload.single("imagem"),  // nome deve bater com formData.append("imagem", file)
  async (req, res) => {     // <-- AQUI: Adicionado o "async"
    if (!req.file) {
      return res.status(400).json({ erro: "Nenhum arquivo recebido." });
    }

    try {
      // Monta URL pública para o frontend exibir a imagem
      const url = `http://localhost:3001/uploads/${req.file.filename}`;

      // Salva a URL da foto no perfil do usuário no MySQL
      await db.execute(
        "UPDATE usuarios SET foto_perfil = ? WHERE id = ?",
        [url, req.usuario.id]
      );

      res.json({ url, mensagem: "Foto atualizada com sucesso no banco!" });
    } catch (erro) {
      console.error("Erro ao vincular imagem no banco:", erro);
      res.status(500).json({ erro: "Erro ao salvar imagem no banco de dados." });
    }
  }
);

app.use((err, req, res, _next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).json({ erro: err.message });
  }
  res.status(500).json({ erro: "Erro interno." });
});

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

// [READ] Buscar dados do perfil do usuário logado (ATUALIZADA)
app.get("/perfil", authMiddleware, async (req, res) => {
  try {
    // Agora o SELECT puxa o 'nome' também
    const [linhas] = await db.execute(
      "SELECT email, foto_perfil, nome FROM usuarios WHERE id = ?",
      [req.usuario.id]
    );
    
    if (linhas.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.json(linhas[0]);
  } catch (erro) {
    console.error("Erro ao buscar perfil:", erro);
    res.status(500).json({ erro: "Erro ao buscar perfil." });
  }
});

// [UPDATE] Atualizar nome e/ou senha do usuário (NOVA ROTA)
app.put("/perfil", authMiddleware, async (req, res) => {
  const { nome, senha } = req.body;

  try {
    // Se o usuário digitou uma senha nova, atualiza o nome e a senha
    if (senha && senha.trim() !== "") {
      await db.execute(
        "UPDATE usuarios SET nome = ?, senha = ? WHERE id = ?",
        [nome, senha, req.usuario.id]
      );
    } else {
      // Se a senha veio em branco, atualiza APENAS o nome
      await db.execute(
        "UPDATE usuarios SET nome = ? WHERE id = ?",
        [nome, req.usuario.id]
      );
    }

    res.json({ sucesso: true, mensagem: "Dados atualizados com sucesso!" });
  } catch (erro) {
    console.error("Erro ao atualizar perfil:", erro);
    res.status(500).json({ erro: "Erro interno ao atualizar os dados." });
  }
});

app.listen(3001, () => {
  console.log("API 1 (Autenticação/Login) rodando na porta 3001");
});