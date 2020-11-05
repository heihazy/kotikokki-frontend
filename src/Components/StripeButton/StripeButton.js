import React from "react";
import StripeCheckout from "react-stripe-checkout";
const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HViBjHchzqWiSZPsJgPC05FYeYnlvRFv3YvSj9Gv6rgnHj29eKOGlW5Ks1vQgO7fCvnnR1p8my1543rF5lsrUNe00Wr92Tar5";

  const onToken = (token) => {
    console.log(token);
    alert("Payment successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Kotikokki Ltd."
      billingAddress
      shippingAddress
      description={`Your total is €${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
