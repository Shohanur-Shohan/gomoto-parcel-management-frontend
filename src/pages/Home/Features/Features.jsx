import Lottie from "lottie-react";
import feature1 from "../../../../public/assets/feature1.json";
import feature2 from "../../../../public/assets/feature2.json";
import feature3 from "../../../../public/assets/feature3.json";
import feature4 from "../../../../public/assets/feature4.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeAnimation } from "@/utils/variants";

const Features = () => {
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
              Features
            </CardDescription>
            <CardTitle className="mx-auto max-w-[530px] text-[25px] font-semibold leading-[35px] sm:text-[34px] sm:leading-[45px] md:text-[48px] md:leading-[55px]">
              Try us and see how good our services are.
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
              <Lottie
                animationData={feature1}
                loop={true}
                className="mx-auto h-[200px]"
              />
            </CardContent>
            <CardHeader className="text-center">
              <CardTitle>Swift Delivery</CardTitle>
              <CardDescription className="font-catamaran">
                Fast and efficient delivery service.
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
            <CardContent>
              <Lottie
                animationData={feature2}
                loop={true}
                className="mx-auto h-[200px]"
              />
            </CardContent>
            <CardHeader className="text-center">
              <CardTitle>Trusted Service</CardTitle>
              <CardDescription className="font-catamaran">
                Reliable and dependable delivery solutions.
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
            <CardContent>
              <Lottie
                animationData={feature3}
                loop={true}
                className="mx-auto h-[200px]"
              />
            </CardContent>
            <CardHeader className="text-center">
              <CardTitle>Vaccinated Courier</CardTitle>
              <CardDescription className="font-catamaran">
                Ensuring safety with vaccinated couriers.
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
            <CardContent>
              <Lottie
                animationData={feature4}
                loop={true}
                className="mx-auto h-[200px]"
              />
            </CardContent>
            <CardHeader className="text-center">
              <CardTitle>Safety Protocol</CardTitle>
              <CardDescription className="font-catamaran">
                Following strict safety measures for security.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
