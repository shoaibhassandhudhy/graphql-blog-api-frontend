import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupSchema } from "../../validation";
import { uploadImage } from "../../utility_Func";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, MenuItem } from "@mui/material";
import {
  CreatePostMutation,
  Posts,
  useCreatePostMutation,
} from "../../gql/graphql";
import { InputFieldWrapper, PrimaryButton } from "../../styles";
import {
  CREATE_POST_MIN_TO_READ_SELECT_OPTIONS,
  ROUTES_PATH,
} from "../../constants";
import {
  PrimaryLoader,
  PrimaryFilePicker,
  PrimaryInputField,
  SelectedImageCard,
  PrimarySelectField,
} from "../../components";
import { CreatePostFormType } from "../../types";
import { useContext } from "react";
import { PostContext } from "../../context/post";
import { PostActions } from "../../reducers/post";

const schema = yupSchema.createPost;

export const CreatePostForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>();
  const { dispatchPostAction } = useContext(PostContext);
  const {
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...schema.getDefault(),
      minToRead: CREATE_POST_MIN_TO_READ_SELECT_OPTIONS[0].value,
    },
  });

  const [createPost] = useCreatePostMutation({
    onCompleted: (data: CreatePostMutation) => {
      setLoading(false);
      if (data.createPosts.response?.status === 201) {
        let { post } = data.createPosts;
        if (post) {
          dispatchPostAction({
            type: PostActions.CREATE_POST,
            payload: {
              post: post,
            },
          });
        }

        toast.success("Post created successfully");
        navigate(ROUTES_PATH.myArticles);
      }
    },
    onError: (error) => {
      setLoading(false);
      if (error.message.includes("Forbidden resource")) {
        toast.error("user is not logged in!");
      }
      toast.error(error.message);
    },
  });

  const onFormSubmit = async (values: CreatePostFormType) => {
    setLoading(true);
    console.log(values);
    if (images) {
      const response = await uploadImage(images[0]);
      if (response?.data) {
        createPost({
          variables: {
            text: values.text.replace(/(\r\n|\r|\n)/g, "\n"),
            tag: values.tag,
            image: response.data.url,
            title: values.title,
            minutesToRead: values.minToRead,
          },
        });
      } else {
        toast.error("Unable to create article");
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      <PrimaryLoader isLoading={loading} />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <InputFieldWrapper sx={{ marginTop: "0px" }}>
          <PrimaryInputField
            name="title"
            control={control}
            label="Give it a title"
          />
        </InputFieldWrapper>

        <InputFieldWrapper>
          <PrimaryInputField
            name="tag"
            control={control}
            label="Give it a tag"
          />
        </InputFieldWrapper>

        <InputFieldWrapper>
          <PrimarySelectField
            name="minToRead"
            label="Min. to read"
            control={control}
          >
            {CREATE_POST_MIN_TO_READ_SELECT_OPTIONS.map(
              ({ value, label }, index) => (
                <MenuItem value={value} key={index + value}>
                  {label}
                </MenuItem>
              )
            )}
          </PrimarySelectField>
        </InputFieldWrapper>

        <InputFieldWrapper>
          <PrimaryInputField
            name="text"
            control={control}
            label="Write something about it"
            props={{ multiline: true, rows: 6 }}
          />
        </InputFieldWrapper>

        <Box sx={{ marginTop: "40px" }}>
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

        <Box sx={{ width: { xs: "250px", md: "356px" }, marginTop: "40px" }}>
          <PrimaryButton
            disabled={
              !(dirtyFields.text && dirtyFields.title && dirtyFields.tag) ||
              typeof images == "undefined"
            }
            variant="contained"
            fullWidth
            type="submit"
          >
            Publish article
          </PrimaryButton>
        </Box>
      </form>
    </Box>
  );
};
