import { useEffect, useState } from "react";
import { getSingleBlog } from "../api/getBlogs.js";
import { useParams } from "react-router-dom";
import SingleBlog from "@/components/shared/SingleBlog.js";

type Props = {};

type Blog = {
  title: string;
  content: string;
  postedOn: string;
  user: string;
  _id: string;
  hasLiked: boolean;
  totalLikes: number;
};

const Blog = (props: Props) => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
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
      />
      
    </div>
  );
};

export default Blog;
