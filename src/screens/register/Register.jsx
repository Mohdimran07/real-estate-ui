import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./register.scss";
import { BASE_URL } from "../../constants";

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

    try {
      const resp = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are included in the request
        body: JSON.stringify({ name, email, password }),
      });
      const data = await resp.json();
      console.log(data);
      if (data.error) {
        setIsLoading(false);
        setError(data.message);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      // setError(error);
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
