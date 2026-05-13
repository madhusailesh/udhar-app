import { useEffect, useState } from "react";

import socket from "../socket/socket";

import {
  getCustomerLedgers,
} from "../services/ledgerService";

import Navbar from "../components/Navbar";

function CustomerDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [ledgers, setLedgers] = useState([]);




  // FETCH LEDGERS
  const fetchLedgers = async () => {

    try {

      const data = await getCustomerLedgers();

      setLedgers(data);

    } catch (error) {

      console.log(error);

    }
  };




  useEffect(() => {

    socket.emit("registerUser", user._id);

    fetchLedgers();


    socket.on("new_udhar_request", () => {

      fetchLedgers();

    });


    return () => {
      socket.off("new_udhar_request");
    };

  }, []);




  return (
    <>

      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">

        <h1 className="text-4xl font-bold mb-8">
          Customer Dashboard
        </h1>


        <div className="grid md:grid-cols-2 gap-6">

          {
            ledgers.map((ledger) => (

              <div
                key={ledger._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >

                <h2 className="text-2xl font-semibold mb-2">
                  {ledger.shopkeeper?.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  {ledger.shopkeeper?.email}
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

export default CustomerDashboard;