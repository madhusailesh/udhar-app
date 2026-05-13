import { useEffect, useState } from "react";

import {
  addLedgerEntry,
  getShopkeeperLedgers,
} from "../services/ledgerService";

function ShopkeeperDashboard() {

  const [ledgers, setLedgers] = useState([]);

  const [formData, setFormData] = useState({
    customer: "",
    type: "credit",
    amount: "",
    note: "",
  });


  // FETCH LEDGERS
  const fetchLedgers = async () => {

    try {

      const data = await getShopkeeperLedgers();

      setLedgers(data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    fetchLedgers();

  }, []);




  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };




  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addLedgerEntry(formData);

      alert("Entry Added");

      fetchLedgers();

    } catch (error) {

      console.log(error);

      alert("Failed");

    }
  };




  return (
    <div>

      <h1 className="text-4xl font-bold text-blue-500">
  Shopkeeper Dashboard
</h1>


      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="customer"
          placeholder="Customer ID"
          onChange={handleChange}
        />

        <br /><br />


        <select
          name="type"
          onChange={handleChange}
        >

          <option value="credit">
            Udhar Add
          </option>

          <option value="debit">
            Payment Received
          </option>

        </select>

        <br /><br />


        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
        />

        <br /><br />


        <input
          type="text"
          name="note"
          placeholder="Note"
          onChange={handleChange}
        />

        <br /><br />


        <button type="submit">
          Add Entry
        </button>

      </form>


      <hr />


      <h2>Customer Ledgers</h2>


      {
        ledgers.map((ledger) => (

          <div
            key={ledger._id}
            style={{
              border: "1px solid white",
              padding: "10px",
              marginBottom: "20px",
            }}
          >

            <h3>
              {ledger.customer?.name}
            </h3>

            <p>
              Email:
              {" "}
              {ledger.customer?.email}
            </p>

            <p>
              Total Pending:
              {" "}
              ₹{ledger.totalBalance}
            </p>


            <h4>Entries</h4>


            {
              ledger.entries.map((entry, index) => (

                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                    paddingLeft: "10px",
                  }}
                >

                  <p>
                    Type:
                    {" "}
                    {entry.type}
                  </p>

                  <p>
                    Amount:
                    {" "}
                    ₹{entry.amount}
                  </p>

                  <p>
                    Note:
                    {" "}
                    {entry.note}
                  </p>

                </div>

              ))
            }

          </div>

        ))
      }

    </div>
  );
}

export default ShopkeeperDashboard;