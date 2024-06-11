import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { fadeAnimation } from "@/utils/variants";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Reviews = () => {
  const rating = 3;

  return (
    <section className="mb-[50px] mt-[100px] w-full">
      <motion.div
        variants={fadeAnimation("up", 0.2)}
        initial="hidden"
        whileInView="show"
      >
        <Card className="mx-auto max-w-[360px] border-none shadow-none dark:bg-transparent sm:m-0 sm:max-w-full">
          <CardHeader className="mb-[40px] bg-none text-center dark:bg-transparent">
            <CardDescription className="text-[16px] font-bold text-[#f7b814]">
              Testimonials
            </CardDescription>
            <CardTitle className="mx-auto max-w-[530px] text-[25px] font-semibold leading-[35px] sm:text-[34px] sm:leading-[45px] md:text-[48px] md:leading-[55px]">
              Users Reviews
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div
        variants={fadeAnimation("up", 0.8)}
        initial="hidden"
        whileInView="show"
        className="mx-auto max-w-[1570px] overflow-hidden"
      >
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="w-full">
            <CarouselItem className="flex min-h-[300px] basis-[100%] items-center justify-center p-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
              <Card className="flex h-full w-full items-center p-3 dark:border-none dark:bg-[#222327] md:p-4">
                <div>
                  <div className="flex items-center gap-5">
                    <Avatar className="h-[50px] w-[50px]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>
                        <img src="/assets/avatar.svg/assets/avatar.svg" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <CardTitle className="swiper-slide-active:text-indigo-600 font-medium transition-all duration-500 group-hover:text-indigo-600">
                        Shohanur Shohan
                      </CardTitle>
                      <span className="text-sm leading-6 text-gray-500">
                        CEO
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-start gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 border-none ${
                          index < rating
                            ? index === rating - 1
                              ? "fill-[#f7b814] stroke-[#f7b814]"
                              : "fill-[#f7b814] stroke-[#f7b814]"
                            : "fill-none stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <CardDescription className="font-catamaran mt-3 h-[50px] text-lg font-semibold leading-8 transition-all duration-500 group-hover:text-gray-800">
                    {"''"}Pagedone is simply the best tool of investment in the
                    market right now.{"''"}
                  </CardDescription>
                </div>
              </Card>
            </CarouselItem>
            <CarouselItem className="flex min-h-[300px] basis-[100%] items-center justify-center p-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
              <Card className="flex h-full w-full items-center p-3 dark:border-none dark:bg-[#222327] md:p-4">
                <div>
                  <div className="flex items-center gap-5">
                    <Avatar className="h-[50px] w-[50px]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>
                        <img src="/assets/user.png" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <CardTitle className="swiper-slide-active:text-indigo-600 font-medium transition-all duration-500 group-hover:text-indigo-600">
                        Shohanur Shohan
                      </CardTitle>
                      <span className="text-sm leading-6 text-gray-500">
                        CEO
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-start gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 border-none ${
                          index < rating
                            ? index === rating - 1
                              ? "fill-[#f7b814] stroke-[#f7b814]"
                              : "fill-[#f7b814] stroke-[#f7b814]"
                            : "fill-none stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <CardDescription className="font-catamaran mt-3 h-[50px] text-lg font-semibold leading-8 transition-all duration-500 group-hover:text-gray-800">
                    {"''"}Pagedone is simply the best tool of investment in the
                    market right now.{"''"}
                  </CardDescription>
                </div>
              </Card>
            </CarouselItem>
            <CarouselItem className="flex min-h-[300px] basis-[100%] items-center justify-center p-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
              <Card className="flex h-full w-full items-center p-3 dark:border-none dark:bg-[#222327] md:p-4">
                <div>
                  <div className="flex items-center gap-5">
                    <Avatar className="h-[50px] w-[50px]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>
                        <img src="/assets/user.png" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <CardTitle className="swiper-slide-active:text-indigo-600 font-medium transition-all duration-500 group-hover:text-indigo-600">
                        Shohanur Shohan
                      </CardTitle>
                      <span className="text-sm leading-6 text-gray-500">
                        CEO
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-start gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 border-none ${
                          index < rating
                            ? index === rating - 1
                              ? "fill-[#f7b814] stroke-[#f7b814]"
                              : "fill-[#f7b814] stroke-[#f7b814]"
                            : "fill-none stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <CardDescription className="font-catamaran mt-3 h-[50px] text-lg font-semibold leading-8 transition-all duration-500 group-hover:text-gray-800">
                    {"''"}Pagedone is simply the best tool of investment in the
                    market right now.{"''"}
                  </CardDescription>
                </div>
              </Card>
            </CarouselItem>
            <CarouselItem className="flex min-h-[300px] basis-[100%] items-center justify-center p-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
              <Card className="flex h-full w-full items-center p-3 dark:border-none dark:bg-[#222327] md:p-4">
                <div>
                  <div className="flex items-center gap-5">
                    <Avatar className="h-[50px] w-[50px]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>
                        <img src="/assets/user.png" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <CardTitle className="swiper-slide-active:text-indigo-600 font-medium transition-all duration-500 group-hover:text-indigo-600">
                        Shohanur Shohan
                      </CardTitle>
                      <span className="text-sm leading-6 text-gray-500">
                        CEO
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-start gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 border-none ${
                          index < rating
                            ? index === rating - 1
                              ? "fill-[#f7b814] stroke-[#f7b814]"
                              : "fill-[#f7b814] stroke-[#f7b814]"
                            : "fill-none stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <CardDescription className="font-catamaran mt-3 h-[50px] text-lg font-semibold leading-8 transition-all duration-500 group-hover:text-gray-800">
                    {"''"}Pagedone is simply the best tool of investment in the
                    market right now.{"''"}
                  </CardDescription>
                </div>
              </Card>
            </CarouselItem>
            <CarouselItem className="flex min-h-[300px] basis-[100%] items-center justify-center p-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
              <Card className="flex h-full w-full items-center p-3 dark:border-none dark:bg-[#222327] md:p-4">
                <div>
                  <div className="flex items-center gap-5">
                    <Avatar className="h-[50px] w-[50px]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>
                        <img src="/assets/user.png" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <CardTitle className="swiper-slide-active:text-indigo-600 font-medium transition-all duration-500 group-hover:text-indigo-600">
                        Shohanur Shohan
                      </CardTitle>
                      <span className="text-sm leading-6 text-gray-500">
                        CEO
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-start gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 border-none ${
                          index < rating
                            ? index === rating - 1
                              ? "fill-[#f7b814] stroke-[#f7b814]"
                              : "fill-[#f7b814] stroke-[#f7b814]"
                            : "fill-none stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <CardDescription className="font-catamaran mt-3 h-[50px] text-lg font-semibold leading-8 transition-all duration-500 group-hover:text-gray-800">
                    {"''"}Pagedone is simply the best tool of investment in the
                    market right now.{"''"}
                  </CardDescription>
                </div>
              </Card>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </section>
  );
};

export default Reviews;
