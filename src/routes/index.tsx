import { RouteProps } from "react-router-dom";
import * as React from "react";
import { ROUTES_PATH } from "../constants";

const Home = React.lazy(() => import("../pages/Home"));
const Signup = React.lazy(() => import("../pages/Signup"));
const Signin = React.lazy(() => import("../pages/Signin"));
const Settings = React.lazy(() => import("../pages/Settings"));
const CreatePost = React.lazy(() => import("../pages/CreatePost"));
const ReadBlog = React.lazy(() => import("../pages/ReadBlog"));
const ReadBlogBySearch = React.lazy(() => import("../pages/ReadBlogSearch"));
const Protected = React.lazy(() => import("../components/atom/Protected"));
const MyArticles = React.lazy(() => import("../pages/MyArticles"));
export const protectedRoutes: RouteProps[] = [
  {
    path: ROUTES_PATH.settings,
    element: (
      <React.Suspense fallback={<span>Loading...</span>}>
        <Protected>
          <Settings />
        </Protected>
      </React.Suspense>
    ),
  },
  {
    path: ROUTES_PATH.createPost,
    element: (
      <React.Suspense fallback={<span>Loading...</span>}>
        <Protected>
          <CreatePost />
        </Protected>
      </React.Suspense>
    ),
  },
  {
    path: ROUTES_PATH.myArticles,
    element: (
      <React.Suspense fallback={<span>Loading...</span>}>
        <Protected>
          <MyArticles />
        </Protected>
      </React.Suspense>
    ),
  },
  {
    path: `${ROUTES_PATH.readBlog}/:id`,
    element: (
      <React.Suspense fallback={<span>Loading...</span>}>
        <ReadBlog />
      </React.Suspense>
    ),
  },
  {
    path: `${ROUTES_PATH.readBlogBySearch}/:search`,
    element: (
      <React.Suspense fallback={<span>Loading...</span>}>
        <Protected>
          <ReadBlogBySearch />
        </Protected>
      </React.Suspense>
    ),
  },
  {
    path: ROUTES_PATH.home,
    element: (
      <React.Suspense fallback={<span>Loading...</span>}>
        <Home />
      </React.Suspense>
    ),
  },
];
export const authRoutes: RouteProps[] = [
  {
    path: ROUTES_PATH.signup,
    element: (
      <React.Suspense fallback={<span>Loading...</span>}>
        <Signup />
      </React.Suspense>
    ),
  },
  {
    path: ROUTES_PATH.signin,
    element: (
      <React.Suspense fallback={<span>Loading...</span>}>
        <Signin />
      </React.Suspense>
    ),
  },
];
