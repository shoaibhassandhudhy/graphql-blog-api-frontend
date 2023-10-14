import { Box, Typography } from "@mui/material";
import { TITLE_WITH_BORDER_BOTTOM } from "../styles/constants";

import { MyArticleContainer } from "../container";
const MyArticles = () => {
  return (
    <Box>
      <Typography variant="h1" sx={TITLE_WITH_BORDER_BOTTOM}>
        My Articles
      </Typography>
      <MyArticleContainer />
    </Box>
  );
};
export default MyArticles;
