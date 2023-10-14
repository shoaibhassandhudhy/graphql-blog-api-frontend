import { Box, Typography } from "@mui/material";
import { TITLE_WITH_BORDER_BOTTOM } from "../styles/constants/index";

import { HomeConainer } from "../container/HomeContainer";

const Home = () => {
  return (
    <Box>
      <Typography variant="h1" sx={TITLE_WITH_BORDER_BOTTOM}>
        Recent Posts
      </Typography>
      <HomeConainer />
    </Box>
  );
};
export default Home;
