import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "../sass/LoginForm.scss";

export default function LoginForm() {
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function navigateUser() {
    navigate("/user");
  }

  useEffect(() => {
    isLoggedIn && navigate("/user");
  }, [isLoggedIn, navigate]);

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <div className="flex-container">
      <div className="login_container">
        <h3 className="logo">TouristInn</h3>
        <br />
        <h1>Login</h1>
        <br />
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <br />
          <br />
          <button
            className="loginBtn"
            onClick={() => {
              dispatch(loginThunk(credential)).then(navigateUser);
            }}
          >
            Login
          </button>
          <button className="cancelBtn" onClick={() => navigate("/")}>
            Cancel
          </button>
          <br />
          <br />
          <button className="signupBtn" onClick={() => navigate("/register")}>
            Not Registered? Signup Here
          </button>
        </div>
      </div>
    </div>
  );
}
