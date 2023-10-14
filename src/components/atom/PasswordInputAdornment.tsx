import { VisibilityIconText } from "../../styles";
import { VISIBILTY_ICON_SX } from "../../styles/constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { PasswordInputAdornmentProps } from "../../types";

export const PasswordInputAdornment: React.FC<PasswordInputAdornmentProps> = ({
  showPassword,
  onhandleClickShowPassword,
}) => (
  <InputAdornment
    position="end"
    sx={{ position: "absolute", right: "0", top: "-20px" }}
  >
    <IconButton
      aria-label="toggle password visibility"
      onClick={onhandleClickShowPassword}
    >
      {showPassword ? (
        <>
          <VisibilityOff sx={VISIBILTY_ICON_SX} />
          <VisibilityIconText>Hide</VisibilityIconText>
        </>
      ) : (
        <>
          <Visibility sx={VISIBILTY_ICON_SX} />
          <VisibilityIconText> Show</VisibilityIconText>
        </>
      )}
    </IconButton>
  </InputAdornment>
);
