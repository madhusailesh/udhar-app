import { useEffect, useState } from "react";

import {
  createTransaction,
  getShopkeeperTransactions,
} from "../services/transactionService";

function ShopkeeperDashboard() {

  const [transactions, setTransactions] = useState([]);

  const [formData, setFormData] = useState({
    customer: "",
    itemName: "",
    amount: "",
  });


  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {

    try {

      const data = await getShopkeeperTransactions();

      setTransactions(data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    fetchTransactions();

  }, []);



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createTransaction(formData);

      alert("Request Sent");

      fetchTransactions();

    } catch (error) {

      console.log(error);

      alert("Failed");

    }
  };



  return (
    <div>

      <h1>Shopkeeper Dashboard</h1>


      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="customer"
          placeholder="Customer ID"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Send Request
        </button>

      </form>


      <hr />


      <h2>Transactions</h2>


      {
        transactions.map((tx) => (

          <div
            key={tx._id}
            style={{
              border: "1px solid white",
              padding: "10px",
              marginBottom: "10px",
            }}
          >

            <p>
              Customer:
              {" "}
              {tx.customer?.name}
            </p>

            <p>
              Item:
              {" "}
              {tx.itemName}
            </p>

            <p>
              Amount:
              {" "}
              ₹{tx.amount}
            </p>

            <p>
              Status:
              {" "}
              {tx.status}
            </p>

          </div>

        ))
      }

    </div>
  );
}

export default ShopkeeperDashboard;