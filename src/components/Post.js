import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  Center,
  IconButton,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { BsFillChatSquareDotsFill, BsFillHeartFill } from "react-icons/bs";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Post = () => {
  const [post, setPost] = useState([]);
  const [id, setId] = useState(0);
  const [comments, setComments] = useState([]);
  const [likes, setlikes] = useState([]);

  let postId = useParams().id;
  const state = useSelector((state) => {
    return state;
  });
  // get the post
  const postPage = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/postDetails/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      console.log(result.data);
      setPost(result.data[0]);
      setComments(result.data[1])
      setlikes(result.data[2])
    } catch (error) {
      console.log(error);
    }
  };
  // get the comment of the post

  useEffect(() => {
    postPage();
  }, []);

  return (
    <div>
      {post && (
        <Center key={post.title}>
          <Box
            p="5"
            maxW="60%"
            borderWidth="1px"
            boxShadow="2xl"
            p="6"
            rounded="md"
            bg="white"
          >
            <Text
              mt={2}
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              textAlign="center"
              pb="3"
            >
              {post.title}
            </Text>
            <Spacer />
            <Image borderRadius="md" src={post.img} alt={post._id}></Image>
            <Box p="2">
              <Text
                mt={2}
                fontSize="xl"
                fontWeight="semibold"
                lineHeight="short"
              >
                {post.desc}
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
          {/* <Spacer /> */}
          {/* <Box>
            <Text
              mt={2}
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              textAlign="center"
              pb="3"
            >
              Comments
            </Text>
            {comments && comments.map((elem) => {})}
          </Box> */}
        </Center>
      )}
    </div>
  );
};

export default Post;
