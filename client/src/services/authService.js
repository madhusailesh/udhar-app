import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/auth`;


// SIGNUP
export const signupUser = async (userData) => {
  const response = await axios.post(
    `${API}/signup`,
    userData
  );

  return response.data;
};


// LOGIN
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API}/login`,
    userData
  );

  return response.data;
};





// SEARCH CUSTOMERS
export const searchCustomers = async (search) => {

  const response = await axios.get(
    `${API}/search-customers?search=${search}`
  );

  return response.data;
};