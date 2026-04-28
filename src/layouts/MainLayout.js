import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MainLayout.css';

const LINKS_NAVEGACAO = [
  { to: '/', label: 'Início' },
  { to: '/tarefas', label: 'Tarefas' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

const AUTORES = ['Matheus Vicente Martins Castro'];

function MainLayout() {
  return (
    <div className="layout">
      <Navbar titulo="Lista de Tarefas" links={LINKS_NAVEGACAO} />
      <main className="layout-conteudo">
        <Outlet />
      </main>
      <Footer
        disciplina="PSI141 - Web Development Framework"
        ano={2026}
        autores={AUTORES}
      />
    </div>
  );
}

export default MainLayout;
