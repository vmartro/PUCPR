import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro("Por favor, preencha e-mail e senha.");
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        throw new Error(data.erro || "E-mail ou senha incorretos.");
      }

      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event('perfilAtualizado'));
      navigate('/');

    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <main className="auth-container">
      <h2>Acesse sua Conta</h2>

      {erro && <div className="auth-alerta auth-erro">{erro}</div>}

      <form onSubmit={handleLogin} className="auth-form" noValidate>
        <div className="auth-grupo">
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="auth-input"
            required
          />
        </div>

        <div className="auth-grupo">
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            className="auth-input"
            required
          />
        </div>

        <button type="submit" className="btn-auth btn-login">
          Entrar
        </button>
      </form>

      <p className="auth-rodape">
        Ainda não tem uma conta? <Link to="/cadastro" className="link-verde">Cadastre-se aqui</Link>
      </p>
    </main>
  );
}

export default Login;