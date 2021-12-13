import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Timeline from "./Timeline";
import Post from "./Post";
import {
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import Header from "./Header";

const Home = () => {
  // const navigate = useNavigate();
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
      {/* <Box display="block" pos="absolute" textAlign="center">
        <Text fontSize="4xl">Welcome</Text>
        <Text fontSize="xl">Here you can freely connect to friends</Text>
        <Text fontSize="lg">share your awesome posts</Text>
      </Box> */}
      <Header />
      {!state.logInReducer.token ? (
        <div className="home">
          {logged ? (
            <>
              <Register />
              <Text>
                Do you already have an account?
                <Button onClick={(e) => setLogged(false)}>Log In</Button>
              </Text>
            </>
          ) : (
            <>
              <Login />
              <Text>
                You don't have an account yet?
                <Button
                  m="8px"
                  onClick={(e) => {
                    setLogged(true);
                  }}
                >
                  Register Here
                </Button>
              </Text>
            </>
          )}
        </div>
      ) : (
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Timeline />} />
          <Route exact path="/postPage/:id" element={<Post />} />
        </Routes>
      )}
    </Box>
  );
};

export default Home;
