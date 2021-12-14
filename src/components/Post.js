import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { storage } from "./firebase";
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
  Button,
  Input,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosTrash } from "react-icons/io";

import { BsFillChatSquareDotsFill, BsFillHeartFill } from "react-icons/bs";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Post = () => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setlikes] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [userName, setUsername] = useState("");
  const [likeCounter, setLikeCounter] = useState(0);
  const [commentCounter, setCommentCounter] = useState(0);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);
  

  const state = useSelector((state) => {
    return state;
  });

  // get the post
  let postId = useParams().id;
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
  // console.log(post._id);

  // add new comment
  const newComment = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/newComment/${post._id}`,
        {
          desc: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      // console.log(result.status);
      if (result.status === 201) {
        postPage();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // /deleteComment/:id of the comment
  const deleteComment = async (id) => {
    try {
      const result = await axios.delete(`${BASE_URL}/deleteComForEver/${id}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      // console.log( "comment user",result.data.user);
      // console.log("login user", state.logInReducer.userId);
      if (result.status === 200) {
        postPage();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    postPage();
  }, []);

  return (
    <>
      {post && (
        <Center key={post._id}>
          <Box
            p="5"
            maxW="60%"
            borderWidth="1px"
            boxShadow="2xl"
            p="6"
            rounded="md"
          >
            <WrapItem mt="30">
              <Center>
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
                <Menu>
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
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <Box p="2">
                  <Text
                    mt={2}
                    fontSize="s"
                    fontWeight="semibold"
                    textAlign="center"
                    pb="3"
                  >
                    {post.title}
                  </Text>
                  <Text mt={2} fontSize="xl" lineHeight="short">
                    {post.desc}
                  </Text>
                  <Image
                    pt="5"
                    size="s"
                    borderRadius="md"
                    src={post.img}
                    alt={post._id}
                  ></Image>
                  <Spacer />{" "}
                  <IconButton
                    colorScheme="blue"
                    aria-label="comment btn"
                    size="lg"
                    m="2"
                    icon={<BsFillChatSquareDotsFill />}
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
                      setLikeCounter(likeCounter + 1);
                    }}
                  />
                  <p>{likeCounter}</p>
                </Box>{" "}
              </Center>
            </WrapItem>
            {/* </Wrap> */}
          </Box>
          <Spacer />
          <Box>
            {comments && (
              <>
                {comments.map((elem) => {
                  // console.log(elem.user._id);
                  return (
                    <Box
                      key={elem._id}
                      backgroundColor="lightGray"
                      width="100%"
                      m="4"
                      p="3"
                    >
                      {state.logInReducer.userId === elem.user._id ? (
                        <IconButton
                          colorScheme="blue"
                          aria-label="comment btn"
                          // size=""
                          m="2"
                          onClick={() => {
                            deleteComment(elem._id);
                          }}
                          icon={<IoIosTrash />}
                        />
                      ) : (
                        ""
                      )}

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
            <Center>
              <Box mb="4">
                <Input
                  size="md"
                  w="400px"
                  h="80px"
                  mr="4"
                  placeholder="write your comment here"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <Button onClick={newComment}>add comment</Button>
              </Box>
            </Center>
          </Box>
        </Center>
      )}
    </>
  );
};

export default Post;
