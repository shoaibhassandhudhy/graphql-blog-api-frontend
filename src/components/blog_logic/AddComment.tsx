import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupSchema } from "../../validation";
import { Box, Stack } from "@mui/material";
import { AddCommentProps } from "../../types";
import { SecondaryButton } from "../../styles";
import { useCreateCommentMutation } from "../../gql/graphql";
import { PrimaryInputField, PrimaryLoader } from "../../components";
import { AddCommenFormType } from "../../types";
const schema = yupSchema.createComment;

export const AddComment: React.FC<AddCommentProps> = ({
  postId,
  parentId,
  onRefetch,
  isReply = false,
}) => {
  const [createComment, { loading }] = useCreateCommentMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      ...schema.getDefault(),
    },
  });

  const onFormSubmit = async (values: AddCommenFormType) => {
    console.log(values);
    if (isDirty) {
      await createComment({
        variables: {
          parentId: parentId && parentId,
          postId,
          text: values.text,
        },
      });
      reset();
      onRefetch();
    }
  };

  return (
    <Box>
      <PrimaryLoader isLoading={loading} />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack direction="row">
          <PrimaryInputField
            name="text"
            control={control}
            label="Add comment"
          />
          <SecondaryButton
            variant="contained"
            sx={{ marginLeft: "30px" }}
            type="submit"
          >
            {isReply ? "Reply" : "Post"}
          </SecondaryButton>
        </Stack>
      </form>
    </Box>
  );
};
