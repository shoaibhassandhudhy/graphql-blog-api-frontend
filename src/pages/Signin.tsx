import { Box } from "@mui/material";
import { AuthPageFormContainer, AuthPageHeading } from "../styles";
import { SigninForm } from "../components/forms/SigninForm";

const Signin = () => (
  <Box>
    <AuthPageHeading>SigIn</AuthPageHeading>
    <AuthPageFormContainer>
      <SigninForm />
    </AuthPageFormContainer>
  </Box>
);

export default Signin;
