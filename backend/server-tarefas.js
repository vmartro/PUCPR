const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db"); // Importa a conexão com o MySQL

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "segredo_jwt"; 

const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ erro: "Nenhum token fornecido." });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ erro: "Token inválido." });
    
    // O decoded agora tem req.usuario.id (que veio da API 1 no momento do login)
    req.usuario = decoded; 
    next(); 
  });
};

// [READ] Buscar apenas as tarefas do usuário logado
app.get("/api/tarefas", verificarToken, async (req, res) => {
  try {
    const [tarefas] = await db.execute(
      "SELECT * FROM tarefas WHERE usuario_id = ?", 
      [req.usuario.id] // Filtra pela Chave Estrangeira do banco
    );
    
    res.json(tarefas);
  } catch (erro) {
    console.error("Erro ao buscar tarefas:", erro);
    res.status(500).json({ erro: "Erro ao buscar tarefas do banco." });
  }
});

// [CREATE] Criar uma nova tarefa amarrada ao usuário logado
app.post("/api/tarefas", verificarToken, async (req, res) => {
  const { titulo, descricao, prazo, prioridade } = req.body;

  try {
    const [resultado] = await db.execute(
      "INSERT INTO tarefas (titulo, descricao, prazo, prioridade, usuario_id) VALUES (?, ?, ?, ?, ?)",
      [titulo, descricao, prazo, prioridade || 'media', req.usuario.id]
    );

    // Devolve para o React a tarefa recém-criada, com o ID oficial gerado pelo MySQL
    res.json({
      id: resultado.insertId,
      titulo,
      descricao,
      prazo,
      prioridade,
      concluida: false,
      usuario_id: req.usuario.id
    });
  } catch (erro) {
    console.error("Erro ao criar tarefa:", erro);
    res.status(500).json({ erro: "Erro ao salvar tarefa no banco." });
  }
});

// [UPDATE] Editar uma tarefa existente (apenas se pertencer ao usuário logado)
app.put("/api/tarefas/:id", verificarToken, async (req, res) => {
  const { id } = req.params; // Pega o ID da tarefa enviado na URL
  const { titulo, descricao, prazo, prioridade, concluida } = req.body;

  try {
    // Executa a atualização filtrando pelo ID da tarefa E pelo ID do usuário do token
    const [resultado] = await db.execute(
      `UPDATE tarefas 
       SET titulo = ?, descricao = ?, prazo = ?, prioridade = ?, concluida = ? 
       WHERE id = ? AND usuario_id = ?`,
      [titulo, descricao, prazo, prioridade, concluida, id, req.usuario.id]
    );

    // Se nenhuma linha foi afetada, significa que a tarefa não existe ou não pertence a esse usuário
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: "Tarefa não encontrada ou acesso negado." });
    }

    // Retorna os dados atualizados para o React atualizar o estado na tela
    res.json({
      id: Number(id),
      titulo,
      descricao,
      prazo,
      prioridade,
      concluida,
      usuario_id: req.usuario.id
    });
  } catch (erro) {
    console.error("Erro ao atualizar tarefa:", erro);
    res.status(500).json({ erro: "Erro ao atualizar tarefa no banco." });
  }
});

// [DELETE] Excluir uma tarefa (apenas se pertencer ao usuário logado)
app.delete("/api/tarefas/:id", verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    const [resultado] = await db.execute(
      "DELETE FROM tarefas WHERE id = ? AND usuario_id = ?",
      [id, req.usuario.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: "Tarefa não encontrada ou acesso negado." });
    }

    // Retorna sucesso para o frontend remover o card da tela
    res.json({ sucesso: true, mensagem: "Tarefa excluída com sucesso." });
  } catch (erro) {
    console.error("Erro ao excluir tarefa:", erro);
    res.status(500).json({ erro: "Erro ao excluir tarefa no banco." });
  }
});

app.listen(3003, () => {
  console.log("API 3 (Tarefas) conectada ao MySQL na porta 3003");
});