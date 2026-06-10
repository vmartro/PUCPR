import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import './MainLayout.css';

const AUTORES = ['Matheus Vicente Martins Castro', 'Henrique Fugikawa Abe', 'Erich Augusto Natal da Silva'];

function MainLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  // Estado para guardar os dados do utilizador (email, foto e nome)
  const [perfil, setPerfil] = useState(null);

  // Assim que o layout carrega, se tiver token, busca a foto, nome e o email na API
  useEffect(() => {
    const buscarPerfil = () => {
      if (token) {
        fetch("http://localhost:3001/perfil", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setPerfil(data))
        .catch(err => console.error("Erro ao buscar perfil", err));
      }
    };

    buscarPerfil();

    // Fica a "escutar" para ver se a página de configurações avisa que os dados mudaram
    window.addEventListener('perfilAtualizado', buscarPerfil);

    return () => {
      window.removeEventListener('perfilAtualizado', buscarPerfil);
    };
  }, [token]);

  const fazerLogout = () => {
    localStorage.removeItem("token");
    setPerfil(null);
    navigate("/login");
  };

  const linksNavegacao = [
    { to: '/', label: 'Início' },
    { to: '/tarefas', label: 'Tarefas' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/contato', label: 'Contato' },
    { to: '/configuracao', label: 'Configuracao' }
  ];

  if (!token) {
    linksNavegacao.push({ to: '/login', label: 'Login' });
  }

  return (
    <div className="layout">
      <Navbar titulo="Lista de Tarefas" links={linksNavegacao} />
      
      {token && (
        <div className="topbar-container">
          
          {/* --- ÁREA DO PERFIL --- */}
          <div className="perfil-container">
            <img 
              src={perfil?.foto_perfil || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
              alt="Foto de Perfil" 
              className="perfil-img"
            />
            <span className="perfil-nome">
              {/* Mostra o nome. Se não existir, mostra o email. Se estiver a carregar, mostra o aviso */}
              {perfil?.nome || perfil?.email || "A carregar..."}
            </span>
          </div>
          {/* --------------------------- */}

          <button onClick={fazerLogout} className="btn-logout">
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