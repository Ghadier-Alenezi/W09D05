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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillChatSquareDotsFill, BsFillHeartFill } from "react-icons/bs";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Post = () => {
  const [post, setPost] = useState([]);
  const [id, setId] = useState(0);
  const [comments, setComments] = useState([]);
  const [likes, setlikes] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [userName, setUsername] = useState("");
  const [likeCounter, setLikeCounter] = useState(0);
  const [commentCounter, setCommentCounter] = useState(0);

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
      // console.log(result.data);
      setPost(result.data[0]);
      setComments(result.data[1]);
      setlikes(result.data[2]);
      setAvatar(result.data[0].user.avatar);
      setUsername(result.data[0].user.userName);
      setLikeCounter(likes.length);
      setCommentCounter(comments.length);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(comments.length);
  // console.log(likes.length);

  // get the comment of the post

  useEffect(() => {
    postPage();
  }, []);

  return (
    <div>
      {post && (
        <Center key={post.id}>
          <Box
            p="5"
            maxW="60%"
            borderWidth="1px"
            boxShadow="2xl"
            p="6"
            rounded="md"
          >
            <Flex>
              <Box w="1000%" h="60px" display="fixed">
                <Image
                  borderRadius="md"
                  src={avatar}
                  alt="avatarImg"
                  borderRadius="50%"
                  boxSize="75px"
                />

                <Text
                  mt={2}
                  fontSize="xl"
                  fontWeight="semibold"
                  lineHeight="short"
                  textAlign="center"
                  pl="3"
                >
                  {userName}
                </Text>
                <Menu w="120px" h="80px">
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<GiHamburgerMenu />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem>Edit Post</MenuItem>
                    <MenuItem>Delete Post</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
            <Spacer />
            <Text
              mt={2}
              fontSize="s"
              fontWeight="semibold"
              textAlign="center"
              pb="3"
            >
              {post.title}
            </Text>
            <Box p="2">
              <Text mt={2} fontSize="xl" lineHeight="short">
                {post.desc}
              </Text>
            </Box>
            <Image
              pt="5"
              size="s"
              borderRadius="md"
              src={post.img}
              alt={post._id}
            ></Image>
            <Spacer />
            <Flex></Flex>
            <Box pt="3">
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
              <p>{commentCounter}</p>
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
              <p>{likeCounter}</p>
            </Box>
          </Box>
          <Spacer />
          <Box>
            {comments && (
              <>
                {comments.map((elem) => {
                  return (
                    <Box
                      key={elem.id}
                      backgroundColor="lightBlue"
                      width="100%"
                      m="1"
                      p="1"
                    >
                      <Image
                        borderRadius="50%"
                        boxSize="40px"
                        src={(elem.user, avatar)}
                      />
                      <h3>{elem.user.userName}</h3>
                      <p>{elem.desc}</p>
                    </Box>
                  );
                })}
              </>
            )}
          </Box>
        </Center>
      )}
    </div>
  );
};

export default Post;
