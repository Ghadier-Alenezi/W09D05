import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Timeline from "./Timeline";
import Post from "./Post";
import Profile from "./Profile";
import { Box, Text, Button, Stack, Heading } from "@chakra-ui/react";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState("");
  const [logged, setLogged] = useState(false);

  const state = useSelector((state) => {
    return state;
  });
  // console.log(state.logInReducer.token);

  const getPosts = async () => {
    try {
      const posts = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      return setPosts(posts.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(posts);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box m={0} p={0}>
      <Box p="5">
        <Heading size="lg">Thoughts</Heading>
      </Box>
      {!state.logInReducer.token ? (
        <>
          {logged ? (
            <>
              <Stack>
                <Register />
                <Text pt="4">
                  Do you already have an account?
                  <Button m="8px" pl="4" onClick={(e) => setLogged(false)}>
                    Log In
                  </Button>
                </Text>
              </Stack>
            </>
          ) : (
            <>
              <Stack>
                <Login />
                <Text>
                  You don't have an account yet?
                  <Button
                    m="8px"
                    pl="4"
                    onClick={(e) => {
                      setLogged(true);
                    }}
                  >
                    Register Here
                  </Button>
                </Text>
              </Stack>
            </>
          )}
        </>
      ) : (
        <Routes>
          <Route exact path="/" element={<Timeline />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/postPage/:id" element={<Post />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      )}
    </Box>
  );
};

export default Home;
