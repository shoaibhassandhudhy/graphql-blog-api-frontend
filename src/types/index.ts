import { BaseTextFieldProps, SxProps, Theme, Checkbox } from "@mui/material";
import { DropzoneOptions } from "react-dropzone";
import { Dispatch, SetStateAction, ReactNode } from "react";
import { Posts, Comments } from "../gql/graphql";
import { PostAction } from "../reducers/post";

export type HeaderNavLinkType = {
  id: number;
  to: string;
  text: string;
  isProtected: boolean;
};
export type PrimaryPasswordFieldProps = {
  name: string;
  control: any;
  label: string;
  helperText?: string;
  placeholder?: string;
  props?: BaseTextFieldProps;
};

export type PasswordInputAdornmentProps = {
  showPassword: boolean;
  onhandleClickShowPassword: () => void;
};

export type PrimaryInputFieldProps = {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  helperText?: string;
  props?: BaseTextFieldProps;
};

export type PrimaryLoaderProps = {
  isLoading: boolean;
};

export type Checkbox = {
  rememberMe: boolean;
  email: string;
  password: string;
};

export type SigninFormType = {
  rememberMe: boolean;
  email: string;
  password: string;
};

export type PrimaryCheckboxProps = {
  control: any;
  label: string;
  name: string;
};

export type PrimaryFilePickerProps = {
  label: string;
  buttonText: string;
  setFiles: React.Dispatch<React.SetStateAction<File[] | undefined>>;
  options?: DropzoneOptions;
};

export type SelectedImageCardProps = {
  fileName: string;
  onClickCloseButton: () => void;
};

export type NavLinksListProps = {
  data: HeaderNavLinkType[];
  isLoggedIn: boolean;
};

export type FullViewHeaderProps = {
  isLoggedIn: boolean;
  logout: () => void;
};

export type UserContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export type User = {
  userId: string;
  name: string;
};

export type UserProviderProps = {
  children: ReactNode;
};

export type PrimarySelectFieldProps = {
  name: string;
  control: any;
  props?: BaseTextFieldProps;
  children: ReactNode;
  label: string;
  helperText?: string;
};

export type BlogCardsListProps = {
  data: Posts[];
  total: number;
  paginate: boolean;
  perPage?: number;
  onRefetch?: (page: number) => void;
};

export type BlogCardProps = {
  tag: string;
  date: string;
  text: string;
  title: string;
  author: string;
  duration: string;
  thumbnail: string;
  authorAvatar: string;
  styles?: SxProps<Theme>;
};

export type BlogMetaDataProps = {
  date: string;
  author: string;
  duration?: string;
  authorAvatar: string;
};

export type PrimaryPaginationProps = {
  count: number;
  onReftech: (page: number) => void;
};

export type ProtectedProps = {
  children: JSX.Element;
};

export type BlogCommentSectionProps = {
  postId: number;
  onRefetch: () => void;
  comments: Comments[];
};
export type AddCommentProps = {
  postId: number;
  parentId?: number;
  isReply?: boolean;
  onRefetch: () => void;
};

export type CommentCardProps = {
  id: number;
  text: string;
  postId: number;
  userName: string;
  isParent?: boolean;
  totallReplies: number;
  timeFromNow: string;
  avatar: string;
};

export type BlogContentProps = {
  tag: string;
  date: string;
  text: string;
  image: string;
  title: string;
  duration: string;
  authorName: string;
};
export type UpdateUserForm = {
  name: string;
  confirmPassword: string;
  password: string;
};

export type CreatePostFormType = {
  tag: string;
  title: string;
  minToRead: string;
  text: string;
};

export type AddCommenFormType = {
  text: string;
};

export type PostContextType = {
  posts: Posts[];
  dispatchPostAction: () => React.Dispatch<PostAction>;
  count: number;
};

export type PostProviderProps = {
  children: ReactNode;
};

export type PostStore = {
  posts: Posts[];
  count: number;
  dispatchPostAction: Dispatch<PostAction>;
};

export type MobileHeaderProps = {
  isLoggedIn: boolean;
  logout: () => void;
};

export type ImagePromiseType = {
  asset_id: string;
  public_id: string;
  version: string;
  version_id: string;
  original_filename: string;
  signature: string;
  width: string;
  height: string;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: string;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
};
