import { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/post";
import { BlogCardsList } from "../components";
import { BLOGS_PER_PAGE } from "../constants";
import { Box } from "@mui/material";
import { Posts, useFindAllPostsQuery } from "../gql/graphql";
import { PostActions } from "../reducers/post";

export const HomeConainer = () => {
  const [page, setPage] = useState<number>(0);
  const { posts, count, dispatchPostAction } = useContext(PostContext);
  const { data: allPosts } = useFindAllPostsQuery({
    variables: {
      skip: page,
      take: BLOGS_PER_PAGE,
    },
  });

  const onRefetch = (pages: number) => {
    setPage(() => BLOGS_PER_PAGE * (pages - 1));
  };

  useEffect(() => {
    if (allPosts != undefined) {
      dispatchPostAction({
        type: PostActions.GET_POST,
        payload: {
          posts: allPosts.findAllPosts.items,
          count: allPosts.findAllPosts.total,
        },
      });
    }
  }, [allPosts]);
  return (
    <Box sx={{ marginTop: "48px" }}>
      {posts != undefined && (
        <BlogCardsList
          paginate
          onRefetch={onRefetch}
          perPage={BLOGS_PER_PAGE}
          total={count || 0}
          data={(posts as Posts[]) || []}
        />
      )}
    </Box>
  );
};
