import { useEffect, useState } from "react";

import socket from "../socket/socket";

import {
  getCustomerLedgers,
} from "../services/ledgerService";

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

    // REGISTER SOCKET
    socket.emit("registerUser", user._id);


    // INITIAL FETCH
    fetchLedgers();


    // REALTIME UPDATE
    socket.on("new_udhar_request", () => {

      fetchLedgers();

    });


    return () => {
      socket.off("new_udhar_request");
    };

  }, []);




 return (
  <div className="min-h-screen bg-gray-900 text-white p-6">

    <h1 className="text-4xl font-bold mb-8">
      Customer Dashboard
    </h1>


    <div className="grid md:grid-cols-2 gap-6">

      {
        ledgers.map((ledger) => (

          <div
            key={ledger._id}
            className="bg-gray-800 p-6 rounded-xl"
          >

            <h2 className="text-2xl font-semibold mb-2">
              {ledger.shopkeeper?.name}
            </h2>

            <p className="text-gray-400 mb-2">
              {ledger.shopkeeper?.email}
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

export default CustomerDashboard;