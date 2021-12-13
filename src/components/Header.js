import React from "react";
import {Link} from "react-router-dom";
import { Stack, Heading, Center, Box } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box>
      <Stack width="100%" height="60px" p="3" mb="50" >
        <Link to="/"><Heading  width="100%" height="60px" p="3"><Center>Memories</Center></Heading></Link>
      </Stack>
    </Box>
  );
};

export default Header;
