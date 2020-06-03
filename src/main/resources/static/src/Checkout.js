import React, { useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import axios from "axios";

import { ShowcartApi } from "./Showcart.jsx";

export default function CheckoutForm(props) {
  const api = useContext(ShowcartApi);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const data = {
      items: props.items,
      currency: "SGD",
    };

    const paymentIntent = await axios.post(
      `/api/create-payment-intent`,
      data
    );
    console.log("PAYMENT INTENT", paymentIntent);
    const CLIENT_SECRET = paymentIntent.data.clientSecret;

    const result = await stripe.confirmCardPayment(CLIENT_SECRET, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: props.customer,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      alert(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment has been received successfully!, your order will arrive in 3 working days. Please check your email for the receipt");
        api.purchase();
        props.closeModal();

        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <br></br>
      <div>
        <button className="btn btn-light font-weight-bold" disabled={!stripe}>Confirm order</button>
      </div>
    </form>
  );
}
