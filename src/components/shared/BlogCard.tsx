import { Heart, MessageCircle, Pencil, Trash } from "lucide-react";
import { Card } from "../ui/card";

type BlogCardProps = {
  blog: {
    title: string;
    content: string;
    postedOn: string;
    user: string;
    _id: string;
  };
  blogType: string;
};

const BlogCard = ({ blog,blogType }: BlogCardProps) => {
  return (
    <Card className="p-4 max-w-96 flex max-h-64 flex-col gap-3 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">{blog.title}</h1>

      <p className="text-gray-700 text-sm">
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
          <Card className="px-3 py-2 flex items-center gap-1 text-gray-600 hover:text-red-500 cursor-pointer">
            <Heart className="w-4 h-4" />
            {/* <span>Like</span> */}
          </Card>
          <Card className="px-3 py-2 flex items-center gap-1 text-gray-600 hover:text-blue-500 cursor-pointer">
            <MessageCircle className="w-4 h-4" />
            {/* <span>Comment</span> */}
          </Card>
        </div>

        {blogType === "user-blogs" ? (
          <div className="flex gap-3">
            <Card className="px-2 py-2">
              <Trash className="w-5 h-5 text-gray-600" />
            </Card>

            <Card className="px-2 py-2">
              <Pencil className="w-5 h-5 text-gray-600" />
            </Card>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default BlogCard;
