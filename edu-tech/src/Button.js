import React, { useState } from "react";
import PayPal from './PayPal';
import './Button.css';

export default function Button() {
  const [checkout, setCheckOut] = useState(false);

  return (
    <div className="App">
    <div>
    <h1>Choose Course</h1>
      {checkout ? (
        <PayPal />
      ) : (
        <button className="Pay" onClick={() => setCheckOut(true)}>
          Checkout
        </button>
      )}
    </div>
    </div>
  );
}
