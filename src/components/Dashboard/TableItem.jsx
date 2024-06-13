import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { parsePPPDate } from "@/utils/ParseDate";
import { addDays, format } from "date-fns";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const TableItem = ({ data, refetch }) => {
  const {
    _id,
    booking_date,
    delivery_date,
    parcel_type,
    status,
    delivery_men_id,
  } = data;

  const handleUpdate = (id) => {
    console.log(id);
    toast.success("Update Suceess");
  };

  const handleCancel = (id) => {
    console.log(id);
    toast.error("Booking Cancelled");
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
          <Badge>{status}</Badge>
        </TableCell>
        <TableCell className="text-right">
          <Button onClick={() => handleUpdate(_id)} variant="secondary">
            Update
          </Button>
        </TableCell>
        <TableCell className="text-right">
          <Button onClick={() => handleCancel(_id)} variant="destructive">
            Cancel
          </Button>
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
