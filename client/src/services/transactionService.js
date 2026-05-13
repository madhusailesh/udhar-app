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




// GET PENDING REQUESTS
export const getPendingRequests = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/pending`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};




// APPROVE REQUEST
export const approveRequest = async (id) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/approve/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};




// REJECT REQUEST
export const rejectRequest = async (id) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/reject/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};




// SHOPKEEPER TRANSACTIONS
export const getShopkeeperTransactions = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/shopkeeper`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};