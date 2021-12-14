import React, { useEffect } from "react";
import { Box, Spacer, Flex, Heading, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const state = useSelector((state) => {
    return state;
  });

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Flex>
      <Box p="5">
        <Heading size="lg">Thoughts</Heading>
      </Box>
      <Spacer />
      <Box p="5">
        <Button colorScheme="blue" mr="4" onClick={()=>{
          navigate("/profile")
        }}>
          Profile
        </Button>
        <Button colorScheme="red" onClick={logOut}>
          Log out
        </Button>
      </Box>
    </Flex>
  );
};

export default NavBar;
