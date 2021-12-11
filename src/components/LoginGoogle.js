import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

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
    <div>
      <h1>Login with google?</h1>
      <GoogleLogin
        clientId="801305115124-kp5gtb7a2f1ej1e2bgi7gqrh1iio4l9t.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginGoogle;
