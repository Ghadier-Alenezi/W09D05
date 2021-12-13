import React from "react";
import { Box, Spacer, Flex, Heading, Button } from "@chakra-ui/react";
const NavBar = () => {
  return (
    <Flex>
      <Box p="5">
        <Heading size="lg">Thoughts</Heading>
      </Box>
      <Spacer />
      <Box p="5">
        <Button colorScheme="blue" mr="4">
          Profile
        </Button>
        <Button colorScheme="red">Log out</Button>
      </Box>
    </Flex>
  );
};

export default NavBar;
