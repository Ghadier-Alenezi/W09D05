import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const { password } = this.state;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [newpassword, setPassword] = useState("");
  // const [avatar, setAvatar] = useState("")
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <>
      <Stack boxShadow="2xl" p="6" rounded="md" bg="white">
        <Heading>Sign Up</Heading>
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
          <FormHelperText>Pic a unique user name.</FormHelperText>
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
          <FormHelperText>We'll never share your email.</FormHelperText>
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
        <Button onClick={signUp}> Sign Up</Button>
      </Stack>
    </>
  );
};

export default Register;
