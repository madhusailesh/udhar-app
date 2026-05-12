import { useState } from "react";
import { signupUser } from "../services/authService";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
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

      const data = await signupUser(formData);

      console.log(data);

      alert("Signup Successful");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");

    }
  };


  return (
    <div>

      <h1>Signup Page</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br /><br />

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

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="customer">
            Customer
          </option>

          <option value="shopkeeper">
            Shopkeeper
          </option>
        </select>

        <br /><br />

        <button type="submit">
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;