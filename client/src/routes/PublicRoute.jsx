import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );




  // NOT LOGGED IN
  if (!token || !user) {

    return children;

  }




  // SHOPKEEPER
  if (user.role === "shopkeeper") {

    return (
      <Navigate to="/shopkeeper" />
    );

  }




  // CUSTOMER
  if (user.role === "customer") {

    return (
      <Navigate to="/customer" />
    );

  }




  return children;
}

export default PublicRoute;