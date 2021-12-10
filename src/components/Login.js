import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "./../reducers/login.js";
import { useSelector, useDispatch } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  const [userInput, setuserInput] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/login`,
        {
          userInput,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      // console.log(result.data.result.email);
      const data = {
        token: result.data.token,
        userId: result.data.result._id,
        userEmail: result.data.result.email
      };
      // console.log(data);

      dispatch(login(data));
    } catch (error) {
      console.log(error);
    }
  };

  const toRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <h2>Please Login</h2>
      <hr />
      <br />
      <h3>Enter you Email or User Name to log in</h3>
      <input
        type="email"
        placeholder="email"
        value={userInput}
        onChange={(e) => {
          setuserInput(e.target.value);
        }}
      />
      <hr />
      <br />
      <h3>Enter your Password</h3>
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
      <button onClick={signIn}> Sign in</button>
      <hr />
      <br />
      <h3>You don't have account yet?</h3>
      <button onClick={toRegister}>Sign Up Now</button>
    </>
  );
};

export default Login;
