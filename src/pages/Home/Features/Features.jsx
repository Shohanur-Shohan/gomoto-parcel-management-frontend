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

const Features = () => {
  return (
    <section className="mb-[50px] mt-[100px]">
      <div className="col-span-1">
        <Card className="mx-auto max-w-[360px] border-none shadow-none dark:bg-transparent sm:m-0 sm:max-w-full">
          <CardHeader className="mb-[40px] bg-none text-center dark:bg-transparent">
            <CardDescription className="font-bold text-[#f7b814]">
              Our Services
            </CardDescription>
            <CardTitle className="mx-auto max-w-[530px] text-[25px] font-semibold leading-[35px] sm:text-[34px] sm:leading-[45px] md:text-[48px] md:leading-[55px]">
              Try us and see how good our services are.
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="mx-auto grid max-w-[1570px] grid-cols-1 items-center justify-between gap-6 px-2 sm:grid-cols-2 md:px-4 lg:grid-cols-3 xl:grid-cols-4">
        <div className="col-span-1">
          <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327]">
            <CardContent className="p-4">
              <Lottie
                animationData={feature1}
                loop={true}
                className="mx-auto h-[200px]"
              />
            </CardContent>
            <CardHeader className="text-center">
              <CardTitle>Swift Delivery</CardTitle>
              <CardDescription>
                Fast and efficient delivery service.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327]">
            <CardContent>
              <Lottie
                animationData={feature2}
                loop={true}
                className="mx-auto h-[200px]"
              />
            </CardContent>
            <CardHeader className="text-center">
              <CardTitle>Trusted Service</CardTitle>
              <CardDescription>
                Reliable and dependable delivery solutions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327]">
            <CardContent>
              <Lottie
                animationData={feature3}
                loop={true}
                className="mx-auto h-[200px]"
              />
            </CardContent>
            <CardHeader className="text-center">
              <CardTitle>Vaccinated Courier</CardTitle>
              <CardDescription>
                Ensuring safety with vaccinated couriers.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="mx-auto max-w-[370px] dark:border-transparent dark:bg-[#222327]">
            <CardContent>
              <Lottie
                animationData={feature4}
                loop={true}
                className="mx-auto h-[200px]"
              />
            </CardContent>
            <CardHeader className="text-center">
              <CardTitle>Safety Protocol</CardTitle>
              <CardDescription>
                Following strict safety measures for security.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
