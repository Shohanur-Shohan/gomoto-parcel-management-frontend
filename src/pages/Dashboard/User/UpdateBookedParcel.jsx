import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { findOneBookedParcel } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateBookedParcel = () => {
  const [date, setDate] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [ParcelWeight, setParcelWeight] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [validPath, setValidPath] = useState(false);
  const [Auth] = useAuth();
  const { user, loading } = Auth;
  const userEmail = user?.email;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const parcelID = location?.pathname.replace(
    "/dashboard/update-booked-parcel/",
    ""
  );
  const stateId = location?.state?.id;

  useEffect(() => {
    if (parcelID !== stateId) {
      navigate("/dashboard/my-parcels");
    } else {
      setValidPath(true);
    }
  }, [parcelID, stateId, navigate]);

  const {
    data: parcelData = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["singleBookedParcel", parcelID, validPath],
    queryFn: async () => await findOneBookedParcel(parcelID),
    enabled: validPath === true,
  });

  const {
    _id,
    booked_user_name,
    booked_user_email,
    booked_user_number,
    parcel_weight,
    parcel_type,
    receiver_name,
    receriver_number,
    delivery_address,
    //   booking_date,
    delivery_date,
    //   delivery_men_id,
    delivery_address_latitude,
    delivery_address_longitude,
    parcel_price,
    status,
  } = parcelData;

  const handleParcelWeight = (e) => {
    // e.preventDefault();
    let parcelWeight = e.target.value;
    setParcelWeight(parcelWeight);

    if (parcelWeight < 1) {
      setDeliveryPrice(0);
    } else if (parcelWeight > 2) {
      setDeliveryPrice(150);
    } else {
      setDeliveryPrice(parcelWeight * 50);
    }
  };

  useEffect(() => {
    if (parcelData) {
      setDeliveryPrice(parcelData?.parcel_price);
    }
  }, [parcelData?.parcel_price, parcelData]);

  //   const handleBooking = async (data) => {
  //     setIsDisabled(true);
  //     const deliveryDate = format(date, "PPP");
  //     const bookingInfo = {
  //       booked_user_name: user?.displayName,
  //       booked_user_email: user?.email,
  //       booked_user_number: data?.booked_user_number,
  //       parcel_weight: ParcelWeight,
  //       parcel_type: data?.parcel_type,
  //       receiver_name: data?.receiver_name,
  //       receriver_number: data?.receriver_number,
  //       delivery_address: data?.delivery_address,
  //       booking_date: format(new Date(), "PPP"),
  //       delivery_date: deliveryDate,
  //       delivery_men_id: "Not issued",
  //       delivery_address_latitude: latitude,
  //       delivery_address_longitude: longitude,
  //       parcel_price: deliveryPrice,
  //       status: "pending",
  //     };

  //     const result = await parcelBooking(bookingInfo);
  //     if (result?.insertedId) {
  //       toast.success("Booking Done");
  //       reset();
  //     }

  //     setIsDisabled(false);
  //   };
  const updateBooking = (data) => {
    console.log(data);
  };

  if (isLoading || !userEmail) {
    return <Loader />;
  }

  if (error) {
    return <div>No parcels booked</div>;
  }

  console.log(parcelData, "parcel");

  return (
    <section className="w-full px-2 py-[40px] sm:px-3 md:px-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Update Booked Parcel
        </h2>
      </div>
      <Separator className="my-6" />
      <form onSubmit={handleSubmit(updateBooking)} className="space-y-8">
        <h1 className="my-2 text-lg font-semibold">Your Information</h1>

        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="booked_user_name">Full name</Label>
            <Input
              id="booked_user_name"
              name="booked_user_name"
              type="text"
              defaultValue={booked_user_name}
              disabled
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="booked_user_email">Email</Label>
            <Input
              id="booked_user_email"
              name="booked_user_email"
              type="email"
              defaultValue={booked_user_email}
              disabled
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="booked_user_number">Phone Number</Label>
            <Input
              id="booked_user_number"
              name="booked_user_number"
              type="text"
              defaultValue={booked_user_number}
              {...register("booked_user_number")}
              required
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="parcel_weight">Parcel Weight(kg)</Label>
            <Input
              id="parcel_weight"
              name="parcel_weight"
              type="number"
              defaultValue={parcel_weight}
              onChange={handleParcelWeight}
              placeholder="Parcel weight"
              required
            />
            <p className="text-[14px] text-red-600">
              Note: 1 kg Price is 50Tk, 2 kg 100Tk, more than 2kg price will be
              150Tk
            </p>
          </div>
          <div className="col-span-2 grid gap-2">
            <Label htmlFor="parcel_type">Parcel Type</Label>
            <Textarea
              id="parcel_type"
              name="parcel_type"
              type="text"
              defaultValue={parcel_type}
              {...register("parcel_type")}
              required
            />
          </div>
        </div>

        <h1 className="my-2 text-lg font-semibold">
          Receiver{"'"}s Information
        </h1>

        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="receiver_name">Receiver{"'"}s Name</Label>
            <Input
              id="receiver_name"
              name="receiver_name"
              type="text"
              placeholder="Receiver's Name"
              defaultValue={receiver_name}
              {...register("receiver_name")}
              required
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="receriver_number">Receiver{"'"}s Number</Label>
            <Input
              id="receriver_number"
              name="receriver_number"
              type="text"
              defaultValue={receriver_number}
              placeholder="Receivers number"
              {...register("receriver_number")}
              required
            />
          </div>
        </div>

        <h1 className="my-2 text-lg font-semibold">Delivery Information</h1>

        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="delivery_address">Delivery Address</Label>
            <Input
              id="delivery_address"
              name="delivery_address"
              type="text"
              defaultValue={delivery_address}
              placeholder="Delivery Address"
              {...register("delivery_address")}
              required
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label>Delivery Date ({delivery_date || ""})</Label>
            <Popover className="w-full">
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  id="delivery_date"
                  name="delivery_date"
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  fromDate={new Date()} //past days hidden
                  initialFocus
                  required
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="delivery_address_latitude">
              Delivery Address Latitude
            </Label>
            <Input
              id="delivery_address_latitude"
              name="delivery_address_latitude"
              type="number"
              defaultValue={delivery_address_latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Delivery address latitude"
              required
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="delivery_address_longitude">
              Delivery Address Latitude
            </Label>
            <Input
              id="delivery_address_longitude"
              name="delivery_address_longitude"
              type="number"
              defaultValue={delivery_address_longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Delivery address longitude"
              required
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="parcel_price">Parcel Price</Label>
            <Input
              id="parcel_price"
              name="parcel_price"
              type="number"
              defaultValue={deliveryPrice}
              disabled
              required
            />
            <p className="text-[14px] text-red-600">
              Note: 1 kg Price is 50Tk, 2 kg 100Tk, more than 2kg price will be
              150Tk
            </p>
          </div>
        </div>

        {status === "pending" ? (
          <Button
            type="submit"
            className="cursor-pointer px-[40px] py-6"
            disabled={isDisabled}
          >
            {isDisabled ? "Updating" : "Update Now"}
          </Button>
        ) : (
          <Button className="cursor-pointer px-[40px] py-6" disabled>
            Update Now
          </Button>
        )}
      </form>
    </section>
  );
};

export default UpdateBookedParcel;
