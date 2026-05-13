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
    <div>

      <h1>Customer Dashboard</h1>


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

            <h2>
              {ledger.shopkeeper?.name}
            </h2>

            <p>
              Shop Email:
              {" "}
              {ledger.shopkeeper?.email}
            </p>

            <p>
              Total Pending:
              {" "}
              ₹{ledger.totalBalance}
            </p>


            <h3>History</h3>


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

export default CustomerDashboard;