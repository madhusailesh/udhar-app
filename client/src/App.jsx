import { useEffect } from "react";
import socket from "./socket/socket";

function App() {

  // TEMP CUSTOMER ID
  const userId = "6a00cef539435911507962a1";


  useEffect(() => {

    // REGISTER USER
    socket.emit("registerUser", userId);


    // LISTEN FOR NEW REQUEST
    socket.on("new_udhar_request", (data) => {

      console.log("NEW REQUEST:", data);

      alert(`New Udhar Request: ₹${data.transaction.amount}`);

    });


    return () => {
      socket.off("new_udhar_request");
    };

  }, []);


  return (
    <div>
      <h1>Realtime Udhar System 🔥</h1>
    </div>
  );
}

export default App;