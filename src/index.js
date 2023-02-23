import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App';
import { LoginContextProvider } from "./contexts/LoginContext";
import { DataContextProvider } from "./contexts/UpdateContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <LoginContextProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
