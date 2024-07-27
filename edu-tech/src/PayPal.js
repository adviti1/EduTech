import React, { useRef, useEffect, useState } from "react";

export default function PayPal() {
  const paypalRef = useRef();
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // Function to add PayPal SDK script to the page
    const addPaypalSdk = async () => {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AYoa50U9pEXLuo9e6H1thmjmTsm3hOZdYohZlW-cdTcBszBZxKQJN32Ew3bq3GMRWokQoh80GeVb4Gpv&currency=CAD";
      script.async = true;
      script.onload = () => setSdkReady(true);
      script.onerror = () => console.error("PayPal SDK script failed to load.");
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPaypalSdk();
    } else {
      setSdkReady(true);
    }

    return () => {
      // Cleanup function to remove PayPal button
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (sdkReady && window.paypal) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "650.0", // Replace with your amount
                    currency_code: "CAD",
                  },
                  description: "Java course",
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            alert(`Transaction completed by ${order.payer.name.given_name}`);
          },
          onError: (err) => {
            console.error("PayPal Checkout onError", err);
          },
        })
        .render(paypalRef.current);
    }
  }, [sdkReady]);

  return <div ref={paypalRef}></div>;
}



