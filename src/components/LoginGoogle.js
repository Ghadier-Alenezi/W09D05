import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { login } from "../reducers/login";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Divider, Stack, Text } from "@chakra-ui/react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseSuccessGoogle = (response) => {
    // console.log(response);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/googlelogin`, {
        tokenId: response.tokenId,
      })
      .then((result) => {
        console.log("responseSuccessGoogle", result);
        console.log("user", result.data.result);
        console.log("token", result.data.token);
        dispatch(
          login({
            token: response.tokenId,
            userId: response.profileObj.googleId,
            userEmail: response.profileObj.email,
            userName: response.profileObj.givenName,
            userAvatar: response.profileObj.imageUrl,
          })
        );
        navigate("/");
      })
      .then((res) => {
        console.log("Google Login success", res);
      });
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  // data : {
  //   token: response.tokenId,
  //   userId: response.profileObj.googleId,
  //   userEmail: response.profileObj.email,
  //   userName: response.profileObj.givenName,
  //   userAvatar: response.profileObj.imageUrl,
  // }

  return (
    <Stack p="10px" mt="5px">
      <Divider height="10px" />
      <Text>Login with google?</Text>

      <GoogleLogin
        clientId="801305115124-kp5gtb7a2f1ej1e2bgi7gqrh1iio4l9t.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </Stack>
  );
};

export default LoginGoogle;
