import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MainLayout.css';

const AUTORES = ['Matheus Vicente Martins Castro', 'Henrique Fugikawa Abe', 'Erich Augusto Natal da Silva'];

function MainLayout() {
  const navigate = useNavigate();
  
  // Verifica se o usuário está logado buscando o token
  const token = localStorage.getItem("token");

  const fazerLogout = () => {
    // 1. Remove o token do armazenamento do navegador
    localStorage.removeItem("token");
    
    // 2. Redireciona o usuário para a tela de Login
    navigate("/login");
  };

  // Movemos os links para dentro do componente para podermos alterá-los dinamicamente
  const linksNavegacao = [
    { to: '/', label: 'Início' },
    { to: '/tarefas', label: 'Tarefas' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/contato', label: 'Contato' }
  ];

  // Se NÃO tiver token, adicionamos o link de Login na barra
  if (!token) {
    linksNavegacao.push({ to: '/login', label: 'Login' });
  }

  return (
    <div className="layout">
      <Navbar titulo="Lista de Tarefas" links={linksNavegacao} />
      
      {/* Se o usuário ESTIVER logado (tiver token), exibe o botão de Sair */}
      {token && (
        <div style={{ textAlign: "right", padding: "10px 20px" }}>
          <button 
            onClick={fazerLogout} 
            style={{ 
              cursor: "pointer", 
              color: "white", 
              backgroundColor: "#d9534f", // Um vermelho mais suave
              padding: "8px 16px", 
              border: "none", 
              borderRadius: "4px",
              fontWeight: "bold"
            }}
          >
            Sair do Sistema
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