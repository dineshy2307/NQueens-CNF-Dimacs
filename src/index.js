import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import InputRows from "./inputBoard.js";
import Statements from './generateStatements.js';

const App = () => {
  const [N, setN] = useState();

  return (
    <div className="p-4">
      <InputRows N={N} setN={setN} />
      <Statements N={N} />
    </div>
  );
};

const root = createRoot(document.getElementById('input'));
root.render(<App />);
