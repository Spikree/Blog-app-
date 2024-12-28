import { Heart, MessageCircle, Pencil, Trash } from "lucide-react";
import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";

type BlogCardProps = {
  blog: {
    title: string;
    content: string;
    postedOn: string;
    user: string;
    _id: string;
    hasLiked: boolean;
    totalLikes: number;
    totalComments: number;
  };
  blogType: string;
  setShowDeletePopUp: (value: boolean) => void;
  setBlogId: (value: string) => void;
  setShowEditPopup: (value: boolean) => void;
  fetchSingleBlog: (value: string) => void
  setEditBlogId: (value: string) => void;
  likeBlogs: (value: string) => void;
};

const BlogCard = ({
  blog,
  blogType,
  setShowDeletePopUp,
  setBlogId,
  setShowEditPopup,
  fetchSingleBlog,
  setEditBlogId,
  likeBlogs,
  totalComments
}: BlogCardProps) => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  return (
    <Card  className="p-4 max-w-96 flex max-h-64 flex-col gap-3 shadow-md">
      <h1 onClick={() => {navigate(`/blog/${blog._id}`)}} className="text-2xl font-bold text-gray-800">{blog.title}</h1>

      <p onClick={() => {navigate(`/blog/${blog._id}`)}} className="text-gray-700 text-sm">
        {blog.content.length > 100
          ? `${blog.content.slice(0, 250)}...`
          : blog.content}
      </p>

      <div className="text-xs text-gray-500">
        <p>Posted on: {new Date(blog.postedOn).toLocaleDateString()}</p>
        {/* <p>Author ID: {blog.user}</p> */}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-3 mt-auto">
          <Card onClick={() => {likeBlogs(token, blog._id)}} className="px-3 py-2 flex items-center gap-1 text-gray-600 hover:text-red-500 cursor-pointer">
            <Heart className={blog.hasLiked ? "w-4 h-4 text-red-600 fill-red-600": "w-4 h-4"} />
            <span>{blog.totalLikes}</span>
          </Card>
          <Card className="px-3 py-2 flex items-center gap-1 text-gray-600 hover:text-blue-500 cursor-pointer">
            <MessageCircle className="w-4 h-4" />
            <span>{blog.totalComments}</span>
          </Card>
        </div>

        {blogType === "user-blogs" ? (
          <div className="flex gap-3">
            <Card
              className="px-2 py-2 text-gray-600 hover:text-red-700 cursor-pointer"
              onClick={() => {
                setShowDeletePopUp((prev) => !prev);
                setBlogId(blog._id);
              }}
            >
              <Trash className="w-5 h-5 " />
            </Card>

            <Card
              onClick={() => {
                setShowEditPopup((prev) => !prev);
                fetchSingleBlog(token,blog._id);
                setEditBlogId(blog._id);
              }}
              className="px-2 py-2 text-gray-600 hover:text-yellow-700 cursor-pointer"
            >
              <Pencil className="w-5 h-5 " />
            </Card>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default BlogCard;
