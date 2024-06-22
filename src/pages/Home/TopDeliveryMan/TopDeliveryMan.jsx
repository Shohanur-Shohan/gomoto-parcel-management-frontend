import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeAnimation } from "@/utils/variants";
import { topDeliveryMen } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import TopDeliveryItem from "./TopDeliveryItem";
import Loader from "@/components/Loader";
import useAuth from "@/hooks/useAuth";

const TopDeliveryMan = () => {
  const [Auth] = useAuth();
  const { user } = Auth;
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["topDeliveryMen"],
    queryFn: async () => await topDeliveryMen(),
    // enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading parcels</div>;
  }

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
        {data?.map((item, index) => {
          return <TopDeliveryItem key={item?._id} item={item} index={index} />;
        })}
      </div>
    </section>
  );
};

export default TopDeliveryMan;
