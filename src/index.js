import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Title = () => {
  return <h1>N Queens</h1>
}

const root = ReactDOM.createRoot(document.getElementById('title'));
root.render(
  <Title  />
);
