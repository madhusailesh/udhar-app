import { useEffect, useState } from "react";

import { getShopkeeperLedgers } from "../services/ledgerService";

import { createPendingRequest } from "../services/pendingRequestService";

import { searchCustomers } from "../services/authService";

import Navbar from "../components/Navbar";

import socket from "../socket/socket";

function ShopkeeperDashboard() {

  const [ledgers, setLedgers] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    customer: "",
    type: "credit",
    amount: "",
    note: "",
  });




  // TOAST STATE
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });




  // SHOW TOAST
  const showToast = (message, type) => {

    setToast({
      show: true,
      message,
      type,
    });




    setTimeout(() => {

      setToast({
        show: false,
        message: "",
        type: "",
      });

    }, 3000);

  };




  // FETCH LEDGERS
  const fetchLedgers = async () => {

    try {

      const data =
        await getShopkeeperLedgers();

      setLedgers(data);

    } catch (error) {

      console.log(error);

    }

  };




  // REALTIME SOCKETS
  useEffect(() => {

    fetchLedgers();




    // CUSTOMER APPROVED
    socket.on("ledger_updated", () => {

      fetchLedgers();

      showToast(
        "Customer approved request!",
        "success"
      );

    });




    // CUSTOMER REJECTED
    socket.on("request_rejected", () => {

      showToast(
        "Customer rejected request",
        "error"
      );

    });




    return () => {

      socket.off("ledger_updated");

      socket.off("request_rejected");

    };

  }, []);




  // HANDLE INPUT CHANGE
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

      const data =
        await searchCustomers(value);

      setCustomers(data);

    } catch (error) {

      console.log(error);

    }

  };




  // SEND REQUEST
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createPendingRequest(formData);

      showToast(
        "Request Sent To Customer!",
        "success"
      );




      setFormData({
        customer: "",
        type: "credit",
        amount: "",
        note: "",
      });




      fetchLedgers();

    } catch (error) {

      console.log(error);

      showToast(
        "Failed to send request",
        "error"
      );

    }

  };




  return (
    <>

      <Navbar />




      <div className="relative min-h-screen w-full bg-gray-50 p-4 transition-colors duration-300 dark:bg-gray-950 md:p-6 lg:p-8">

        <div className="mx-auto max-w-7xl">




          {/* HEADER */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
              Shopkeeper Dashboard
            </h1>




            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-300">

              Active Khata:
              {" "}

              <span className="text-blue-500">
                {ledgers.length}
              </span>

            </div>

          </div>





          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all dark:border-gray-800 dark:bg-gray-900/80 md:p-8"
          >

            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">

              <span className="text-blue-500">
                ✍️
              </span>

              Send Approval Request

            </h2>




            {/* SEARCH */}
            <div className="mb-5">

              <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
                Search Customer
              </label>

              <input
                type="text"
                placeholder="Type Email to search..."
                onChange={handleSearch}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
              />

            </div>




            <div className="mb-6 grid gap-5 md:grid-cols-2">




              {/* SELECT CUSTOMER */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Select Customer
                </label>

                <select
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
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

              </div>




              {/* TYPE */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Transaction Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
                >

                  <option value="credit">
                    Udhar Request
                  </option>

                  <option value="debit">
                    Payment Update
                  </option>

                </select>

              </div>




              {/* AMOUNT */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Amount (₹)
                </label>

                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
                />

              </div>




              {/* NOTE */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Note / Item Details
                </label>

                <input
                  type="text"
                  name="note"
                  placeholder="What was purchased?"
                  value={formData.note}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
                />

              </div>

            </div>




            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-indigo-500/30 active:scale-[0.98] md:w-auto md:px-10"
            >
              Send Request
            </button>

          </form>





          {/* LEDGER TITLE */}
          <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
            Customer Khata List
          </h2>





          {/* EMPTY */}
          {
            ledgers.length === 0 && (

              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white/50 py-16 dark:border-gray-700 dark:bg-gray-800/50">

                <span className="mb-3 text-5xl">
                  📋
                </span>

                <p className="text-gray-500 dark:text-gray-400">
                  Abhi tak koi approved udhar entry nahi hai.
                </p>

              </div>

            )
          }






          {/* LEDGER GRID */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

            {
              ledgers.map((ledger) => (

                <div
                  key={ledger._id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/80"
                >




                  {/* CUSTOMER */}
                  <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">

                    <div>

                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {ledger.customer?.name}
                      </h2>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {ledger.customer?.email}
                      </p>

                    </div>




                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">

                      {
                        ledger.customer?.name
                          ?.charAt(0)
                          .toUpperCase() || "C"
                      }

                    </div>

                  </div>





                  {/* BALANCE */}
                  <div className="mb-6 rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-800/50">

                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Pending Udhar
                    </p>

                    <p className="text-3xl font-black tracking-tight text-red-500 dark:text-red-400">

                      ₹{
                        ledger.totalBalance?.toLocaleString(
                          "en-IN"
                        )
                      }

                    </p>

                  </div>





                  {/* ENTRIES */}
                  <div className="flex-1">

                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Approved Entries
                    </h3>




                    <div className="max-h-60 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">

                      {
                        ledger.entries?.length > 0
                          ? (
                            ledger.entries.map(
                              (entry, index) => (

                                <div
                                  key={index}
                                  className="flex items-center justify-between rounded-xl border border-gray-50 bg-white p-3 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800 dark:hover:bg-gray-700/80"
                                >

                                  <div className="flex flex-col">

                                    <span className="text-base font-bold text-gray-800 dark:text-gray-200">

                                      ₹{
                                        entry.amount?.toLocaleString(
                                          "en-IN"
                                        )
                                      }

                                    </span>

                                    <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">

                                      {
                                        entry.note ||
                                        "No details"
                                      }

                                    </span>

                                    <span className="mt-1 text-[10px] text-gray-400">

                                      {
                                        new Date(
                                          entry.createdAt
                                        ).toLocaleDateString(
                                          "en-IN",
                                          {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                          }
                                        )
                                      }

                                    </span>

                                  </div>




                                  <span
                                    className={`flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                                      entry.type === "credit"
                                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                        : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                    }`}
                                  >

                                    {
                                      entry.type ===
                                      "credit"
                                        ? "Udhar"
                                        : "Paid"
                                    }

                                  </span>

                                </div>

                              )
                            )
                          )
                          : (
                            <p className="text-center text-sm text-gray-400">
                              No transactions yet.
                            </p>
                          )
                      }

                    </div>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>





      {/* TOAST */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex max-w-sm transform items-center gap-4 rounded-2xl p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-in-out sm:bottom-10 sm:right-10 ${
          toast.show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-12 opacity-0"
        } ${
          toast.type === "success"
            ? "border border-green-200 bg-green-50/90 text-green-800 dark:border-green-800 dark:bg-green-900/80 dark:text-green-100"
            : "border border-red-200 bg-red-50/90 text-red-800 dark:border-red-800 dark:bg-red-900/80 dark:text-red-100"
        }`}
      >

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/50 text-2xl shadow-inner dark:bg-black/20">

          {
            toast.type === "success"
              ? "🎉"
              : "⚠️"
          }

        </div>




        <div className="flex flex-col">

          <p className="text-sm font-bold">

            {
              toast.type === "success"
                ? "Success!"
                : "Error"
            }

          </p>

          <p className="text-sm font-medium opacity-90">
            {toast.message}
          </p>

        </div>

      </div>

    </>
  );
}

export default ShopkeeperDashboard;