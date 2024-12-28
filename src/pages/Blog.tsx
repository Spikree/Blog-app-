import { useEffect, useState } from "react";
import { getSingleBlog } from "../api/getBlogs.js";
import { useParams } from "react-router-dom";
import SingleBlog from "@/components/shared/SingleBlog.js";

type Props = {};

type Comment = {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  comment: string;
  createdAt: string;
  blog: string;
};

type Blog = {
  title: string;
  content: string;
  postedOn: string;
  user: string;
  _id: string;
  hasLiked: boolean;
  totalLikes: number;
  totalComments: number;
  comments: Comment[];
};

const Blog = (props: Props) => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [blog, setBlog] = useState<Blog | null>(null);

  const getBlog = async () => {
    try {
      const response = await getSingleBlog(token, id);
      setBlog(response.blog);
      console.log(blog);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    getBlog();
  }, []);

  return (
    <div>
      <SingleBlog
        title={blog?.title}
        content={blog?.content}
        postedOn={blog?.postedOn}
        user={blog?.user}
        totalLikes={blog?.totalLikes}
        hasLiked={blog?.hasLiked}
        comments={blog?.comments}
        id={id}
        getBlog={getBlog}
      />
      
    </div>
  );
};

export default Blog;
