import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const stripePromise = loadStripe(`${import.meta.env.VITE_PUBLISHIBLE_KEY}`);

  return <div></div>;
};

export default Payment;
