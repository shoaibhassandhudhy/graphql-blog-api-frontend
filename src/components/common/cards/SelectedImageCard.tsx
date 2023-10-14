import { SelectedImageCardProps } from "../../../types";
import { Stack, Box, Typography } from "@mui/material";
import {
  CANCEL_SELECTED_IMAGE_BUTTON_CONTAINER,
  SELECTED_IMAGE_NAME,
} from "../../../styles";
import { X, UploadBlogCardImage } from "../../../asset/images";

export const SelectedImageCard = ({
  fileName,
  onClickCloseButton,
}: SelectedImageCardProps) => (
  <Stack direction="row">
    <Box sx={{ width: "24px", height: "24px" }}>
      <img src={UploadBlogCardImage} width="100%" />
    </Box>
    <Typography sx={SELECTED_IMAGE_NAME}>{fileName}</Typography>
    <CANCEL_SELECTED_IMAGE_BUTTON_CONTAINER onClick={onClickCloseButton}>
      <img src={X} width="100%" />
    </CANCEL_SELECTED_IMAGE_BUTTON_CONTAINER>
  </Stack>
);
