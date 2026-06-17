import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

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
// --------------------------------------------------------

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  
  const navigate = useNavigate();

  async function handleCadastro(e) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Validação 1: Campos vazios
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    // Validação 2: Formato de e-mail (exige texto + @ + texto + .com/.br etc)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro("Por favor, insira um e-mail válido (ex: seuemail@dominio.com).");
      return;
    }

    // Validação 3: Senhas iguais
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem. Tente novamente.");
      return;
    }

    try {
      // Agora enviamos o nome também para o backend!
      const resposta = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }) 
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        throw new Error(data.erro || "Erro ao realizar o cadastro.");
      }

      setSucesso("Cadastro realizado com sucesso! Redirecionando...");
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <main className="auth-container">
      <h2>Criar Nova Conta</h2>

      {erro && <div className="auth-alerta auth-erro">{erro}</div>}
      {sucesso && <div className="auth-alerta auth-sucesso">{sucesso}</div>}

      <form onSubmit={handleCadastro} className="auth-form" noValidate>
        
        <div className="auth-grupo">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome ou apelido"
            className="auth-input"
            required
          />
        </div>

        <div className="auth-grupo">
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
            className="auth-input"
            required
          />
        </div>

        <div className="auth-grupo">
          <label htmlFor="senha">Senha:</label>
          <div className="auth-input-group">
            <input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Crie uma senha segura"
              className="auth-input input-with-icon"
              required
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
        </div>

        <div className="auth-grupo">
          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <div className="auth-input-group">
            <input
              id="confirmarSenha"
              type={mostrarConfirmarSenha ? "text" : "password"}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Digite a senha novamente"
              className="auth-input input-with-icon"
              required
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

        <button type="submit" className="btn-auth btn-cadastro">
          Cadastrar
        </button>
      </form>

      <p className="auth-rodape">
        Já tem uma conta? <Link to="/login" className="link-azul">Faça login aqui</Link>
      </p>
    </main>
  );
}

export default Cadastro;