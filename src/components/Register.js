import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [avatar, setAvatar] = useState("")
  const [message, setMessage] = useState("");

  const [role, setRole] = useState("61a750d07acff210a70d2b8c");
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/register`, {
        userName,
        email,
        password,
        role,
      });
      console.log(result);
      if (result.status === 200) navigate("/verifyEmail");
      else setMessage("there is somthin wrong!");
    } catch (error) {
      console.log(error);
    }
  };

  const toLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <h2>Sign Up</h2>
      <hr />
      <br />
      <h3>Your User Name</h3>
      <input
        type="name"
        placeholder="user name"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <h3>Your Email</h3>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <h3>Your Password</h3>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <hr />
      <br />
      <button onClick={signUp}> Sign Up</button>
      <hr />
      <br />
      <h3>Do you have an account?</h3>
      <button onClick={toLogin}>Sign in here</button>
    </>
  );
};

export default Register;
