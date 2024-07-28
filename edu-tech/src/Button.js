import React, { useState } from 'react';
import PayPal from './PayPal';
import PaymentComponent from './PaymentComponent'; // Import PaymentComponent
import './Button.css';

export default function Button() {
  const [checkout, setCheckOut] = useState(false);
  const [stripeCheckout, setStripeCheckout] = useState(false); // New state for Stripe checkout

  return (
    <div className="App">
      <h1>Choose your course</h1>
      <div>
        {checkout ? (
          <PayPal />
        ) : (
          <button className="Pay" onClick={() => setCheckOut(true)}>
            Checkout with PayPal
          </button>
        )}
        <button className="Pay2" onClick={() => setStripeCheckout(true)}>
          Checkout with Stripe
        </button>
      </div>
      {stripeCheckout && <PaymentComponent />} {/* Render PaymentComponent when stripeCheckout is true */}
    </div>
  );
}
