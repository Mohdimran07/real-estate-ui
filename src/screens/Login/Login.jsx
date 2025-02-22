import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./login.scss";
import { BASE_URL } from "../../constants";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const resp = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are included in the request
        body: JSON.stringify({ email, password }),
      });
      const responsedata = await resp.json();
      console.log("login response: ", responsedata);
      const { data } = responsedata;
      console.log(data)
      setIsLoading(false);
        updateUser(data);
      navigate("/");
    } catch (error) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <h1>Welcome back</h1>
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/login1.avif" alt="" />
      </div>
    </div>
  );
};

export default Login;
