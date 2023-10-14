import { createContext, Dispatch, SetStateAction } from "react";
import { PostStore } from "../../types";
import { postStoreDefaultValue } from "../../reducers/post";
export const PostContext = createContext<PostStore>({
  ...postStoreDefaultValue,
});
