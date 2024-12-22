import BlogCard from "@/components/shared/BlogCard";
import { AppSidebar } from "@/components/shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../api/getBlogs.js";
import {likeBlog} from "../api/likeBlog.js"
import { useToast } from "@/hooks/use-toast.js";
import { title } from "process";

type Blog = {
  title: string;
  content: string;
  postedOn: string;
  user: string;
  _id: string;
};

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const {toast} = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const getAllBlogs = async () => {
      try {
        const response = await getBlogs(token);
        if (response?.blogs) {
          setBlogs(response.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getAllBlogs();
  }, [navigate]);

  const likeBlogs = async (token: string, blogId: string) => {
    try {
      const response = await likeBlog(token,blogId);

      console.log(response)
      toast({
        title: response.message
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        {/* <SidebarTrigger /> */}
        <div className="flex flex-wrap gap-4 p-6">
          {blogs.map((blog) => (
            <BlogCard likeBlogs={likeBlogs} blog={blog} key={blog._id} />
          ))}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Home;
