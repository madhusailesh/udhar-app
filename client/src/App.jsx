import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import ShopkeeperDashboard from "./pages/ShopkeeperDashboard";

import CustomerDashboard from "./pages/CustomerDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />




        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />




        {/* SIGNUP */}
        <Route
          path="/signup"
          element={<Signup />}
        />




        {/* SHOPKEEPER */}
        <Route
          path="/shopkeeper"
          element={
            <ProtectedRoute>

              <ShopkeeperDashboard />

            </ProtectedRoute>
          }
        />




        {/* CUSTOMER */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute>

              <CustomerDashboard />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );

}

export default App;