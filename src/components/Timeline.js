import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Box, Image, Flex, Text } from "@chakra-ui/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Timeline = () => {
  const [posts, setPosts] = useState(null);
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState(null);
  const [url, setUrl] = useState(
    "https://aqaarplus.com/assets/uploads/default.png"
  );
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);
  const state = useSelector((state) => {
    return state;
  });
  // all posts of all users
  const getPosts = async () => {
    const result = await axios.get(`${BASE_URL}/posts`);
    setPosts(result.data);
  };
  //   console.log(posts);

  return (
    <div className="mainContainer">
      {posts && posts.length
        ? posts.map((ele) => {
            return (
              <Box p="5" maxW="100%">
              <Box p="5" maxW="30%" borderWidth="1px" boxShadow='2xl' p='6' rounded='md' bg='white'>
                <div className="postCard" key={ele._id}>
                  {/* {console.log(ele.img)} */}
                  <Image borderRadius="md" src={ele.img} alt={ele._id}></Image>
                  <Flex align="baseline" mt={2}>
                    <Text
                      ml={2}
                      textTransform="uppercase"
                      fontSize="sm"
                      fontWeight="bold"
                      color="pink.800"
                      key={ele._id + 2}
                    >
                      {ele.userName}
                    </Text>
                    <Text
                      mt={2}
                      fontSize="xl"
                      fontWeight="semibold"
                      lineHeight="short"
                      key={ele._id}
                    >
                      {ele.desc}
                    </Text>
                    <Text mt={2}>{ele.timeStamp}</Text>
                  </Flex>
                </div>
              </Box>
              </Box>
            );
          })
        : ""}
    </div>
  );
};

export default Timeline;
