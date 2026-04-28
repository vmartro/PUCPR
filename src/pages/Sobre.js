import PageTitle from '../components/PageTitle';
import './Sobre.css';

function Sobre() {
  return (
    <section>
      <PageTitle
        titulo="Sobre o projeto"
        subtitulo="Proposta, decisões técnicas e organização do código"
      />

      <div className="sobre-secao">
        <h2>Proposta</h2>
        <p>
          O projeto consiste em uma aplicação web para gerenciamento de uma
          lista de tarefas. Nesta primeira entrega (RA1), o foco está na
          estrutura inicial: organização do código, criação de componentes
          reutilizáveis e configuração de rotas. Nas próximas entregas
          serão adicionadas funcionalidades como criação, edição,
          conclusão e persistência das tarefas.
        </p>
      </div>

      <div className="sobre-secao">
        <h2>Decisões técnicas</h2>
        <ul>
          <li>
            <strong>Create React App:</strong> escolhido por simplificar a
            configuração inicial do ambiente (Webpack, Babel, dev server,
            ESLint), permitindo focar no aprendizado do React em vez da
            ferramenta de build.
          </li>
          <li>
            <strong>React Router DOM v6:</strong> usado para navegação
            entre páginas sem recarregar o navegador (SPA). Optamos pela
            v6 em vez da v7 porque a v7 adota entry points puramente ESM,
            o que quebra a configuração do Jest que vem com o CRA 5.
          </li>
          <li>
            <strong>Componentes funcionais com props:</strong> todos os
            componentes recebem dados via props, sem estado interno
            desnecessário, favorecendo reutilização e testabilidade. O
            <code> Button</code>, por exemplo, é usado tanto na Home (com
            duas variantes) quanto no formulário de Contato.
          </li>
          <li>
            <strong>PropTypes:</strong> cada componente declara o tipo
            esperado das suas props, fornecendo avisos em desenvolvimento
            quando o contrato é violado.
          </li>
          <li>
            <strong>Layout compartilhado:</strong> o componente{' '}
            <code>MainLayout</code> centraliza Navbar e Footer e usa{' '}
            <code>Outlet</code> para renderizar a página ativa, evitando
            duplicação de código em cada página.
          </li>
          <li>
            <strong>Composição de componentes:</strong> o{' '}
            <code>TarefaCard</code> usa internamente o <code>Badge</code>{' '}
            para exibir prioridade e status, demonstrando como compor
            componentes pequenos em outros maiores.
          </li>
          <li>
            <strong>CSS co-localizado:</strong> cada componente tem seu
            próprio <code>.css</code> ao lado do <code>.js</code>,
            evitando estilos globais conflitantes e facilitando localizar
            o estilo de um componente.
          </li>
        </ul>
      </div>

      <div className="sobre-secao">
        <h2>Organização de pastas</h2>
        <ul className="sobre-arvore">
          <li>
            <code>src/components/</code> — peças de UI reutilizáveis sem
            conhecimento das páginas onde são usadas
          </li>
          <li>
            <code>src/layouts/</code> — esqueletos compartilhados entre
            várias páginas
          </li>
          <li>
            <code>src/pages/</code> — uma pasta-componente por rota,
            responsável apenas por orquestrar dados e componentes
          </li>
          <li>
            <code>src/data/</code> — fonte de dados (atualmente mockados;
            será substituída por API ou localStorage no RA2)
          </li>
        </ul>
        <p>
          Essa separação segue o princípio da{' '}
          <em>responsabilidade única</em>: cada arquivo tem um motivo
          claro para mudar — alterações de layout não afetam componentes,
          e mudanças no formato dos dados ficam isoladas em{' '}
          <code>data/</code>.
        </p>
      </div>
    </section>
  );
}

export default Sobre;
