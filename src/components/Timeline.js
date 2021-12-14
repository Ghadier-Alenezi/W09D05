import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";

import axios from "axios";
import {
  Box,
  Image,
  Text,
  Center,
  IconButton,
  Spacer,
  FormControl,
  FormLabel,
  // FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { BsFillChatSquareDotsFill, BsFillHeartFill } from "react-icons/bs";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Timeline = () => {
  const navigate = useNavigate();
  // states for new post
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [newpost, setnewPost] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  // add new post function
  const newPost = async (e) => {
    e.preventDefault();
    try {
      let addPost = e.target.addPost.value;
      console.log(addPost);
      const result = await axios.post(
        `${BASE_URL}/newPost`,
        {
          title,
          desc,
          img: url,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      setnewPost(result.data);
      getPosts();
      e.target.newPost.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  // delete a post
  const deletePost = async (id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`${BASE_URL}/deletepost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      console.log(res);

      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // go to the post page
  const onePost = (id) => {
    navigate(`/postPage/${id}`);
  };
  return (
    <>
      <>
        <Box boxShadow="2xl" p="6" mt="20" rounded="md" bg="white">
          <FormControl id="newPost">
            <FormLabel fontSize="x-large" fontWeight="bold" textAlign="center">
              Add new Post
            </FormLabel>
            <Input
              placeholder="Title of your post..."
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
            <Input
              placeholder="Discripe your post..."
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              isRequired
            />

            <div>
              <Input type="file" name="newPost" onChange={handleChange} />
              <div>
                <Input type="file" name="newPost" onChange={handleUpload} />
                <progress value={progress} max="100" />
              </div>

              <Button onClick={newPost}> Add </Button>
            </div>
          </FormControl>
        </Box>
      </>
      {posts && posts.length
        ? posts.map((ele) => {
            return (
              <Center key={ele._id}>
                <Box
                  maxW="75%"
                  borderWidth="1px"
                  boxShadow="2xl"
                  p="6"
                  m="5"
                  rounded="md"
                  bg="white"
                  onClick={() => {
                    onePost(ele._id);
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
