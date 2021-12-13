import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Box,
  Image,
  Text,
  Center,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { BsFillChatSquareDotsFill, BsFillHeartFill } from "react-icons/bs";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Timeline = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  const state = useSelector((state) => {
    return state;
  });

  // this timeline contain all posts of all users
  const getPosts = async () => {
    const result = await axios.get(`${BASE_URL}/posts`);
    setPosts(result.data);
  };
  // console.log(posts);

  // too the post page
  const onePost = (id) =>{
    navigate(`/postPage/${id}`)
  }
  return (
    <>
      {posts && posts.length
        ? posts.map((ele) => {
            return (
              <Center key={ele._id}>
                <Box
                  p="5"
                  maxW="60%"
                  borderWidth="1px"
                  boxShadow="2xl"
                  p="6"
                  rounded="md"
                  bg="white"
                  onClick={()=>{
                    onePost(ele._id)
                  }}
                >
                  <Text
                    mt={2}
                    fontSize="xl"
                    fontWeight="semibold"
                    lineHeight="short"
                    textAlign="center"
                    pb="3"
                  >
                    {ele.title}
                  </Text>
                  <Spacer />
                  <Image borderRadius="md" src={ele.img} alt={ele._id}></Image>
                  <Box p="2">
                    <Text
                      mt={2}
                      fontSize="xl"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {ele.desc}
                    </Text>
                  </Box>
                  <Spacer />
                  <Box>
                    <IconButton
                      colorScheme="blue"
                      aria-label="comment btn"
                      size="lg"
                      m="2"
                      icon={<BsFillChatSquareDotsFill />}
                      onClick={(e) => {
                        console.log(e);
                      }}
                    />
                    <IconButton
                      colorScheme="red"
                      aria-label="like btn"
                      size="lg"
                      m="2"
                      icon={<BsFillHeartFill />}
                      onClick={(e) => {
                        console.log(e);
                      }}
                    />
                  </Box>
                </Box>
              </Center>
            );
          })
        : ""}
    </>
  );
};

export default Timeline;
