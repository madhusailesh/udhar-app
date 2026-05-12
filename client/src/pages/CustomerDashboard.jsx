import { useEffect } from "react";
import socket from "../socket/socket";

function CustomerDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    // REGISTER CUSTOMER
    socket.emit("registerUser", user._id);


    // LISTEN FOR REQUEST
    socket.on("new_udhar_request", (data) => {

      console.log("NEW REQUEST:", data);

      alert(`New Udhar Request ₹${data.transaction.amount}`);

    });


    return () => {
      socket.off("new_udhar_request");
    };

  }, []);


  return (
    <div>
      <h1>Customer Dashboard</h1>
    </div>
  );
}

export default CustomerDashboard;