import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UnderContraction = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <img
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Logo"
        className="mb-8 h-40"
      />
      <h1 className="mb-4 text-center text-4xl font-bold text-gray-700 dark:text-white md:text-5xl lg:text-6xl">
        This page is under maintenance
      </h1>
      <p className="mb-8 text-center text-lg text-gray-500 dark:text-gray-300 md:text-xl lg:text-2xl">
        We{"'"}re working hard to improve the user experience. Stay tuned!
      </p>
      <div className="flex space-x-4">
        <Button className="destructive" asChild>
          <Link to={"/"}>Back to Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default UnderContraction;
