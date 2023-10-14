import { PostStore } from "../types";
import { Posts } from "../gql/graphql";
import { Dispatch } from "react";

export enum PostActions {
  CREATE_POST = "createPost",
  GET_POST = "getPost",
}

export type CreatePostAction = {
  type: PostActions.CREATE_POST;
  payload: {
    post: Posts;
  };
};
export type GetPostAction = {
  type: PostActions.GET_POST;
  payload: {
    posts: any;
    count: any;
  };
};
export type PostAction = CreatePostAction | GetPostAction;

export const postStoreDefaultValue: PostStore = {
  posts: [],
  count: 0,
  dispatchPostAction: () => {
    return;
  },
};
export type intialStateProps = {
  posts: Posts[] | [];
  dispatchPostAction: Dispatch<PostAction>;
  count: number;
};
export type returnType = {
  posts: Posts[];
  count: number;
};
export const postReducer = (state: PostStore, action: PostAction) => {
  const { type, payload } = action;

  switch (type) {
    case PostActions.CREATE_POST: {
      return {
        ...state,
        posts: [...state.posts, payload.post],
        count: state.count + 1,
      };
    }
    case PostActions.GET_POST: {
      return {
        ...state,
        posts: payload.posts,
        count: payload.count,
      };
    }
    default:
      return state;
  }
};
