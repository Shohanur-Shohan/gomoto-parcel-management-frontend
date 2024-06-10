import axios from "axios";

export const sendUserToDB = async (user) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
    user,
  });
  const result = res?.data;
  return result;
};
