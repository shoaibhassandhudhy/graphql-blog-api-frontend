import { Stack, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
export const MainLayout = () => (
  <Stack justifyContent="space-between">
    <Header />
    <Box
      sx={{
        padding: { xs: "30px 20px", md: "68px 120px" },
      }}
    >
      <Outlet />
    </Box>
  </Stack>
);
