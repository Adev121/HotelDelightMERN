import React, { useState } from "react";

import axios from "axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ netamount,handleBooking }) {
  const handlePayment = async (req, res) => {
    try {
      const res =await axios.post("https://hoteldelight-backend.onrender.com/payment", {
        amount: netamount,
      });
      const data= res.data.response;
      console.log(data);
      if(res.status ===200){
        const options = {
          key: "rzp_test_f8Y5JFvsPLL5sN",          // Razorpay public key
          amount: 50000,                    // ₹500 in paise
          currency: "INR",
          name: "Hotel Delight",           // business name
          description: "Test Transaction",  // short description
          order_id: data.id,           // unique order ID from backend
          handler: function (response) {    // runs after successful payment
            alert("Payment ID: " + response.razorpay_payment_id);
            console.log("Payment Successful")
            handleBooking()
          },
          prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9999999999",
          },
        };
        
        const rzp1 = new window.Razorpay(options)
        rzp1.open()

        
      }
      
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div>
        <button className="bg-green-500 p-4 m-2 text-black font-bold" onClick={handlePayment}>Pay Now</button>
      </div>
    </>
  );
}

export default CheckoutForm;
