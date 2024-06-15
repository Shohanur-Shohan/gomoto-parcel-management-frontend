import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { parsePPPDate } from "@/utils/ParseDate";
import { addDays, format } from "date-fns";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cancelBookedParcel } from "@/utils/api";

const TableItem = ({ data, refetch }) => {
  const {
    _id,
    booking_date,
    delivery_date,
    parcel_type,
    status,
    delivery_men_id,
  } = data;

  const handleCancel = async (id) => {
    const deleteInfo = {
      id: id,
      email: data?.booked_user_email,
    };
    const result = await cancelBookedParcel(deleteInfo);
    console.log(result);
    toast.success("Booking Cancelled");
    refetch();
    // if (result.deletedCount === 1) {
    //   refetch();
    //   toast.success("Booking Cancelled");
    // } else {
    //   toast.error("Booking Cancelation Failed");
    // }
  };

  const handleReview = (id) => {
    console.log(id);
    toast.success("Review Suceess");
  };

  const handlePayment = (id) => {
    console.log(id);
    toast.success("Payment Suceess");
  };

  const parseDeliveryDate = parsePPPDate(delivery_date);

  const apporoximateDate = addDays(parseDeliveryDate, 3);
  const formattedApproximateDate = format(apporoximateDate, "MMMM do, yyyy");

  return (
    <>
      <TableRow className="border-input">
        <TableCell className="line-clamp-2">{parcel_type}</TableCell>
        <TableCell>{booking_date}</TableCell>
        <TableCell>{delivery_date}</TableCell>
        <TableCell>{formattedApproximateDate}</TableCell>
        <TableCell>{delivery_men_id}</TableCell>
        <TableCell>
          <Badge className="capitalize">{status}</Badge>
        </TableCell>
        <TableCell className="text-right">
          {/* dialog */}

          <Button
            asChild
            type="button"
            variant="secondary"
            className="cursor-pointer"
            disabled={status === "pending" ? false : true}
          >
            {status === "pending" ? (
              <Link
                to={`/dashboard/update-booked-parcel/${_id}`}
                state={{ id: _id }}
              >
                Update
              </Link>
            ) : (
              <div className="opacity-40">Update</div>
            )}
          </Button>
          {/* dialog */}
        </TableCell>
        <TableCell className="text-right">
          <Dialog>
            {status === "pending" ? (
              <DialogTrigger asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogTrigger>
            ) : (
              <Button variant="destructive" className="opacity-40">
                Cancel
              </Button>
            )}
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-destructive lg:text-2xl">
                  Are you sure?
                </DialogTitle>
                <DialogDescription className="text-center">
                  This will be parmanently canceled.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="justify-center sm:justify-center">
                <DialogClose asChild>
                  <Button
                    onClick={() => handleCancel(_id)}
                    variant="destructive"
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* <Button onClick={() => handleCancel(_id)} variant="destructive">
            Cancel
          </Button> */}
        </TableCell>
        <TableCell className="text-right">
          <Button onClick={() => handleReview(_id)} variant="outline">
            Review
          </Button>
        </TableCell>
        <TableCell className="text-right">
          <Button onClick={() => handlePayment(_id)} variant="outline">
            Pay
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};
TableItem.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.func,
};
export default TableItem;
