import PageTitle from '../components/PageTitle';
import './Sobre.css';

function Sobre() {
  return (
    <section>
      <PageTitle
        titulo="Sobre o projeto"
        subtitulo="Proposta, decisões técnicas e arquitetura do sistema"
      />

      <div className="sobre-secao">
        <h2>Proposta</h2>
        <p>
          O projeto consiste em uma aplicação web para gerenciamento de uma
          lista de tarefas. O que se iniciou como uma estruturação de componentes 
          visuais e posteriormente uma simulação de CRUD utilizando a API pública 
          JSONPlaceholder, evoluiu para uma aplicação Full-Stack completa. 
          A aplicação agora conta com um backend próprio desenvolvido em Node.js, 
          implementando uma arquitetura robusta de microsserviços, integrações 
          com serviços de terceiros e controle de acesso seguro ponta a ponta.
        </p>
      </div>

      <div className="sobre-secao">
        <h2>Decisões técnicas</h2>
        <ul>
          <li>
            <strong>Integração com API REST Externa:</strong> consumo da API externa 
            do Resend via protocolo HTTP nativo (<code>fetch</code>). O disparo de 
            e-mails é feito através de requisições POST com dados em JSON e 
            autenticação rígida de mercado utilizando <code>Bearer Token</code> nos 
            cabeçalhos (Headers).
          </li>
          <li>
            <strong>Arquitetura de Microsserviços:</strong> o backend foi 
            dividido em três APIs independentes (Autenticação, Contatos e Tarefas), 
            rodando em portas distintas. Isso garante maior escalabilidade, 
            separação de responsabilidades e resiliência ao sistema (se o serviço 
            de contatos falhar, o de tarefas continua operante).
          </li>
          <li>
            <strong>Segurança e Variáveis de Ambiente (.env):</strong> credenciais 
            de banco de dados, chaves de APIs externas e chaves secretas de criptografia (JWT) 
            foram rigorosamente isoladas em arquivos de ambiente locais. Isso garante que nenhum 
            dado sensível vaze para o repositório de código-fonte.
          </li>
          <li>
            <strong>Segurança com JWT (JSON Web Tokens):</strong> implementação 
            de sistema de login *stateless*. O acesso é controlado por rotas 
            protegidas (<code>PrivateRoute</code>) no frontend e extração segura 
            de dados do usuário a partir da validação de tokens via middlewares 
            nas requisições do backend.
          </li>
          <li>
            <strong>React Router DOM v6:</strong> usado para navegação
            entre páginas sem recarregar o navegador, mantendo a fluidez da SPA.
          </li>
          <li>
            <strong>Gerenciamento de Estado e Ciclo de Vida:</strong> uso extensivo 
            dos Hooks <code>useState</code> para controle de dados e <code>useEffect</code> para 
            disparar as buscas na rede assim que os componentes são montados.
          </li>
          <li>
            <strong>Separação de Responsabilidades (Services):</strong> a lógica 
            pesada de validação, captura do token JWT e comunicação assíncrona com 
            a rede foi retirada dos componentes visuais e isolada em serviços dedicados.
          </li>
          <li>
            <strong>Formulários Controlados:</strong> as validações nativas do HTML 
            foram removidas em favor do controle em tempo real pelo React, 
            permitindo validações customizadas e feedback visual imediato.
          </li>
          <li>
            <strong>Composição de componentes e PropTypes:</strong> componentes 
            menores compõem interfaces complexas (como <code>TarefaCard</code>), 
            declarando rigorosamente o tipo esperado de suas propriedades.
          </li>
          <li>
            <strong>CSS co-localizado:</strong> cada componente tem seu
            próprio <code>.css</code> ao lado do <code>.jsx</code>,
            evitando estilos globais conflitantes.
          </li>
        </ul>
      </div>

      <div className="sobre-secao">
        <h2>Organização de pastas</h2>
        <ul className="sobre-arvore">
          <li>
            <code>backend/</code> — abriga os servidores Node.js/Express 
            independentes para Autenticação, Contatos e Tarefas, além do banco de dados e das 
            configurações seguras de ambiente (<code>.env</code>).
          </li>
          <li>
            <code>src/components/</code> — peças de UI reutilizáveis sem
            conhecimento de regras de negócio.
          </li>
          <li>
            <code>src/layouts/</code> — esqueletos compartilhados entre
            várias páginas (incluindo a lógica dinâmica do menu de navegação).
          </li>
          <li>
            <code>src/pages/</code> — uma pasta-componente por rota,
            responsável por orquestrar a exibição e interagir com os services.
          </li>
          <li>
            <code>src/services/</code> — camada responsável exclusivamente pela 
            comunicação com os microsserviços internos e APIs externas, injeção 
            dos tokens de autorização e validação rigorosa de dados.
          </li>
        </ul>
        <p>
          Essa separação ponta a ponta (do banco de dados à interface do usuário e 
          serviços de terceiros) garante que alterações de layout não afetem as 
          regras de negócio, e que o consumo da rede fique totalmente seguro e 
          isolado da interface visual.
        </p>
      </div>
    </section>
  );
}

export default Sobre;