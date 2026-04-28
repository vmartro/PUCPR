import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import './Contato.css';

const INTEGRANTES = [
  {
    nome: 'Matheus Vicente Martins Castro',
    papel: 'Desenvolvimento e organização do projeto',
    email: 'matheusvicentemartinscastro@gmail.com',
  },
];

function Contato() {
  function handleEnviar(evento) {
    evento.preventDefault();
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
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contato;
