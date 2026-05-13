import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/pending-requests`;




// CREATE REQUEST
export const createPendingRequest =
  async (data) => {

    const token =
      localStorage.getItem("token");

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




// GET CUSTOMER REQUESTS
export const getCustomerPendingRequests =
  async () => {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${API}/customer`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  };




// APPROVE REQUEST
export const approvePendingRequest =
  async (id) => {

    const token =
      localStorage.getItem("token");

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
export const rejectPendingRequest =
  async (id) => {

    const token =
      localStorage.getItem("token");

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