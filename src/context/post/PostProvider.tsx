import { PostProviderProps, PostStore } from "../../types/index";
import { PostContext } from "./PostContext";
import { useReducer, useMemo, Reducer, useEffect } from "react";
import {
  PostAction,
  postReducer,
  postStoreDefaultValue,
} from "../../reducers/post";
import { useFindAllPostsQuery } from "../../gql/graphql";
import { BLOGS_PER_PAGE } from "../../constants";
import { PostActions } from "../../reducers/post";

export const PostProvider = ({ children }: PostProviderProps) => {
  const [postStore, dispatchPostAction] = useReducer<
    Reducer<PostStore, PostAction>
  >(postReducer, postStoreDefaultValue);

  const store = useMemo(() => {
    return { ...postStore, dispatchPostAction };
  }, [postStore.count, postStore.dispatchPostAction, postStore.posts]);

  const {
    data: allPosts,
    loading,
    refetch,
  } = useFindAllPostsQuery({
    variables: {
      skip: 0,
      take: BLOGS_PER_PAGE,
    },
    onCompleted: (data) => {
      dispatchPostAction({
        type: PostActions.GET_POST,
        payload: {
          posts: data.findAllPosts.items,
          count: data.findAllPosts.total,
        },
      });
    },
  });
  return (
    <PostContext.Provider value={{ ...store }}>{children}</PostContext.Provider>
  );
};
