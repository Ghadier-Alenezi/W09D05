import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image, Center, HStack, Box, Text } from "@chakra-ui/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Profile = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);

  const state = useSelector((state) => {
    return state;
  });

  const userPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/userPost`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      setPosts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userPosts();
  }, []);

  return (
    <>
      {state && (
        <>
          <Box
            maxW="75%"
            borderWidth="1px"
            boxShadow="2xl"
            p="6"
            m="5"
            rounded="md"
            bg="white"
          >
            <Box display="flex">
              {" "}
              <Image
                borderRadius="md"
                src={avatar}
                alt="avatarImg"
                borderRadius="50%"
                boxSize="150px"
                src={state.logInReducer.userAvatar}
              />
            </Box>
            <Box>
              <Text>User Name:</Text>
              <Text>{state.logInReducer.userName}</Text>
              <Text>User Email:</Text>
              <Text>{state.logInReducer.userEmail}</Text>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Profile;
