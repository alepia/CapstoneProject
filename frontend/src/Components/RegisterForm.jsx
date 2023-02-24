import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { signupThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "../sass/LoginForm.scss";

export default function RegisterForm() {

  const [credential, setCredential] = useState({
    username: "",
    password: "",
    name: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


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
        <h1>Register</h1>
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
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
          <br />
          <br />
          <button
            className="loginBtn"
            onClick={() => {
              dispatch(signupThunk(credential)).then(() => navigate("/login"));
            }}
          >
            Register
          </button>
          <button className="cancelBtn" onClick={() => navigate("/")}>Cancel</button>
          <br />
          <br />
          <button className="signupBtn" onClick={() => navigate("/login")}>Already a member? Sign in here</button>
        </div>
      </div>
    </div>
  );
}
