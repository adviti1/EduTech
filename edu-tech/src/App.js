import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Land from './Land';
import Form from './Form';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Land />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


