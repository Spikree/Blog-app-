import { useEffect, useState, useCallback } from "react";
import { getUserBlogs } from "../api/getBlogs.js";
import deleteBlog from "../api/deleteBlog.js";
import BlogCard from "@/components/shared/BlogCard";
import { AppSidebar } from "@/components/shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast.js";
import ConfirmDelete from "@/components/shared/ConfirmDelete.js";
import EditModal from "@/components/shared/EditModal.js";
import { getSingleBlog } from "../api/getBlogs.js";
import editBlog from "../api/editBlog.js";

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
  const [editBlogTitle, setEditBlogTitle] = useState<string>("");
  const [editBlogContent, setEditBlogContent] = useState<string>("");
  const [editBlogId, setEditBlogId] = useState<string>("");

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

  const fetchSingleBlog = async (token: string, editBlogId: string) => {
    try {
      const response = await getSingleBlog(token, editBlogId);

      setEditBlogTitle(response.blog.title);
      setEditBlogContent(response.blog.content);
    } catch (error) {
      console.log(error);
    }
  };

  const blogEdit = async (
    token: string,
    editBlogId: string,
    editBlogTitle: string,
    editBlogContent: string
  ) => {
    try {
      const response = await editBlog(
        token,
        editBlogId,
        editBlogTitle,
        editBlogContent
      );
      setShowEditPopup(false);
      getBlogs();
      toast({
        title: "Blog updated sucessfully"
      })
      console.log(response);
    } catch (error) {
      console.log(error);
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
              fetchSingleBlog={fetchSingleBlog}
              setEditBlogId={setEditBlogId}
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
        {showEditPopup ? (
          <EditModal
            editBlogTitle={editBlogTitle}
            setEditBlogTitle={setEditBlogTitle}
            setEditBlogContent={setEditBlogContent}
            editBlogContent={editBlogContent}
            setShowEditPopup={setShowEditPopup}
            blogEdit={blogEdit}
            editBlogId={editBlogId}
          />
        ) : (
          ""
        )}
      </SidebarProvider>
    </div>
  );
};

export default UserBlogs;
