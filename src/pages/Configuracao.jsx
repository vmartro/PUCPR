import { useState, useEffect } from "react";
import ImageUpload from "../components/ImageUpload";
import './Auth.css';
import './Configuracao.css';

// --- Componentes SVG para os ícones simples ---
const IconeOlho = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.763 7.623 7.632 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.642 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconeOlhoFechado = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);
// ----------------------------------------------

export default function Configuracoes() {
  const [nome, setNome] = useState("");
  
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const token = localStorage.getItem("token");

  // Busca os dados do usuário
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

  // --- NOVO: Temporizador para fechar o Toast automaticamente ---
  useEffect(() => {
    if (mensagemSucesso || mensagemErro) {
      const timer = setTimeout(() => {
        setMensagemSucesso("");
        setMensagemErro("");
      }, 4000); // Some após 4 segundos (4000ms)
      
      // Limpa o temporizador se o componente for desmontado
      return () => clearTimeout(timer); 
    }
  }, [mensagemSucesso, mensagemErro]);
  // -------------------------------------------------------------

  function handleUploadSuccess(url) {
    setMensagemSucesso("Foto de perfil atualizada com sucesso!");
    setMensagemErro("");
    window.dispatchEvent(new Event("perfilAtualizado"));
  }

  async function handleAtualizarDados(e) {
    e.preventDefault();
    setMensagemSucesso("");
    setMensagemErro("");

    if (senha && senha !== confirmarSenha) {
      setMensagemErro("As senhas não coincidem. Verifique e tente novamente.");
      return;
    }

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
      
      setSenha(""); 
      setConfirmarSenha("");
      window.dispatchEvent(new Event("perfilAtualizado"));
      
    } catch (erro) {
      setMensagemErro(erro.message);
    }
  }

  return (
    <main style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
      <h2>Configurações da Conta</h2>

      {/* --- RENDERIZA O TOAST FLUTUANTE --- */}
      {mensagemSucesso && (
        <div className="toast-notificacao toast-sucesso">
          ✓ {mensagemSucesso}
        </div>
      )}

      {mensagemErro && (
        <div className="toast-notificacao toast-erro">
          ⚠️ {mensagemErro}
        </div>
      )}
      {/* ----------------------------------- */}

      <section style={{ backgroundColor: "#fdfdfd", padding: "20px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "30px" }}>
        <h3 style={{ marginTop: 0 }}>Foto de Perfil</h3>
        <p style={{ fontSize: "14px", color: "#666" }}>Faça o upload de uma nova imagem para o seu perfil.</p>
        <ImageUpload onSuccess={handleUploadSuccess} />
      </section>

      <section style={{ backgroundColor: "#fdfdfd", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
        <h3 style={{ marginTop: 0 }}>Dados Pessoais</h3>
        
        <form onSubmit={handleAtualizarDados} style={{ display: "flex", flexDirection: "column", gap: "15px" }} noValidate>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="nome" style={{ fontWeight: "bold", fontSize: "14px" }}>Nome de exibição:</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              className="auth-input" 
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="senha" style={{ fontWeight: "bold", fontSize: "14px" }}>Nova Senha:</label>
            <div className="auth-input-group">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Deixe em branco para não alterar"
                className="auth-input input-with-icon"
              />
              <button 
                type="button" 
                className="icon-button" 
                onClick={() => setMostrarSenha(!mostrarSenha)}
                title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? <IconeOlhoFechado /> : <IconeOlho />}
              </button>
            </div>
            <small style={{ color: "#888" }}>Preencha apenas se quiser trocar a sua senha atual.</small>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="confirmarSenha" style={{ fontWeight: "bold", fontSize: "14px" }}>Confirmar Nova Senha:</label>
            <div className="auth-input-group">
              <input
                id="confirmarSenha"
                type={mostrarConfirmarSenha ? "text" : "password"}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Repita a nova senha"
                className="auth-input input-with-icon"
              />
              <button 
                type="button" 
                className="icon-button" 
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                title={mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarConfirmarSenha ? <IconeOlhoFechado /> : <IconeOlho />}
              </button>
            </div>
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