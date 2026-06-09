import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Tarefas from './pages/Tarefas';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Cadastro from './pages/Cadastro';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          
          <Route 
            path="tarefas"
            element={
              <PrivateRoute>
                <Tarefas />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="contato" 
            element={
              <PrivateRoute>
                <Contato />
              </PrivateRoute>
            } 
          />
          
          <Route path="sobre" element={<Sobre />} />
          <Route path="login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;