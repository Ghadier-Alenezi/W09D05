import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "./LoginGoogle";
import { login } from "../reducers/login";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Divider,
  Heading,
  Stack,
  InputRightElement,
  InputGroup,
  Text,
} from "@chakra-ui/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
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
      // console.log(result.data.result.avatar);

      const data = {
        token: result.data.token,
        userId: result.data.result._id,
        userEmail: result.data.result.email,
        userName: result.data.result.userName,
        userAvatar: result.data.result.avatar
      };
      // console.log(data);

      dispatch(login(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack boxShadow="2xl" p="6" rounded="md" bg="white">
        <Heading>Please Login</Heading>
        <Divider height="30px" color="white" />
        <FormControl id="email" isRequired>
          <FormLabel m="8px">Enter you Email or User Name to log in</FormLabel>

          <Input
            type="email"
            placeholder="email"
            autoComplete="off"
            value={userInput}
            onChange={(e) => {
              setuserInput(e.target.value);
            }}
          />

          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl id="password" isRequired>
          <Divider height="30px" />
          <FormLabel m="8px">Enter your Password</FormLabel>
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
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {" "}
                show
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>Keep it secret.</FormHelperText>
        </FormControl>
        <Divider height="20px" />
        <Button m="8px" onClick={signIn}>
          {" "}
          Sign in
        </Button>
        <LoginGoogle />
      </Stack>
    </>
  );
};

export default Login;
