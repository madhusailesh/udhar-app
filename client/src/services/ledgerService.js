import axios from "axios";

const API = "http://localhost:5000/api/ledger";




// ADD ENTRY
export const addLedgerEntry = async (data) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/add`,
    data,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};




// SHOPKEEPER LEDGERS
export const getShopkeeperLedgers = async () => {

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




// CUSTOMER LEDGERS
export const getCustomerLedgers = async () => {

  const token = localStorage.getItem("token");

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