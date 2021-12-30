import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { IoIosTrash } from "react-icons/io";

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
  Heading,
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
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setnewPost(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`image/${newpost.name}`).put(newpost);
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
          .ref("image")
          .child(newpost.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  // add new post function

  const newPost = async () => {
    try {
      await axios.post(
        `${BASE_URL}/newPost`,
        {
          title,
          img: url,
          desc,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );

      getPosts();
      // setTitle("");
      // setUrl("");
      // setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  // go to the post page
  const onePost = (id) => {
    navigate(`/postPage/${id}`);
  };

  // logout
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Spacer />
      <Box p="5">
        <Button
          colorScheme="blue"
          mr="4"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </Button>
        <Button colorScheme="red" onClick={logOut}>
          Log out
        </Button>
      </Box>
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
            <img alt={title} src={url} />

            <br></br>
            <input type="file" name="post" onChange={handleChange} />
            <Button onClick={handleUpload}>upload</Button>
            <Button onClick={newPost}>Add post</Button>

            <br></br>
            <br></br>
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
