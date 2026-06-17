const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  const { nome, mensagem } = req.body; 
  
  const emailDoUsuario = req.usuario.email; 

  try {
    const respostaApiExterna = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "Formulario <onboarding@resend.dev>",
        to: [process.env.EMAIL_RECEBEDOR],
        // Aqui usamos o e-mail seguro que veio do token!
        reply_to: emailDoUsuario, 
        subject: `Novo Contato de: ${nome}`,
        html: `
          <h3>Novo Contato via Site</h3>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>E-mail (Autenticado):</strong> ${emailDoUsuario}</p>
          <p><strong>Mensagem:</strong><br/>${mensagem.replace(/\n/g, '<br/>')}</p>
        `
      })
    });

    const dadosApi = await respostaApiExterna.json();

    if (!respostaApiExterna.ok) {
      throw new Error("Falha ao processar e-mail na API Externa.");
    }

    console.log("✅ E-mail autenticado enviado! ID:", dadosApi.id);
    res.json({ sucesso: true, mensagem: "Sua mensagem foi enviada com sucesso!" });

  } catch (erro) {
    console.error("Erro:", erro);
    res.status(500).json({ erro: "Erro ao tentar enviar a mensagem." });
  }
});

app.listen(3002, () => {
  console.log("API 2 (Contatos REST) rodando na porta 3002");
});