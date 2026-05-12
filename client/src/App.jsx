import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShopkeeperDashboard from "./pages/ShopkeeperDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/shopkeeper"
          element={<ShopkeeperDashboard />}
        />

        <Route
          path="/customer"
          element={<CustomerDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;