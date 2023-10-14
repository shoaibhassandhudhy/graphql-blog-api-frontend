import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { InputFieldWrapper, PrimaryButton } from "../../styles";
import {
  PrimaryFilePicker,
  PrimaryInputField,
  PrimaryPasswordField,
  SelectedImageCard,
} from "../../components";
import { useUpdateUserMutation } from "../../gql/graphql";
import { yupSchema } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadImage } from "../../utility_Func";
import { PrimaryLoader } from "../../components";
import Alert from "@mui/material/Alert";
import { UpdateUserForm } from "../../types";
export const SettingsForm = () => {
  const schema = yupSchema.updateUser;

  const [images, setImages] = useState<File[]>();
  const [submitted, isSubmitted] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [updateUser, { loading: settingLoading }] = useUpdateUserMutation({
    onCompleted: () => {
      isSubmitted(true);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const onFormSubmit = async (values: UpdateUserForm) => {
    if (images) {
      const response = await uploadImage(images[0]);
      console.log(values);
      updateUser({
        variables: {
          name: values.name,
          avatar: response.data.url,
          password: values.password,
        },
      });
    }
  };

  return (
    <Box>
      {submitted && <Alert severity="success">Updated successfully</Alert>}

      <PrimaryLoader isLoading={settingLoading} />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography variant="h2" sx={{ fontWeight: "500" }}>
          Change Username
        </Typography>

        <InputFieldWrapper sx={{ marginTop: "45px" }}>
          <PrimaryInputField name="name" control={control} label="Username" />
        </InputFieldWrapper>

        <Typography variant="h2" sx={{ marginTop: "50px", fontWeight: "500" }}>
          Change password
        </Typography>

        <InputFieldWrapper sx={{ marginTop: "45px" }}>
          <PrimaryPasswordField
            control={control}
            label="New Password"
            name="password"
          />
        </InputFieldWrapper>

        <InputFieldWrapper sx={{ marginTop: "45px" }}>
          <PrimaryPasswordField
            control={control}
            label="Confirm Password"
            name="confirmPassword"
          />
        </InputFieldWrapper>

        <Typography variant="h2" sx={{ marginTop: "50px", fontWeight: "500" }}>
          Change Avatar
        </Typography>

        <Box sx={{ marginTop: "20px" }}>
          {!images && (
            <PrimaryFilePicker
              label="Supports: JPG, JPEG2000, PNG"
              setFiles={setImages}
              buttonText="Browse"
              options={{
                accept: {
                  "image/*": [],
                },
              }}
            />
          )}
          {images && (
            <SelectedImageCard
              fileName={images[0].name}
              onClickCloseButton={() => setImages(undefined)}
            />
          )}
        </Box>

        <Box sx={{ width: { xs: "250px", md: "356px" }, marginTop: "55px" }}>
          <PrimaryButton
            disabled={
              !(dirtyFields.password && dirtyFields.confirmPassword) &&
              !dirtyFields.name &&
              typeof images == "undefined"
            }
            variant="contained"
            fullWidth
            type="submit"
          >
            Save Changes
          </PrimaryButton>
        </Box>
      </form>
    </Box>
  );
};
