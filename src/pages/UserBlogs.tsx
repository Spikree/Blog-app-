import { useEffect, useState, useCallback } from "react";
import { getUserBlogs } from "../api/getBlogs.js";
import deleteBlog from "../api/deleteBlog.js";
import BlogCard from "@/components/shared/BlogCard";
import { AppSidebar } from "@/components/shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast.js";
import ConfirmDelete from "@/components/shared/ConfirmDelete.js";
import EditModal from "@/components/shared/EditModal.js";

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
  const { toast } = useToast();
  const [showDeletePopup, setShowDeletePopUp] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [blogId, setBlogId] = useState<string>("");

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
      setBlogId("");
      setShowDeletePopUp(false);
      toast({
        title: "Blog deleted sucessfully",
      });
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
              blogType={blogType}
              blog={blog}
              key={blog._id}
              setShowDeletePopUp={setShowDeletePopUp}
              setShowEditPopup={setShowEditPopup}
              setBlogId={setBlogId}
            />
          ))}
        </div>
        {showDeletePopup ? (
          <ConfirmDelete
            blogId={blogId}
            blogDelete={blogDelete}
            setShowDeletePopUp={setShowDeletePopUp}
          />
        ) : null}
        {showEditPopup ? <EditModal setShowEditPopup={setShowEditPopup}/> : ""}
      </SidebarProvider>
    </div>
  );
};

export default UserBlogs;
