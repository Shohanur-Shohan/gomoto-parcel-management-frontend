import axios from "axios";

//send userinfo To Db
export const sendUserToDB = async (user) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
    user,
  });
  const result = res?.data;
  return result;
};

//find user
export const UserType = async (email) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${email}`);
  const result = res?.data;
  return result;
};

//host image
export const hostImage = async (image) => {
  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
    { image },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const result = res?.data;
  return result;
};

//send userinfo To Db
export const parcelBooking = async (bookingInfo) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/parcel_booking`,
    bookingInfo
  );
  const result = res?.data;
  return result;
};

//user booked parcels
export const usersBookedParcels = async (email) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/user_booked_parcels/${email}`
  );
  const result = res?.data;
  return result;
};

// find single booked data by id
export const findOneBookedParcel = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/find-booked-parcel/${id}`
  );
  const result = res?.data;
  return result;
};

//update user booked parcel data
export const updateBookedParcel = async (updatedInfo) => {
  const userEmail = updatedInfo[0]?.parcelInfo?.userEmail;
  const id = updatedInfo[0]?.parcelInfo?.id;
  const res = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/update_booked_parcel/${userEmail}/${id}`,
    updatedInfo[1]?.updatedData
  );
  const result = res?.data;
  return result;
};

//cancel user booked parcel data
export const cancelBookedParcel = async (deleteInfo) => {
  const { id, email } = deleteInfo;
  const res = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/cancel_booked_parcel/${email}/${id}`
  );
  const result = res?.data;
  return result;
};
