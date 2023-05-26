import React from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

import usePost from "../../hooks/usePost";

import Header from "../../components/Header";
import PostItem from "../../components/posts/PostItem";
import Form from "../../components/Form";
import CommentFeed from "../../components/posts/CommentFeed";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fecthedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fecthedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader />
      </div>
    );
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fecthedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweetez votre réponse"
      />
      <CommentFeed comments={fecthedPost?.comment} />
    </>
  );
};

export default PostView;
