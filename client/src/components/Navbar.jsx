import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );



  // APPLY THEME
  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");

    } else {

      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");

    }

  }, [darkMode]);




  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };




  return (
    <div className="bg-gray-800 dark:bg-gray-950 text-white p-4 flex justify-between items-center rounded-xl mb-6">

      <div>

        <h1 className="text-2xl font-bold">
          Udhar App
        </h1>

      </div>



      <div className="flex items-center gap-4">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          {
            darkMode
              ? "☀ Light"
              : "🌙 Dark"
          }
        </button>



        <div>

          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-gray-400">
            {user?.role}
          </p>

        </div>



        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;