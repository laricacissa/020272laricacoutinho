import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/tail.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import App from './pages/App.tsx'
import * as React from "react";
import Tailwind from "primereact/passthrough/tailwind";
import {PrimeReactProvider} from "primereact/api";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
          <App />
      </PrimeReactProvider>
  </StrictMode>,
)
