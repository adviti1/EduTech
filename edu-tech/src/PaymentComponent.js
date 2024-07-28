import React, { useState } from 'react';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm'; // Import PaymentForm

const stripePromise = loadStripe('pk_test_51PhUv5RvBKIWool1ALxRneKW6Q0PtWhN2Hugc5TuBxAtzDIf5pMkcmfKYaLAuq27biFIk27TfZ0gYm6FkKVXF6sw00LYvzjQBK');

function PaymentComponent() {
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState('');

  const createPaymentIntent = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/edu-tech-a53de/us-central1/createPaymentIntent', {
        amount: amount * 100 // Amount in cents
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={createPaymentIntent}>Pay</button>
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}

export default PaymentComponent;

