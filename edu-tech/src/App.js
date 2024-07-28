import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Land from './Land';
import Form from './Form';
//import { Elements } from '@stripe/react-stripe-js';
//import { loadStripe } from '@stripe/stripe-js';
import Button from './Button';


//const stripePromise = loadStripe('pk_test_51PhUv5RvBKIWool1ALxRneKW6Q0PtWhN2Hugc5TuBxAtzDIf5pMkcmfKYaLAuq27biFIk27TfZ0gYm6FkKVXF6sw00LYvzjQBK');


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


