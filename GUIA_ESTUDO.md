# Guia de estudo — Pergunta técnica do RA1

Documento de apoio para a defesa do RA1. Reúne perguntas que a banca pode fazer sobre os conteúdos trabalhados, com respostas curtas e exemplos do próprio projeto.

---

## 1. O que é um componente em React?

Função (ou classe) que recebe dados via **props** e retorna um trecho de UI em **JSX**. É a unidade básica de composição: páginas são formadas combinando componentes menores.

**No projeto:** `TarefaCard` é um componente que recebe `titulo`, `descricao`, `prioridade`, `concluida` e `prazo` e renderiza um cartão.

---

## 2. O que são props? Diferença para state?

- **Props** são **entradas imutáveis** que o componente recebe do pai. O componente não pode alterá-las.
- **State** é o **estado interno mutável** do componente, gerenciado por hooks como `useState`.

> Regra prática: se o dado vem "de fora", é prop; se é controlado pelo próprio componente, é state.

**No projeto:** ainda usamos só props (RA1 foca em estrutura). State entra no RA2 quando permitirmos marcar tarefas como concluídas.

---

## 3. O que é JSX?

Sintaxe que parece HTML mas é **JavaScript**. O Babel converte cada tag JSX em uma chamada `React.createElement(...)`. Por isso usamos `className` em vez de `class` (palavra reservada em JS).

```jsx
<h1 className="titulo">Olá</h1>
// vira: React.createElement('h1', { className: 'titulo' }, 'Olá')
```

---

## 4. Por que usar a prop `key` em listas?

O React usa `key` para identificar cada item entre re-renderizações e decidir o que precisa ser atualizado/criado/removido no DOM. Sem `key` única, o React pode renderizar a lista incorretamente ou perder estado.

**No projeto:** `Tarefas.js` usa `key={tarefa.id}`, `Navbar.js` usa `key={link.to}`.

---

## 5. O que é uma SPA? Como o React Router viabiliza isso?

**SPA (Single Page Application):** uma única página HTML é carregada; a navegação entre "telas" é feita pelo JavaScript trocando o conteúdo, sem recarregar do servidor.

O **React Router** intercepta cliques em `<Link>`, atualiza a URL via History API e renderiza o componente correspondente à rota atual.

**No projeto:** `App.js` define `BrowserRouter` + `Routes` + `Route`; `Navbar` usa `<NavLink>` em vez de `<a>` para navegar sem recarregar.

---

## 6. Para que serve o `<Outlet />`?

É um marcador de posição que diz: "renderize aqui a rota filha". Permite definir um **layout compartilhado** (Navbar + Footer) uma única vez e reaproveitá-lo em todas as páginas.

**No projeto:** `MainLayout.js` tem Navbar, `<Outlet />` (onde Home/Tarefas/Sobre/Contato aparecem) e Footer.

---

## 7. O que é composição de componentes?

Construir componentes maiores combinando outros menores, em vez de criar um único componente monolítico. Favorece reutilização.

**No projeto:** `TarefaCard` compõe `Badge` para mostrar prioridade e status. `MainLayout` compõe `Navbar`, `<Outlet />` e `Footer`.

---

## 8. O que são componentes reutilizáveis? Como tornar um componente reutilizável?

Componente que pode ser usado em vários contextos diferentes. Para isso ele deve:

- Receber dados via props (não buscar internamente);
- Não conhecer o contexto onde é usado;
- Ter responsabilidade única.

**No projeto:** `Button` recebe `variante`, `tipo`, `onClick` e `children` — funciona em qualquer página.

---

## 9. Diferença entre `<a>` e `<Link>` / `<NavLink>`?

- `<a>` faz uma **requisição nova ao servidor**, recarregando a página inteira (perde estado, refaz bundle).
- `<Link>` / `<NavLink>` mudam a URL **client-side**, sem recarregar — mantém o app responsivo.
- `<NavLink>` ainda aplica uma classe quando a rota está ativa, útil para destacar o item atual no menu.

**No projeto:** `Navbar` usa `<NavLink>` com classe `ativo` quando a rota está selecionada.

---

## 10. Por que separar `pages/` de `components/`?

- `pages/` = componentes que **representam uma rota** e orquestram dados.
- `components/` = peças **genéricas e reutilizáveis** que não sabem em qual rota vivem.

Essa separação evita que um componente reutilizável vire dependente de uma página específica.

---

## 11. O que é `npm start`? E `npm run build`?

- `npm start` → roda o **dev server** (Webpack + hot reload em `localhost:3000`).
- `npm run build` → gera os arquivos **otimizados de produção** em `build/` (minificado, tree-shaking, hash nos nomes).

---

## 12. Por que usar PropTypes?

Validação de props em **tempo de desenvolvimento**: o React avisa no console se você passa o tipo errado de prop ou esquece uma obrigatória. Em projetos maiores, costuma-se usar TypeScript no lugar.

**No projeto:** todos os componentes em `src/components/` declaram `propTypes`.

---

## 13. O que é o "Virtual DOM"?

Uma representação em memória da árvore de elementos. Quando o estado muda, o React monta uma nova árvore virtual, **compara** com a anterior (diffing) e aplica no DOM real só as diferenças. Isso é mais rápido do que manipular o DOM diretamente a cada mudança.

---

## 14. Diferença entre componente funcional e componente de classe?

- **Classe:** usa `class X extends React.Component`, tem `state` e métodos de ciclo de vida (`componentDidMount`, etc.).
- **Funcional:** é uma função; usa **hooks** (`useState`, `useEffect`, etc.) para estado e efeitos.

Hoje a recomendação oficial é **componentes funcionais com hooks**.

**No projeto:** todos os componentes são funcionais.

---

## 15. O que é o `index.js` (em `src/`)?

É o **ponto de entrada** da aplicação. Ele monta o componente raiz (`<App />`) dentro do elemento `#root` do `public/index.html` usando `ReactDOM.createRoot`.

---

## Perguntas mais prováveis (top 5)

1. **Diferença entre props e state.** (clássica)
2. **Para que serve a key em listas.** (clássica)
3. **Como você organizou o projeto e por quê.** (decisão de arquitetura)
4. **O que é uma SPA / como o Router funciona.** (rotas)
5. **Mostre um componente reutilizável e explique como ele recebe dados.** (props na prática — abra `TarefaCard.js`)
