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
  return (
    <>
      <TableRow className="border-input">
        <TableCell>{userName}</TableCell>
        <TableCell>{user_phone}</TableCell>
        <TableCell>Not available</TableCell>
        <TableCell>Not available</TableCell>
      </TableRow>
    </>
  );
};

AllDeliveryMenTableRow.propTypes = {
  allData: PropTypes.object,
  refetch: PropTypes.func,
};

export default AllDeliveryMenTableRow;
