import React, {useState} from "react";
import PayPal from './PayPal'

export default function Button(){


    const [checkout,setCheckOut] = useState(false);


    return(<div>
     
     {checkout ? (
        <PayPal/>
     )
     :(
     <button onClick={() => {
        setCheckOut(true);
     }}
     >
     Checkout</button>
     )}
    </div>
    )
}