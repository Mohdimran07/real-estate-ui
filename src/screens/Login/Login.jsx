import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./login.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { showToast } from "../../components/toast/Toast";
import { loginUser } from "../../services/apiService";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      showToast("Please fill all the fields", "warn");
      return;
    }

    try {
      const responsedata = await loginUser({ email, password });

      if (responsedata.error) {
        console.log(responsedata.error);
        showToast(responsedata.message, "error");
        setIsLoading(false);
        return;
      }
      const { data } = responsedata;
      setIsLoading(false);
      showToast("Login Successful", "success");
      updateUser(data);
      navigate("/");
    } catch (error) {
      setError("Something went wrong");
      toast.error("Login Failed");
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
