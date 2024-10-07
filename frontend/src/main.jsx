import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UseMap from './pages/UseMap'
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UseMap />
  </StrictMode>
);
