import { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
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
  const [contadorEmails, setContadorEmails] = useState(0);

  function handleEnviar(evento) {
    evento.preventDefault();
    
    setContadorEmails(contadorEmails + 1);
    
    alert('Funcionalidade de envio será implementada nas próximas entregas.');
  }

  return (
    <section>
      <PageTitle
        titulo="Contato"
        subtitulo="Fale com a equipe responsável pelo projeto"
      />

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
          <form className="contato-formulario" onSubmit={handleEnviar}>
            <label>
              Nome
              <input type="text" name="nome" required />
            </label>
            <label>
              E-mail
              <input type="email" name="email" required />
            </label>
            <label>
              Mensagem
              <textarea name="mensagem" rows="4" required />
            </label>
            <Button tipo="submit" variante="primario">
              Enviar
            </Button>
            
            <span style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>
              E-mails enviados: {contadorEmails}
            </span>
            
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contato;