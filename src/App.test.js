import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza a navegação principal e a home', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'Início' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Sobre' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Contato' })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /bem-vindo à lista de tarefas/i }),
  ).toBeInTheDocument();
});
