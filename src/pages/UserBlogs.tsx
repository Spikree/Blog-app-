import { useEffect, useState, useCallback } from "react";
import { getUserBlogs } from "../api/getBlogs.js";
import deleteBlog from "../api/deleteBlog.js";
import BlogCard from "@/components/shared/BlogCard";
import { AppSidebar } from "@/components/shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

type Props = {};

type Blog = {
  title: string;
  content: string;
  postedOn: string;
  user: string;
  _id: string;
};

const UserBlogs = (props: Props) => {
  const token = localStorage.getItem("token");
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const blogType = "user-blogs";

  const getBlogs = useCallback(async () => {
    try {
      const response = await getUserBlogs(token);
      setUserBlogs(response.blogs);
      console.log("Fetched blogs:", response.blogs);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  }, [token]);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  const blogDelete = async (blogId: string) => {
    try {
      const response = await deleteBlog(blogId);
      console.log("Deleted blog response:", response);
      await getBlogs(); 
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="flex flex-wrap gap-4 p-6">
          {userBlogs.map((blog) => (
            <BlogCard
              blogDelete={blogDelete}
              blogType={blogType}
              blog={blog}
              key={blog._id}
            />
          ))}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserBlogs;
