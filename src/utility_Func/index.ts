import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios, { AxiosResponse } from "axios";
import { CLOUDINARY_IMAGE_UPLOAD_URL, TOKEN_KEY } from "../constants";
import { ImagePromiseType } from "../types";

dayjs.extend(relativeTime);
export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  return true;
}

export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  return true;
}

export function isToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
}

export const uploadImage = async (
  image: File
): Promise<AxiosResponse<ImagePromiseType>> => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_NAME || ""
  );

  try {
    const response = await axios.post(CLOUDINARY_IMAGE_UPLOAD_URL, formData);
    console.log(response);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getFormatDateInDDMMYYYY = (date: string): string => {
  return dayjs(new Date(parseInt(date)).toDateString())
    .format("DD MMMM YYYY")
    .toString();
};

export const getTimeFromNow = (date: string): string => {
  return dayjs(new Date(date)).fromNow().toString();
};
