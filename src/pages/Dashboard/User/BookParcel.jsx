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
import { parcelBooking } from "@/utils/api";

const BookAParcel = () => {
  const [date, setDate] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [ParcelWeight, setParcelWeight] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [Auth] = useAuth();
  const { user, loading } = Auth;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lati = position?.coords?.latitude;
      const long = position?.coords?.longitude;
      setLatitude(lati);
      setLongitude(long);
    });
  }, []);

  // useEffect(()=>{}, [])
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

  const handleBooking = async (data) => {
    setIsDisabled(true);
    const deliveryDate = format(date, "PPP");
    const bookingInfo = {
      booked_user_name: user?.displayName,
      booked_user_email: user?.email,
      booked_user_number: data?.booked_user_number,
      parcel_weight: ParcelWeight,
      parcel_type: data?.parcel_type,
      receiver_name: data?.receiver_name,
      receriver_number: data?.receriver_number,
      delivery_address: data?.delivery_address,
      booking_date: format(new Date(), "PPP"),
      delivery_date: deliveryDate,
      delivery_men_id: "Not issued",
      delivery_address_latitude: latitude,
      delivery_address_longitude: longitude,
      parcel_price: deliveryPrice,
      status: "pending",
    };

    const result = await parcelBooking(bookingInfo);
    if (result?.insertedId) {
      toast.success("Booking Done");
      reset();
    }

    setIsDisabled(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="w-full px-2 py-[40px] sm:px-3 md:px-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Book A Parcel</h2>
      </div>
      <Separator className="my-6" />
      <form onSubmit={handleSubmit(handleBooking)} className="space-y-8">
        <h1 className="my-2 text-lg font-semibold">Your Information</h1>

        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="booked_user_name">Full name</Label>
            <Input
              id="booked_user_name"
              name="booked_user_name"
              type="text"
              defaultValue={`${user?.displayName || "your name"}`}
              disabled
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="booked_user_email">Email</Label>
            <Input
              id="booked_user_email"
              name="booked_user_email"
              type="email"
              defaultValue={`${user?.email || "example@gmail.com"}`}
              disabled
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="booked_user_number">Phone Number</Label>
            <Input
              id="booked_user_number"
              name="booked_user_number"
              type="text"
              placeholder="Your phone number"
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
              onChange={handleParcelWeight}
              placeholder="Parcel weight"
              // {...register("parcel_weight")}
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
              placeholder="Parcel description"
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
              placeholder="Delivery Address"
              {...register("delivery_address")}
              required
            />
          </div>
          <div className="col-span-1 grid gap-2">
            <Label>Delivery Date</Label>
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
              defaultValue={latitude}
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
              defaultValue={longitude}
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
              placeholder={deliveryPrice}
              disabled
              required
            />
            <p className="text-[14px] text-red-600">
              Note: 1 kg Price is 50Tk, 2 kg 100Tk, more than 2kg price will be
              150Tk
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="cursor-pointer px-[40px] py-6"
          disabled={isDisabled}
        >
          {isDisabled ? "Booking" : "Book Now"}
        </Button>
      </form>
    </section>
  );
};

export default BookAParcel;
