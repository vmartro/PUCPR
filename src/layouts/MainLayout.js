import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MainLayout.css';

const AUTORES = ['Matheus Vicente Martins Castro', 'Henrique Fugikawa Abe', 'Erich Augusto Natal da Silva'];

function MainLayout() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fazerLogout = () => {
    localStorage.removeItem("token");
    
    navigate("/login");
  };

  const linksNavegacao = [
    { to: '/', label: 'Início' },
    { to: '/tarefas', label: 'Tarefas' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/contato', label: 'Contato' }
  ];

  if (!token) {
    linksNavegacao.push({ to: '/login', label: 'Login' });
  }

  return (
    <div className="layout">
      <Navbar titulo="Lista de Tarefas" links={linksNavegacao} />
      
      {token && (
        <div style={{ textAlign: "right", padding: "10px 20px" }}>
          <button 
            onClick={fazerLogout} 
            style={{ 
              cursor: "pointer", 
              color: "white", 
              backgroundColor: "#d9534f",
              padding: "8px 16px", 
              border: "none", 
              borderRadius: "4px",
              fontWeight: "bold"
            }}
          >
            Sair
          </button>
        </div>
      )}

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