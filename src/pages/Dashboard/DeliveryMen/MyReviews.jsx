import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { deliveryMenReviews } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

const MyReviews = () => {
  const [Auth] = useAuth();
  const { user } = Auth;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["searchByDate", user?.email],
    queryFn: async () => await deliveryMenReviews(user?.email),
    enabled: !!user?.email,
  });

  if (isLoading || !user?.email) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading parcels</div>;
  }

  return (
    <section className="w-full px-2 py-10 sm:px-3 md:px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">My Reviews</h2>
      </div>

      <div className="grid grid-cols-1 items-center justify-between gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.reviews.map((item, index) => {
          return (
            <div key={index} className="col-span-1">
              <Card className="flex h-full w-full items-center p-3 dark:border-none dark:bg-[#222327] md:p-4">
                <div>
                  <div className="flex items-center gap-5">
                    <Avatar className="h-[50px] w-[50px]">
                      <AvatarImage src={item?.image || "/assets/user.png"} />
                      <AvatarFallback>
                        <img src="/assets/user.png" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <CardTitle className="swiper-slide-active:text-indigo-600 font-medium transition-all duration-500 group-hover:text-indigo-600">
                        {item?.riview_giver_name}
                      </CardTitle>
                      <span className="text-sm leading-6 text-gray-500">
                        {item?.review_date}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-start gap-1">
                    <p className="">{item?.rating}</p>
                    <Star className="h-4 w-4 fill-[#f7b814] stroke-[#f7b814]" />
                  </div>
                  <CardDescription className="font-catamaran mt-3 h-[50px] text-lg font-semibold leading-8 transition-all duration-500 group-hover:text-gray-800">
                    {item?.review}
                  </CardDescription>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyReviews;
