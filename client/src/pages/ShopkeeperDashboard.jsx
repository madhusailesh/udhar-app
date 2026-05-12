import { useState } from "react";
import { createTransaction } from "../services/transactionService";

function ShopkeeperDashboard() {

  const [formData, setFormData] = useState({
    customer: "",
    itemName: "",
    amount: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await createTransaction(formData);

      console.log(data);

      alert("Udhar Request Sent");

    } catch (error) {

      console.log(error.response.data);

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

    </div>
  );
}

export default ShopkeeperDashboard;