# Lista de Tarefas

Aplicação web desenvolvida em React para a disciplina **PSI141 — Web Development Framework** (PUCPR), entrega referente ao **RA1**.

## Proposta

O projeto consiste em uma aplicação para visualização de uma lista de tarefas acadêmicas e pessoais, com foco — nesta primeira entrega — na **estrutura inicial** da aplicação: organização de pastas, criação de componentes reutilizáveis, uso de props e configuração de rotas.

Funcionalidades de criação, edição, conclusão e persistência de tarefas serão implementadas nas próximas entregas (RA2 / RA3).

## Tecnologias

- **React 19** (Create React App)
- **React Router DOM 6** — navegação SPA entre páginas
- **PropTypes** — validação de props em tempo de desenvolvimento
- **Testing Library + Jest** — testes de componentes

## Estrutura de pastas

```
src/
├── components/        Componentes reutilizáveis
│   ├── Badge          Selo colorido por tipo (prioridade/status)
│   ├── Button         Botão com variantes (primário/secundário)
│   ├── Footer         Rodapé com créditos
│   ├── Navbar         Barra de navegação com links ativos
│   ├── PageTitle      Cabeçalho padrão de página
│   └── TarefaCard     Card que exibe uma tarefa
├── layouts/
│   └── MainLayout     Layout compartilhado (Navbar + Outlet + Footer)
├── pages/             Uma página por rota
│   ├── Home
│   ├── Tarefas
│   ├── Sobre
│   └── Contato
├── data/
│   └── tarefas.js     Dados mockados
├── App.js             Configuração das rotas
├── index.js           Bootstrap React
└── index.css          Estilos globais
```

Cada componente tem seu próprio arquivo `.css` co-localizado, evitando estilos globais e facilitando a manutenção.

## Como executar

Pré-requisitos: Node.js 18+ e npm.

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento (http://localhost:3000)
npm start

# Rodar os testes
npm test

# Gerar build de produção
npm run build
```

## Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Apresentação do projeto |
| `/tarefas` | Tarefas | Lista de tarefas mockadas |
| `/sobre` | Sobre | Proposta e decisões técnicas |
| `/contato` | Contato | Equipe e formulário (placeholder) |

## Decisões técnicas

Documentadas em detalhe na página **Sobre** da aplicação. Resumo:

- **Create React App** pela rapidez de configuração inicial.
- **React Router DOM v6** (em vez do v7) por compatibilidade com o Jest do CRA 5.
- **Componentes funcionais com props** sem estado interno desnecessário, favorecendo reutilização.
- **Layout compartilhado** via `<Outlet />`, evitando duplicação de Navbar/Footer.
- **Separação por responsabilidade**: páginas orquestram, componentes não conhecem dados, dados isolados em `data/`.

## Equipe

- Matheus Vicente Martins Castro

## Disciplina

PSI141 — Web Development Framework · PUCPR · 2026
