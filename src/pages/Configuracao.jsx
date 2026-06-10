import { useState, useEffect } from "react";
import ImageUpload from "../components/ImageUpload";

export default function Configuracoes() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const token = localStorage.getItem("token");

  // Busca os dados atuais do usuário para preencher o formulário
  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/perfil", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.nome) setNome(data.nome);
        })
        .catch((err) => console.error("Erro ao buscar perfil", err));
    }
  }, [token]);

  // Função que o seu componente ImageUpload vai chamar quando der certo
  function handleUploadSuccess(url) {
    setMensagemSucesso("Foto de perfil atualizada com sucesso!");
    setMensagemErro("");
    // Grita para o MainLayout atualizar a foto no topo da tela
    window.dispatchEvent(new Event("perfilAtualizado"));
  }

  // Função para salvar o novo nome e/ou a nova senha
  async function handleAtualizarDados(e) {
    e.preventDefault();
    setMensagemSucesso("");
    setMensagemErro("");

    try {
      const res = await fetch("http://localhost:3001/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.erro || "Erro ao atualizar os dados.");
      }

      setMensagemSucesso("Dados da conta atualizados com sucesso!");
      setSenha(""); // Limpa o campo de senha por segurança após salvar
      
    } catch (erro) {
      setMensagemErro(erro.message);
    }
  }

  return (
    <main style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
      <h2>Configurações da Conta</h2>

      {/* --- MENSAGENS NA TELA (SUBSTITUINDO OS ALERTS) --- */}
      {mensagemSucesso && (
        <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "12px", borderRadius: "6px", marginBottom: "20px", border: "1px solid #c3e6cb" }}>
          {mensagemSucesso}
        </div>
      )}

      {mensagemErro && (
        <div style={{ backgroundColor: "#f8d7da", color: "#721c24", padding: "12px", borderRadius: "6px", marginBottom: "20px", border: "1px solid #f5c6cb" }}>
          {mensagemErro}
        </div>
      )}
      {/* ------------------------------------------------ */}

      <section style={{ backgroundColor: "#fdfdfd", padding: "20px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "30px" }}>
        <h3 style={{ marginTop: 0 }}>Foto de Perfil</h3>
        <p style={{ fontSize: "14px", color: "#666" }}>Faça o upload de uma nova imagem para o seu perfil.</p>
        <ImageUpload onSuccess={handleUploadSuccess} />
      </section>

      <section style={{ backgroundColor: "#fdfdfd", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
        <h3 style={{ marginTop: 0 }}>Dados Pessoais</h3>
        
        <form onSubmit={handleAtualizarDados} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="nome" style={{ fontWeight: "bold", fontSize: "14px" }}>Nome de exibição:</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="senha" style={{ fontWeight: "bold", fontSize: "14px" }}>Nova Senha:</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Deixe em branco para não alterar"
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <small style={{ color: "#888" }}>Preencha apenas se quiser trocar a sua senha atual.</small>
          </div>

          <button 
            type="submit" 
            style={{ 
              padding: "12px", backgroundColor: "#0275d8", color: "white", 
              border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", 
              marginTop: "10px" 
            }}
          >
            Salvar Alterações
          </button>
        </form>
      </section>
    </main>
  );
}