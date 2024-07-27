import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Land from './Land';
import Form from './Form';
import Button from './Button';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Land />} />
          <Route path="/form" element={<Form />} />
          <Route path="/button" element={<Button />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


