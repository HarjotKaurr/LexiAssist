import { createRoot } from 'react-dom/client';
import AppWrapper from './AppWrapper';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(<AppWrapper />);