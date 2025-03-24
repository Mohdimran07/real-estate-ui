import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./register.scss";
import { registerUser } from "../../services/apiService";
import { showToast } from "../../components/toast/Toast";

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const name = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(name, email, password);
    if (!name || !email || !password) {
      showToast("Please fill all the fields", "warn");
      return;
    }

    try {
      const response = await registerUser({ name, email, password });
      if (!response.error) {
        showToast(response.message, "success");
        navigate("/login");
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Failed to register", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/register.avif" alt="" />
      </div>
    </div>
  );
};

export default Register;
