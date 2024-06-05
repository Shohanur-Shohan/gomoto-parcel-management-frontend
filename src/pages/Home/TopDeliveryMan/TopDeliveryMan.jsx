import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeAnimation } from "@/utils/variants";
import { Star } from "lucide-react";

const TopDeliveryMan = () => {
  const rating = 3;
  return (
    <section className="mb-[50px] mt-[100px]">
      <motion.div
        variants={fadeAnimation("up", 0.2)}
        initial="hidden"
        whileInView="show"
      >
        <Card className="mx-auto max-w-[360px] border-none shadow-none dark:bg-transparent sm:m-0 sm:max-w-full">
          <CardHeader className="mb-[40px] bg-none text-center dark:bg-transparent">
            <CardDescription className="text-[16px] font-bold text-[#f7b814]">
              Best Performers
            </CardDescription>
            <CardTitle className="mx-auto max-w-[530px] text-[25px] font-semibold leading-[35px] sm:text-[34px] sm:leading-[45px] md:text-[48px] md:leading-[55px]">
              Top Delivery Man{"'"}s
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>
      <div className="mx-auto grid max-w-[1570px] grid-cols-1 items-center justify-between gap-6 px-2 sm:grid-cols-2 md:px-4 lg:grid-cols-3 xl:grid-cols-4">
        <motion.div
          variants={fadeAnimation("up", 0.4)}
          initial="hidden"
          whileInView="show"
          className="col-span-1"
        >
          <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327] md:max-w-full">
            <CardContent className="p-4">
              <img
                className="h-[350px] w-full rounded-sm bg-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                alt="img"
              />
            </CardContent>
            <div className="flex justify-center gap-1">
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
            <CardHeader className="text-center">
              <CardTitle>Shohanur Shohan</CardTitle>
              <CardDescription className="font-catamaran">
                200 Parcel Delivered
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div
          variants={fadeAnimation("up", 0.6)}
          initial="hidden"
          whileInView="show"
          className="col-span-1"
        >
          <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327] md:max-w-full">
            <CardContent className="p-4">
              <img
                className="h-[350px] w-full rounded-sm bg-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                alt="img"
              />
            </CardContent>
            <div className="flex justify-center gap-1">
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
            <CardHeader className="text-center">
              <CardTitle>Shohanur Shohan</CardTitle>
              <CardDescription className="font-catamaran">
                200 Parcel Delivered
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div
          variants={fadeAnimation("up", 0.8)}
          initial="hidden"
          whileInView="show"
          className="col-span-1"
        >
          <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327] md:max-w-full">
            <CardContent className="p-4">
              <img
                className="h-[350px] w-full rounded-sm bg-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                alt="img"
              />
            </CardContent>
            <div className="flex justify-center gap-1">
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
            <CardHeader className="text-center">
              <CardTitle>Shohanur Shohan</CardTitle>
              <CardDescription className="font-catamaran">
                200 Parcel Delivered
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div
          variants={fadeAnimation("up", 1)}
          initial="hidden"
          whileInView="show"
          className="col-span-1"
        >
          <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327] md:max-w-full">
            <CardContent className="p-4">
              <img
                className="h-[350px] w-full rounded-sm bg-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                alt="img"
              />
            </CardContent>
            <div className="flex justify-center gap-1">
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
            <CardHeader className="text-center">
              <CardTitle>Shohanur Shohan</CardTitle>
              <CardDescription className="font-catamaran">
                200 Parcel Delivered
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TopDeliveryMan;
