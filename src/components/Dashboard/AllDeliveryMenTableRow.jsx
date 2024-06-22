import { TableCell, TableRow } from "@/components/ui/table";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";

const AllDeliveryMenTableRow = ({ allData, refetch }) => {
  const {
    userName,
    userEmail,
    user_type,
    user_phone,
    parcel_delivered,
    reviews,
  } = allData;

  if (!allData) {
    return (
      <tr>
        <td colSpan="10">
          <Skeleton className="h-4 w-full" />
        </td>
      </tr>
    );
  }

  const averageReview = reviews.reduce(
    (accumulator, item) => accumulator + item?.rating,
    0
  );
  const averageRating = averageReview / parcel_delivered?.length;

  return (
    <>
      <TableRow className="border-input">
        <TableCell>{userName}</TableCell>
        <TableCell>{user_phone}</TableCell>
        <TableCell>{parcel_delivered?.length || "Not available"} </TableCell>
        <TableCell>{averageRating || "Not available"} </TableCell>
      </TableRow>
    </>
  );
};

AllDeliveryMenTableRow.propTypes = {
  allData: PropTypes.object,
  refetch: PropTypes.func,
};

export default AllDeliveryMenTableRow;
