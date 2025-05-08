import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import FearDetails from './FearDetails'; // Import the FearDetails component
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/fear-details" element={<FearDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
