import { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import { enviarMensagem } from '../services/contatoServices';
import './Contato.css';

const INTEGRANTES = [
  {
    nome: 'Matheus Vicente Martins Castro',
    papel: 'Desenvolvimento e organização do projeto',
    email: 'matheus.castro@pucpr.edu.br',
  },
  {
    nome: 'Henrique Fugikawa Abe',
    papel: 'Desenvolvimento e organização do projeto',
    email: 'henrique.fugikawa@pucpr.edu.br',
  },
  {
    nome: 'Erich Natal Augusto da Silva',
    papel: 'Desenvolvimento e organização do projeto',
    email: 'erich.augusto@pucpr.edu.br',
  },
];

function Contato() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState("ocioso");
  const [erro, setErro] = useState("");
  const [dadosEnviados, setDadosEnviados] = useState(null);

  // Atualiza o estado a cada tecla digitada
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // Intercepta o clique de enviar
  async function handleEnviar(evento) {
    evento.preventDefault(); // Impede a página de recarregar
    setErro("");
    setStatus("carregando");

    try {
      // Envia para o Service validar e simular requisição
      await enviarMensagem(formData);
      
      // SALVA O RECIBO: Copia os dados atuais para o estado de recibo
      setDadosEnviados(formData); 
      
      setStatus("sucesso");
    } catch (err) {
      setErro(err.message);
      setStatus("ocioso");
    }
  }

  function handleReset() {
    setFormData({ nome: '', email: '', mensagem: '' });
    setStatus("ocioso");
    setErro("");
    setDadosEnviados(null); 
  }

  return (
    <section>
      <PageTitle titulo="Contato" subtitulo="Fale com a equipe responsável pelo projeto" />

      <div className="contato-grade">
        <div className="contato-card">
          <h2>Equipe</h2>
          <ul className="contato-lista">
            {INTEGRANTES.map((pessoa) => (
              <li key={pessoa.email}>
                <strong>{pessoa.nome}</strong>
                <span>{pessoa.papel}</span>
                <a href={`mailto:${pessoa.email}`}>{pessoa.email}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contato-card">
          <h2>Envie uma mensagem</h2>
          
          {status === "sucesso" ? (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <h3 style={{ color: 'green', marginBottom: '1rem' }}>Mensagem enviada com sucesso!</h3>
              <p>Obrigado pelo contato, {dadosEnviados?.nome}.</p>
              <Button onClick={handleReset} variante="secundario" tipo="button" style={{ marginTop: '1rem' }}>
                Enviar outra mensagem
              </Button>
            </div>
          ) : (
            <form className="contato-formulario" onSubmit={handleEnviar}>
              {/* Exibe o erro vindo do Service, se existir */}
              {erro && <p style={{ color: "red", fontWeight: "bold", fontSize: "0.9rem" }}>Erro: {erro}</p>}
              
              <label>
                Nome
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
              </label>
              <label>
                Mensagem
                <textarea name="mensagem" rows="4" value={formData.mensagem} onChange={handleChange} />
              </label>
              
              <Button tipo="submit" variante="primario" disabled={status === "carregando"}>
                {status === "carregando" ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Exibição da mensagem enviada (O Recibo) */}
      {dadosEnviados && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <h3 style={{ marginTop: 0, color: '#198754' }}>✅ Mensagem Registrada</h3>
          <p><strong>Nome:</strong> {dadosEnviados.nome}</p>
          
          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ccc' }}>
            <strong>Conteúdo da mensagem:</strong>
            <p style={{ whiteSpace: 'pre-wrap', color: '#555', marginTop: '5px', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', border: '1px dashed #ccc' }}>
              {dadosEnviados.mensagem}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contato;