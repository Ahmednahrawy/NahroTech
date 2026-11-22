import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import {getRouterBasename} from './utils/routes';

const rootElement = document.getElementById('root')!;
const basename = getRouterBasename();

const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (rootElement.firstElementChild !== null) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
