import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagemSucesso('');

    try {
      const resposta = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || 'Erro ao cadastrar');
      }

      setMensagemSucesso(dados.mensagem);
      
      // Limpa os campos após o sucesso
      setEmail('');
      setSenha('');

      // Opcional: Redireciona para o login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div>
      <h1>Criar Nova Conta</h1>
      
      {erro && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          <strong>Erro:</strong> {erro}
        </div>
      )}

      {mensagemSucesso && (
        <div style={{ color: 'green', marginBottom: '10px' }}>
          {mensagemSucesso}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="senha">Senha: </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Cadastrar</button>
      </form>

      <br />
      
      <button onClick={() => navigate('/login')}>
        Já tenho uma conta (Fazer Login)
      </button>
    </div>
  );
}

export default Cadastro;