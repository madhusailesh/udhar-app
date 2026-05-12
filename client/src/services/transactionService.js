import axios from "axios";

const API = "http://localhost:5000/api/transactions";


// CREATE TRANSACTION
export const createTransaction = async (data) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/create`,
    data,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};