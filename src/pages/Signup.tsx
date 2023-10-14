import { Box } from "@mui/material";
import { SignupForm } from "../components/forms/SingupForm";
import {
  AuthPageFormContainer,
  AuthPageHeading,
  AuthPageSubHeading,
} from "../styles";

const Signup = () => (
  <Box>
    <AuthPageHeading>Create an account</AuthPageHeading>
    <AuthPageSubHeading to="/signin">
      Already have an account? Log in
    </AuthPageSubHeading>
    <AuthPageFormContainer>
      <SignupForm />
    </AuthPageFormContainer>
  </Box>
);
export default Signup;
