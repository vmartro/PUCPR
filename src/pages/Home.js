import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import './Home.css';

function Home() {
  return (
    <section>
      <PageTitle
        titulo="Bem-vindo à Lista de Tarefas"
        subtitulo="Aplicação desenvolvida para o RA1 da disciplina PSI141"
      />

      <div className="home-cartao">
        <h2>Sobre o projeto</h2>
        <p>
          Este projeto é uma aplicação web desenvolvida em React que permite
          visualizar uma lista de tarefas acadêmicas e pessoais. O objetivo
          é aplicar os conceitos iniciais da disciplina: criação de
          componentes reutilizáveis, uso de props, separação de
          responsabilidades e estruturação de rotas.
        </p>
      </div>

      <div className="home-destaques">
        <div className="home-destaque">
          <h3>Componentes</h3>
          <p>Componentes reutilizáveis recebendo dados via props.</p>
        </div>
        <div className="home-destaque">
          <h3>Rotas</h3>
          <p>Navegação entre páginas com React Router.</p>
        </div>
        <div className="home-destaque">
          <h3>Layout</h3>
          <p>Layout compartilhado com Navbar e Footer.</p>
        </div>
      </div>

      <div className="home-acoes">
        <Link to="/tarefas">
          <Button variante="primario">Ver tarefas</Button>
        </Link>
        <Link to="/sobre">
          <Button variante="secundario">Saiba mais</Button>
        </Link>
      </div>
    </section>
  );
}

export default Home;
