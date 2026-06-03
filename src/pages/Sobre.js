import PageTitle from '../components/PageTitle';
import './Sobre.css';

function Sobre() {
  return (
    <section>
      <PageTitle
        titulo="Sobre o projeto"
        subtitulo="Proposta, decisões técnicas e organização do código (RA2)"
      />

      <div className="sobre-secao">
        <h2>Proposta</h2>
        <p>
          O projeto consiste em uma aplicação web para gerenciamento de uma
          lista de tarefas. Na primeira entrega (RA1), o foco foi a
          estrutura inicial e componentes visuais. Nesta segunda entrega (RA2), 
          a aplicação evoluiu para uma SPA (Single Page Application) dinâmica, 
          implementando interatividade, formulários controlados, gerenciamento de 
          estado (useState/useEffect) e simulação de um CRUD completo consumindo 
          a API pública JSONPlaceholder via requisições HTTP (fetch).
        </p>
      </div>

      <div className="sobre-secao">
        <h2>Decisões técnicas</h2>
        <ul>
          <li>
            <strong>React Router DOM v6:</strong> usado para navegação
            entre páginas sem recarregar o navegador, mantendo a fluidez da SPA.
          </li>
          <li>
            <strong>Gerenciamento de Estado e Ciclo de Vida:</strong> uso extensivo 
            dos Hooks <code>useState</code> para controle de dados (lista de tarefas, 
            status de loading, dados de formulário) e <code>useEffect</code> para 
            disparar a busca na API assim que os componentes são montados.
          </li>
          <li>
            <strong>Separação de Responsabilidades (Services):</strong> a lógica 
            pesada de validação de formulários e comunicação assíncrona com a rede 
            foi retirada dos componentes visuais e isolada em serviços dedicados.
          </li>
          <li>
            <strong>Formulários Controlados:</strong> as validações nativas do HTML 
            (como <code>required</code>) foram removidas. O React agora controla os inputs 
            em tempo real (Componentes Controlados), permitindo validações customizadas 
            e feedback visual imediato de erros.
          </li>
          <li>
            <strong>Composição de componentes e PropTypes:</strong> componentes 
            menores (como <code>Badge</code> e <code>Button</code>) compõem interfaces 
            complexas (como <code>TarefaCard</code>). Todos declaram rigorosamente 
            o tipo esperado de suas props.
          </li>
          <li>
            <strong>CSS co-localizado:</strong> cada componente tem seu
            próprio <code>.css</code> ao lado do <code>.js</code>,
            evitando estilos globais conflitantes.
          </li>
        </ul>
      </div>

      <div className="sobre-secao">
        <h2>Organização de pastas</h2>
        <ul className="sobre-arvore">
          <li>
            <code>src/components/</code> — peças de UI reutilizáveis sem
            conhecimento de regras de negócio.
          </li>
          <li>
            <code>src/layouts/</code> — esqueletos compartilhados entre
            várias páginas.
          </li>
          <li>
            <code>src/pages/</code> — uma pasta-componente por rota,
            responsável por orquestrar a exibição e interagir com os services.
          </li>
          <li>
            <code>src/services/</code> — <strong>(Novo no RA2)</strong> camada 
            responsável exclusivamente pela comunicação externa (APIs via fetch) 
            e validação rigorosa de dados.
          </li>
        </ul>
        <p>
          Essa separação garante que alterações de layout não afetem as regras 
          de negócio, e que o consumo de APIs fique totalmente isolado da interface visual.
        </p>
      </div>
    </section>
  );
}

export default Sobre;