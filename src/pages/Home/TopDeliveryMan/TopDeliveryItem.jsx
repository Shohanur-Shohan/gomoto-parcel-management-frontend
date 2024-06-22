import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";
import { fadeAnimation } from "@/utils/variants";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { deliveryMen } from "@/utils/api";
import { useState } from "react";

const TopDeliveryItem = ({ item, index }) => {
  const [Parcel, setParcel] = useState(0);
  const rating = item?.averageRating || 0;

  useEffect(() => {
    if (item) {
      (async () => {
        const res = await deliveryMen(item?._id);
        // console.log(res);
        setParcel(res?.parcel_delivered.length);
      })();
    }
  }, [item]);

  return (
    <>
      <motion.div
        variants={fadeAnimation("up", index * 0.4)}
        initial="hidden"
        whileInView="show"
        className="col-span-1"
      >
        <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327] md:max-w-full">
          <CardContent className="p-4">
            <img
              className="w-full rounded-sm bg-cover"
              src="https://as1.ftcdn.net/v2/jpg/03/21/51/12/1000_F_321511245_lVwfaaZdHxP8YGFZaqQ5PyXeiPx5zwtb.jpg"
              alt="img"
            />
          </CardContent>
          <div className="flex justify-center gap-1">
            {[...Array(item?.averageRating)].map((_, index) => (
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
            <CardTitle>{item?.userName}</CardTitle>
            <CardDescription className="font-catamaran">
              {Parcel} Parcel Delivered
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </>
  );
};
TopDeliveryItem.propTypes = {
  item: PropTypes.object,
};
export default TopDeliveryItem;
