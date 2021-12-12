import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { Divider, Stack, Text } from "@chakra-ui/react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginGoogle = () => {
  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: `${BASE_URL}/api/googlelogin`,
      data: { tokenId: response.tokenId },
    }).then((res) => {
      console.log("Google Login success", res);
    });
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };
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
