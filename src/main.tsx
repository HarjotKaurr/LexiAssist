import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './AppWrapper';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
