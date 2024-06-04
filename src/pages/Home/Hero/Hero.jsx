import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeAnimation } from "@/utils/variants";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex min-h-[100vh] w-full items-center overflow-hidden bg-[url('/assets/slider-eclipse.png')] bg-cover bg-no-repeat">
      <div className="z-10 mx-auto grid h-full max-w-[1570px] grid-cols-1 items-center justify-between px-2 md:px-4 lg:grid-cols-4">
        <motion.div
          variants={fadeAnimation("right", 0.4)}
          initial="hidden"
          whileInView="show"
          className="col-span-1 mb-[70px] flex items-center md:h-full lg:col-span-2 lg:mb-0"
        >
          <div className="mt-[200px] lg:mt-0">
            <h1 className="text-center text-[45px] font-semibold leading-[55px] text-[#fff] sm:text-[60px] sm:leading-[70px] md:text-[70px] md:leading-[80px] lg:text-left lg:text-[74px] lg:leading-[80px] xl:text-[90px] xl:leading-[95px]">
              Express
              <span className="block text-[#F7B714]">Parcel Delivery</span>
            </h1>
            <p className="font-catamaran mb-[36px] mt-[18px] px-[3%] text-center text-[14px] text-white sm:px-[6%] md:px-[10%] md:text-[16px] lg:px-0 lg:pr-8 lg:text-left">
              Welcome to Express Parcel Delivery! Fast, reliable, and convenient
              service right to your door. Shop online with ease and enjoy
              hassle-free delivery tailored to your schedule. Your satisfaction
              is our priority.
            </p>
            <div className="flex w-full cursor-pointer justify-center lg:justify-start">
              {/* <Button
                variant={"default"}
                className="z-10 rounded-full px-[45px] py-[30px] text-[18px] font-bold text-black sm:px-[60px] md:py-[35px]"
              >
                Read More
              </Button> */}
              <div className="relative flex w-full max-w-sm items-center">
                <Input
                  type="text"
                  placeholder="Search here..."
                  className="rounded-full py-[25px] pl-[1rem]"
                />
                <Button
                  type="submit"
                  className="absolute right-[0.5rem] px-[30px] text-[16px] font-medium"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeAnimation("left", 0.6)}
          initial="hidden"
          whileInView="show"
          className="col-span-1 p-0 sm:p-4 md:p-8 lg:col-span-2 lg:p-0"
        >
          <img
            className="w-full"
            src="/assets/slider-courier-mask.png"
            alt="biker"
          />
        </motion.div>
      </div>
      <div className="absolute -bottom-[200px] left-[50%] z-0 h-full w-full max-w-[1400px] -translate-x-[50%] bg-[url('/assets/slider-glob.png')] bg-cover bg-bottom bg-no-repeat md:mt-[200px] lg:-bottom-[100px] lg:mt-0 lg:bg-contain"></div>
    </section>
  );
};

export default Hero;
