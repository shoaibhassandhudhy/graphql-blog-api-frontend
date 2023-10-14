import { Box, Typography } from "@mui/material";
import { TITLE_WITH_BORDER_BOTTOM } from "../styles/constants";
import { SettingsForm } from "../components/forms/SettingForm";
const Settings = () => (
  <Box>
    <Typography variant="h1" sx={TITLE_WITH_BORDER_BOTTOM}>
      Account Setting
    </Typography>

    <Box sx={{ marginTop: "55px" }}>
      <SettingsForm />
    </Box>
  </Box>
);
export default Settings;
