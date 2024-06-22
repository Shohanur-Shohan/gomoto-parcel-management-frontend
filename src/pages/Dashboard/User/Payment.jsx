import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${import.meta.env.VITE_PUBLISHIBLE_KEY}`);

const Payment = () => {
  return <div></div>;
};

export default Payment;
