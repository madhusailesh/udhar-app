import { useEffect, useState } from "react";

import {
  addLedgerEntry,
  getShopkeeperLedgers,
} from "../services/ledgerService";

import { searchCustomers } from "../services/authService";

import Navbar from "../components/Navbar";

function ShopkeeperDashboard() {

  const [ledgers, setLedgers] = useState([]);

  const [customers, setCustomers] = useState([]);

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




  // SEARCH CUSTOMER
  const handleSearch = async (e) => {

    const value = e.target.value;

    try {

      const data = await searchCustomers(value);

      setCustomers(data);

    } catch (error) {

      console.log(error);

    }
  };




  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addLedgerEntry(formData);

      alert("Entry Added");

      setFormData({
        customer: "",
        type: "credit",
        amount: "",
        note: "",
      });

      fetchLedgers();

    } catch (error) {

      console.log(error);

      alert("Failed");

    }
  };




  return (
    <>

      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">

        <h1 className="text-4xl font-bold mb-8">
          Shopkeeper Dashboard
        </h1>



        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-10 shadow-lg"
        >

          <h2 className="text-2xl mb-6">
            Add Ledger Entry
          </h2>



          {/* SEARCH CUSTOMER */}
          <input
            type="text"
            placeholder="Search Customer Email"
            onChange={handleSearch}
            className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4 outline-none"
          />



          {/* SELECT CUSTOMER */}
          <select
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4 outline-none"
          >

            <option value="">
              Select Customer
            </option>

            {
              customers.map((customer) => (

                <option
                  key={customer._id}
                  value={customer._id}
                >
                  {customer.name}
                  {" - "}
                  {customer.email}
                </option>

              ))
            }

          </select>




          {/* TYPE */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4 outline-none"
          >

            <option value="credit">
              Udhar Add
            </option>

            <option value="debit">
              Payment Received
            </option>

          </select>




          {/* AMOUNT */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4 outline-none"
          />




          {/* NOTE */}
          <input
            type="text"
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4 outline-none"
          />




          <button
            type="submit"
            className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition"
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
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >

                <h2 className="text-2xl font-semibold mb-2">
                  {ledger.customer?.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  {ledger.customer?.email}
                </p>

                <p className="text-xl mb-4">
                  Pending:
                  {" "}
                  <span className="text-red-500">
                    ₹{ledger.totalBalance}
                  </span>
                </p>



                <div className="space-y-3">

                  {
                    ledger.entries.map((entry, index) => (

                      <div
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                      >

                        <p>
                          Type:
                          {" "}
                          <span
                            className={
                              entry.type === "credit"
                                ? "text-red-500"
                                : "text-green-500"
                            }
                          >
                            {entry.type}
                          </span>
                        </p>

                        <p>
                          ₹{entry.amount}
                        </p>

                        <p className="text-gray-600 dark:text-gray-300">
                          {entry.note}
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                          {
                            new Date(
                              entry.createdAt
                            ).toLocaleString()
                          }
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

    </>
  );
}

export default ShopkeeperDashboard;