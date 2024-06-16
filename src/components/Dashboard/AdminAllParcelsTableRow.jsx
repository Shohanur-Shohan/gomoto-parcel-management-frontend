import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminUpdateBookedParcel, allDeliveryMen } from "@/utils/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import useAuth from "@/hooks/useAuth";

const AdminAllParcelsTableRow = ({ allData, refetch }) => {
  const [deliveryMen, setDeliveryMen] = useState(null);
  const [date, setDate] = useState(null);
  const [Auth] = useAuth();
  const { user } = Auth;

  const { data, isLoading } = useQuery({
    queryKey: ["allDeliveryMen", allData],
    queryFn: async () => await allDeliveryMen(),
    enabled: !!allData,
  });

  const {
    _id,
    booked_user_name,
    booked_user_email,
    booked_user_number,
    delivery_date,
    status,
    booking_date,
    parcel_price,
  } = allData;

  const handleConfirm = async (id) => {
    if (!deliveryMen) {
      toast.error("Delivery men not added!");
    } else if (!date) {
      toast.error("Approximate date not added!");
    } else {
      const deliveryDate = format(date, "PPP");
      const updatedInfo = {
        parcel_id: id,
        adminEmail: user?.email,
        updatedData: {
          delivery_men_id: deliveryMen,
          apporoximate_delivery_date: deliveryDate,
          status: "On The Way",
        },
      };
      const res = await adminUpdateBookedParcel(updatedInfo);
      if (res?.modifiedCount > 0) {
        toast.success("Suceessfully Updated");
      } else {
        toast.error("Failed to Update");
      }
    }
  };

  const parsedDeliveryDate = parse(delivery_date, "PPP", new Date());

  if (!data && isLoading) {
    return (
      <tr>
        <td colSpan="10">
          <Skeleton className="h-4 w-full" />
        </td>
      </tr>
    );
  }
  return (
    <>
      <TableRow className="border-input">
        <TableCell className="line-clamp-2">{booked_user_name}</TableCell>
        <TableCell>{booked_user_number}</TableCell>
        <TableCell>{booking_date}</TableCell>
        <TableCell>{delivery_date}</TableCell>
        <TableCell>${parcel_price}</TableCell>
        <TableCell>
          <Badge className="capitalize">{status}</Badge>
        </TableCell>
        <TableCell className="text-right">
          {/* select driver field */}

          <Button
            asChild
            type="button"
            variant="secondary"
            className="cursor-pointer"
          >
            <Dialog>
              {allData?.status === "cancelled" ? (
                <Button className="opacity-40" variant="destructive">
                  Manage
                </Button>
              ) : (
                <DialogTrigger asChild>
                  <Button variant="destructive">Manage</Button>
                </DialogTrigger>
              )}
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-destructive lg:text-2xl">
                    Select Delivery Men & Date
                  </DialogTitle>
                  {/* select driver field */}
                  <Select onValueChange={(e) => setDeliveryMen(e)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Delivery Men" />
                    </SelectTrigger>

                    <SelectContent>
                      {data?.map((item, index) => {
                        return (
                          <SelectItem key={item?._id} value={item?._id}>
                            {item?.userName} ({item?._id})
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {/* select driver field */}

                  {/* select delivery date */}
                  <Popover className="mb-2 mt-3 w-full">
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
                        id="apporoximate_delivery_date"
                        name="apporoximate_delivery_date"
                        mode="single"
                        onSelect={setDate}
                        fromDate={parsedDeliveryDate} //past days hidden
                        initialFocus
                        required
                      />
                    </PopoverContent>
                  </Popover>
                  {/* select delivery date */}
                </DialogHeader>

                <DialogFooter className="justify-center sm:justify-center">
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      onClick={() => handleConfirm(_id)}
                    >
                      Confirm
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

AdminAllParcelsTableRow.propTypes = {
  allData: PropTypes.object,
  refetch: PropTypes.func,
};

export default AdminAllParcelsTableRow;
