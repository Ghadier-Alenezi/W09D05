import React, { useState } from "react";
import axios from "axios";
import LoginGoogle from "./LoginGoogle";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/login";

import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  Input,
  Button,
  Divider,
  Box,
  Heading,
  Stack,
  InputRightElement,
  InputGroup,
  Center,
} from "@chakra-ui/react";
import PasswordChecklist from "react-password-checklist";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  const signUp = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/register`, {
        userName,
        email,
        password,
      });
      console.log(result);
      if (result.status === 200) navigate("/verifyEmail");
      else setMessage("there is somthing wrong!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack boxShadow="2xl" p="6" rounded="md" bg="white">
        <Box>
          <Heading>PLease Sign Up</Heading>
          <Divider height="30px" color="white" />
          <FormControl isRequired>
            <FormLabel m="8px">Your User Name</FormLabel>
            <Input
              type="name"
              placeholder="user name"
              autoComplete="off"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m="8px">Your Email</FormLabel>
            <Input
              type="email"
              placeholder="email"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m="8px">Your Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                autoComplete="off"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement width="4rem">
                <Button
                  height="1.7rem"
                  mr="3"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {" "}
                  show
                </Button>
              </InputRightElement>
            </InputGroup>
            <PasswordChecklist
              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "lowercase",
              ]}
              minLength={6}
              value={password}
              onChange={(isValid) => {
                if (isValid) {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = false;
                } else {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = true;
                }
              }}
            />
          </FormControl>
          <Center>
            {" "}
            <Button id="signupSubmitButton" onClick={signUp}>
              {" "}
              Sign Up
            </Button>
          </Center>

          <LoginGoogle />
        </Box>
      </Stack>
    </>
  );
};

export default Register;
