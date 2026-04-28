const tarefas = [
  {
    id: 1,
    titulo: 'Estudar componentes React',
    descricao: 'Revisar conceitos de props, composição e separação de responsabilidades.',
    prioridade: 'alta',
    concluida: true,
    prazo: '2026-04-25',
  },
  {
    id: 2,
    titulo: 'Configurar React Router',
    descricao: 'Definir rotas para Home, Tarefas, Sobre e Contato.',
    prioridade: 'alta',
    concluida: true,
    prazo: '2026-04-26',
  },
  {
    id: 3,
    titulo: 'Criar layout compartilhado',
    descricao: 'Implementar Navbar e Footer reutilizáveis em todas as páginas.',
    prioridade: 'media',
    concluida: true,
    prazo: '2026-04-27',
  },
  {
    id: 4,
    titulo: 'Preparar apresentação do RA1',
    descricao: 'Slides com proposta, decisões técnicas e demonstração da aplicação.',
    prioridade: 'alta',
    concluida: false,
    prazo: '2026-04-29',
  },
  {
    id: 5,
    titulo: 'Implementar persistência (RA2)',
    descricao: 'Avaliar uso de localStorage ou integração com API REST.',
    prioridade: 'baixa',
    concluida: false,
    prazo: '2026-05-15',
  },
  {
    id: 6,
    titulo: 'Adicionar testes de componentes',
    descricao: 'Cobrir TarefaCard, Button e fluxo de navegação com Testing Library.',
    prioridade: 'media',
    concluida: false,
    prazo: '2026-05-20',
  },
];

export default tarefas;
