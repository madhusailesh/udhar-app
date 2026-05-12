import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await loginUser(formData);

      console.log(data);


      // SAVE TOKEN
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      alert("Login Successful");


      // ROLE BASED REDIRECT
      if (data.user.role === "shopkeeper") {

        navigate("/shopkeeper");

      } else {

        navigate("/customer");

      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };


  return (
    <div>

      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;