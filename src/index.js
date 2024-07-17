import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QuantisationVisualisations } from './quantisation';

console.log("React script starting");

const App = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="space-y-12">
      <QuantisationVisualisations />
    </div>
  </div>
);

console.log("React script loaded");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
