import Features from "./Features/Features";
import Hero from "./Hero/Hero";
import Reviews from "./Reviews/Reviews";
import Statistics from "./Statistics/Statistics";
import TopDeliveryMan from "./TopDeliveryMan/TopDeliveryMan";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Statistics />
      <TopDeliveryMan />
      <Reviews />
    </>
  );
};

export default Home;
