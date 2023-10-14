import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../constants";
import { NotFoundBox } from "../styles";
export const NotFound = () => {
  const navigate = useNavigate();
  const toHome = () => navigate(ROUTES_PATH.home);
  return (
    <NotFoundBox>
      <Typography variant="h1" style={{ color: "black" }}>
        404
      </Typography>
      <Typography variant="h6">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={toHome}>
        Back Home
      </Button>
    </NotFoundBox>
  );
};
