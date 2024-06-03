import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="relative flex h-[100vh] w-full overflow-hidden bg-[url('/assets/slider-eclipse.png')] bg-cover bg-no-repeat">
      <div className="z-10 mx-auto grid h-full max-w-[1570px] grid-cols-5 items-end justify-between px-2 md:px-4">
        <div className="flex items-center h-full col-span-2">
          <div>
            <h1 className="text-[90px] font-semibold leading-[100px] text-[#fff]">
              Express
              <span className="block text-[#F7B714]">Home Delivery</span>
            </h1>
            <p className="text-white font-catamaran">
              Welcome to Express Home Delivery! Fast, reliable, and convenient
              service right to your door. Shop online with ease and enjoy
              hassle-free delivery tailored to your schedule. Your satisfaction
              is our priority.
            </p>
            <div className="flex cursor-pointer">
              <Button
                variant={"default"}
                className="z-10 h-[60px] rounded-full px-[60px] text-[18px] font-bold text-black"
              >
                Read More
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <img
            className="h-full"
            src="/assets/slider-courier-mask.png"
            alt="biker"
          />
        </div>
      </div>
      <div className="absolute -bottom-[100px] left-[50%] z-0 h-full w-full max-w-[1400px] -translate-x-[50%] bg-[url('/assets/slider-glob.png')] bg-contain bg-bottom bg-no-repeat"></div>
    </div>
  );
};

export default Hero;
