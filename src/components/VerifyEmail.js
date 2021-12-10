import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const [otp, setotp] = useState("");

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });
  //   console.log(state);

  const verifyEmail = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/verifyEmail`, {
        userId,
        otp,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  verifyEmail();

  return (
    <>
      <h3>Enter the code to Verify your account</h3>
      <h3>Your Email</h3>
      <input
        type="email"
        placeholder="email"
        value={userId}
        onChange={(e) => {
          setuserId(e.target.value);
        }}
      />
      <h3>Your verification code</h3>
      <input
        type="number"
        placeholder="verfication code"
        value={otp}
        maxLength={4}
        onChange={(e) => {
          setotp(e.target.value);
        }}
      />
      <hr />
      <br />
      <button onClick={verifyEmail}> Verify Now</button>
    </>
  );
};

export default VerifyEmail;
