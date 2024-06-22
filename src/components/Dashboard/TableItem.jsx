import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
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
import { cancelBookedParcel, deliveryMEnReview } from "@/utils/api";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const TableItem = ({ data, refetch, user }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(null);
  const {
    _id,
    booking_date,
    delivery_date,
    parcel_type,
    status,
    delivery_men_id,
    apporoximate_delivery_date,
  } = data;

  const handleCancel = async (id) => {
    const deleteInfo = {
      id: id,
      email: data?.booked_user_email,
    };
    const result = await cancelBookedParcel(deleteInfo);
    if (result) {
      toast.success("Booking Cancelled");
      refetch();
    }
  };

  const handleReview = async (id) => {
    const updatedData = {
      delivery_men_id: delivery_men_id,
      data: {
        parcel_id: id,
        rating: rating,
        review: review,
        reviewer: user?.email,
      },
    };
    const result = await deliveryMEnReview(updatedData);
    if (result?.message) {
      toast.error(`${result?.message}`);
    } else if (result?.modifiedCount > 0) {
      toast.success("Review Suceess");
    }
  };

  const handlePayment = (id) => {
    console.log(id);
    toast.success("Payment Suceess");
  };

  const handleAvailable = () => {
    toast.success(
      `Order ${status === "cancelled" ? "cancelled" : `is ${status}`}`
    );
  };

  return (
    <>
      <TableRow className="border-input">
        <TableCell className="line-clamp-2">{parcel_type}</TableCell>
        <TableCell>{booking_date}</TableCell>
        <TableCell>{delivery_date}</TableCell>
        <TableCell>{apporoximate_delivery_date}</TableCell>
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
        </TableCell>
        <TableCell className="text-right">
          {/* //review dialog */}
          <Dialog>
            {status === "delivered" ? (
              <DialogTrigger asChild>
                <Button variant="outline">Review</Button>
              </DialogTrigger>
            ) : (
              <Button variant="outline" onClick={handleAvailable}>
                Review
              </Button>
            )}
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="w-full max-w-sm">
                  <div className="flex flex-col items-center pb-4">
                    <img
                      className="mb-3 h-24 w-24 rounded-full shadow-lg"
                      src={user?.photoURL || "/assets/user.png"}
                      alt="Bonnie image"
                    />
                    <h5 className="my-2 text-xl font-medium text-gray-900">
                      {user?.displayName}
                    </h5>
                    {/* select driver field */}
                    <Select onValueChange={(e) => setRating(e)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Rating" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={1}>1 Star</SelectItem>
                        <SelectItem value={2}>2 Stars</SelectItem>
                        <SelectItem value={3}>3 Stars</SelectItem>
                        <SelectItem value={4}>4 Stars</SelectItem>
                        <SelectItem value={5}>5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* select driver field */}
                    <Textarea
                      id="review"
                      name="review"
                      type="text"
                      className="mt-2"
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Give Your Review"
                    />
                    <h5 className="mb-1 mt-3 text-xl font-medium text-gray-900">
                      Delivery Men ID:
                    </h5>
                    <h5 className="text-md font-medium text-gray-900">
                      {delivery_men_id}
                    </h5>
                  </div>
                </div>
              </DialogHeader>

              <DialogFooter className="justify-center sm:justify-center">
                <DialogClose asChild>
                  <Button
                    onClick={() => handleReview(_id)}
                    variant="destructive"
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* //review dialog */}
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
  user: PropTypes.object,
};
export default TableItem;
