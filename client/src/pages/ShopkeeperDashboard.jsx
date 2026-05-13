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
  <div className="min-h-screen bg-gray-900 text-white p-6">

    <h1 className="text-4xl font-bold mb-8">
      Shopkeeper Dashboard
    </h1>


    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-xl mb-10"
    >

      <h2 className="text-2xl mb-6">
        Add Ledger Entry
      </h2>


      <input
        type="text"
        name="customer"
        placeholder="Customer ID"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-700 mb-4"
      />


      <select
        name="type"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-700 mb-4"
      >

        <option value="credit">
          Udhar Add
        </option>

        <option value="debit">
          Payment Received
        </option>

      </select>


      <input
        type="number"
        name="amount"
        placeholder="Amount"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-700 mb-4"
      />


      <input
        type="text"
        name="note"
        placeholder="Note"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-700 mb-4"
      />


      <button
        type="submit"
        className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Add Entry
      </button>

    </form>



    {/* LEDGERS */}
    <div className="grid md:grid-cols-2 gap-6">

      {
        ledgers.map((ledger) => (

          <div
            key={ledger._id}
            className="bg-gray-800 p-6 rounded-xl"
          >

            <h2 className="text-2xl font-semibold mb-2">
              {ledger.customer?.name}
            </h2>

            <p className="text-gray-400 mb-2">
              {ledger.customer?.email}
            </p>

            <p className="text-xl mb-4">
              Pending:
              {" "}
              <span className="text-red-400">
                ₹{ledger.totalBalance}
              </span>
            </p>


            <div className="space-y-3">

              {
                ledger.entries.map((entry, index) => (

                  <div
                    key={index}
                    className="bg-gray-700 p-3 rounded-lg"
                  >

                    <p>
                      Type:
                      {" "}
                      <span className={
                        entry.type === "credit"
                          ? "text-red-400"
                          : "text-green-400"
                      }>
                        {entry.type}
                      </span>
                    </p>

                    <p>
                      ₹{entry.amount}
                    </p>

                    <p className="text-gray-300">
                      {entry.note}
                    </p>

                  </div>

                ))
              }

            </div>

          </div>

        ))
      }

    </div>

  </div>
);
}

export default ShopkeeperDashboard;