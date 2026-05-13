import { useEffect, useState } from "react";

import socket from "../socket/socket";

import {
  getPendingRequests,
  approveRequest,
  rejectRequest,
} from "../services/transactionService";

function CustomerDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [requests, setRequests] = useState([]);


  // FETCH REQUESTS
  const fetchRequests = async () => {

    try {

      const data = await getPendingRequests();

      setRequests(data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    // REGISTER USER
    socket.emit("registerUser", user._id);


    // INITIAL FETCH
    fetchRequests();


    // REALTIME LISTENER
    socket.on("new_udhar_request", (data) => {

      console.log(data);

      alert(`New Request ₹${data.transaction.amount}`);

      fetchRequests();

    });


    return () => {
      socket.off("new_udhar_request");
    };

  }, []);




  // APPROVE
  const handleApprove = async (id) => {

    try {

      await approveRequest(id);

      alert("Approved");

      fetchRequests();

    } catch (error) {

      console.log(error);

    }
  };




  // REJECT
  const handleReject = async (id) => {

    try {

      await rejectRequest(id);

      alert("Rejected");

      fetchRequests();

    } catch (error) {

      console.log(error);

    }
  };



  return (
    <div>

      <h1>Customer Dashboard</h1>

      <h2>Pending Requests</h2>


      {
        requests.map((req) => (

          <div
            key={req._id}
            style={{
              border: "1px solid white",
              padding: "10px",
              marginBottom: "10px",
            }}
          >

            <p>
              Shopkeeper:
              {" "}
              {req.shopkeeper?.name}
            </p>

            <p>
              Item:
              {" "}
              {req.itemName}
            </p>

            <p>
              Amount:
              {" "}
              ₹{req.amount}
            </p>


            <button
              onClick={() => handleApprove(req._id)}
            >
              Approve
            </button>

            {" "}

            <button
              onClick={() => handleReject(req._id)}
            >
              Reject
            </button>

          </div>

        ))
      }

    </div>
  );
}

export default CustomerDashboard;