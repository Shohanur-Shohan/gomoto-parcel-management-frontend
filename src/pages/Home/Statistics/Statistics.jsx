import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeAnimation } from "@/utils/variants";
import CountUp from "react-countup";
import { useState } from "react";

const Statistics = () => {
  const [startCount, setStartCount] = useState(false);

  return (
    <section className="mb-[50px] mt-[100px]">
      <motion.div
        variants={fadeAnimation("up", 0.2)}
        initial="hidden"
        whileInView="show"
        onAnimationComplete={() => setStartCount(true)}
      >
        <Card className="mx-auto max-w-[360px] border-none shadow-none dark:bg-transparent sm:m-0 sm:max-w-full">
          <CardHeader className="mb-[40px] bg-none text-center dark:bg-transparent">
            <CardDescription className="text-[16px] font-bold text-[#f7b814]">
              Statistics
            </CardDescription>
            <CardTitle className="mx-auto max-w-[530px] text-[25px] font-semibold leading-[35px] sm:text-[34px] sm:leading-[45px] md:text-[48px] md:leading-[55px]">
              Service Performance Metrics
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>
      <div className="mx-auto grid max-w-[1570px] grid-cols-1 items-center justify-between gap-6 px-2 sm:grid-cols-2 md:px-4 lg:grid-cols-3">
        <motion.div
          variants={fadeAnimation("up", 0.4)}
          initial="hidden"
          whileInView="show"
          className="col-span-1"
        >
          <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327] md:max-w-full">
            <CardContent className="p-4 text-center">
              {startCount ? (
                <CountUp
                  end={100}
                  start={0}
                  duration={4}
                  className="text-center text-[70px] font-semibold"
                />
              ) : (
                <p className="text-center text-[70px] font-semibold">0</p>
              )}
            </CardContent>
            <CardHeader className="pt-0 text-center">
              <CardTitle>Parcels Booked</CardTitle>
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
            <CardContent className="p-4 text-center">
              {startCount ? (
                <CountUp
                  end={100}
                  start={0}
                  duration={4}
                  className="text-center text-[70px] font-semibold"
                />
              ) : (
                <p className="text-center text-[70px] font-semibold">0</p>
              )}
            </CardContent>
            <CardHeader className="pt-0 text-center">
              <CardTitle>Parcels Delivered</CardTitle>
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
            <CardContent className="p-4 text-center">
              {startCount ? (
                <CountUp
                  end={100}
                  start={0}
                  duration={4}
                  className="text-center text-[70px] font-semibold"
                />
              ) : (
                <p className="text-center text-[70px] font-semibold">0</p>
              )}
            </CardContent>
            <CardHeader className="pt-0 text-center">
              <CardTitle>Registered Users</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
