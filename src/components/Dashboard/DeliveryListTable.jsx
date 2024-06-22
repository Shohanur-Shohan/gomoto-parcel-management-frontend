import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
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
import { deliveryMenUpdateBooked } from "@/utils/api";

const DeliveryListTable = ({ data, refetch, userEmail }) => {
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
    delivery_date,
    delivery_address_latitude,
    delivery_address_longitude,
    parcel_price,
    status,
    booking_date,
    delivery_men_id,
    apporoximate_delivery_date,
  } = data;

  const position = [delivery_address_latitude, delivery_address_longitude];

  const handleDelivery = async (id) => {
    // console.log(id);

    const updatedInfo = {
      userEmail: userEmail,
      status: "delivered",
    };

    const result = await deliveryMenUpdateBooked({
      id: id,
      updatedInfo: updatedInfo,
    });
    if (result?.modifiedCount > 0) {
      toast.success("Parcel Delivered");
      refetch();
    }
  };

  const handleCancel = async (id) => {
    const updatedInfo = {
      userEmail: userEmail,
      status: "cancelled",
    };

    const result = await deliveryMenUpdateBooked({
      id: id,
      updatedInfo: updatedInfo,
    });
    if (result?.modifiedCount > 0) {
      toast.success("Delivery Cancelled");
      refetch();
    }
  };
  const alreadyDelivered = () => {
    toast.success("Parcel already delivered!");
  };

  const alreadyCancelled = () => {
    toast.success("Alreadt cancelled!");
  };

  return (
    <>
      <TableRow className="border-input">
        <TableCell>{booked_user_name}</TableCell>
        <TableCell>{receiver_name}</TableCell>
        <TableCell>{booked_user_number}</TableCell>
        <TableCell>{delivery_date}</TableCell>
        <TableCell>{apporoximate_delivery_date}</TableCell>
        <TableCell>{receriver_number}</TableCell>
        <TableCell>{delivery_address}</TableCell>

        <TableCell className="text-right">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Location</Button>
            </DialogTrigger>

            <DialogContent className="max-w-[600px]">
              <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    {receiver_name}
                    <br /> {receriver_number}
                  </Popup>
                </Marker>
              </MapContainer>

              <DialogFooter className="justify-center sm:justify-center">
                <DialogClose asChild>
                  <Button variant="destructive">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TableCell>
        <TableCell className="text-right">
          <Dialog>
            {status === "cancelled" ? (
              <Button variant="destructive" className="opacity-60">
                Cancelled
              </Button>
            ) : status === "delivered" ? (
              <Button
                variant="destructive"
                className="opacity-60"
                onClick={alreadyDelivered}
              >
                Cancel
              </Button>
            ) : (
              <DialogTrigger asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogTrigger>
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
                    variant="destructive"
                    onClick={() => handleCancel(_id)}
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TableCell>
        <TableCell className="text-right">
          <Dialog>
            {status === "delivered" ? (
              <Button variant="outline" className="opacity-60">
                Delivered
              </Button>
            ) : status === "cancelled" ? (
              <Button
                variant="outline"
                className="opacity-60"
                onClick={alreadyCancelled}
              >
                Deliver
              </Button>
            ) : (
              <DialogTrigger asChild>
                <Button variant="outline">Deliver</Button>
              </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-destructive lg:text-2xl">
                  Are you sure?
                </DialogTitle>
                <DialogDescription className="text-center">
                  You want to deliver this!
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="justify-center sm:justify-center">
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelivery(_id)}
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    </>
  );
};
DeliveryListTable.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.func,
  userEmail: PropTypes.string,
};
export default DeliveryListTable;
