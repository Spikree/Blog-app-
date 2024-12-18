import { useEffect, useState } from "react"
import {getUserBlogs} from "../api/getBlogs.js"
import BlogCard from "@/components/shared/BlogCard";
import { AppSidebar } from "@/components/shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

type Props = {}

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
    const blogType = "user-blogs"

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await getUserBlogs(token);                
                setUserBlogs(response.blogs)
                console.log(userBlogs)
            } catch (error) {
                console.log(error)
            }
        }

        getBlogs();
    },[])

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="flex flex-wrap gap-4 p-6">
          {userBlogs.map((blog) => (
            <BlogCard blogType={blogType} blog={blog} key={blog._id} />
          ))}
        </div>
      </SidebarProvider>
    </div>
  )
}

export default UserBlogs