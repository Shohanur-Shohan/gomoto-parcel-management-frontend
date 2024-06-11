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
