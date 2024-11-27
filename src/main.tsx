import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CategoryProvider } from './contexts/CategoryContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CategoryProvider>
      <App />
    </CategoryProvider>
  </StrictMode>
);