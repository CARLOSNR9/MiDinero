import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Categorias from './pages/Categorias';
import { GlobalStateProvider } from './GlobalState';
import './styles.css';

ReactDOM.render(
  <GlobalStateProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </Router>
  </GlobalStateProvider>,
  document.getElementById('root')
);
