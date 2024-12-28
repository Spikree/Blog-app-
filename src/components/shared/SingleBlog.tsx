import { Heart, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import commentOnBlogAPI from "../../api/commentOnBlog.js";

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

interface BlogPostProps {
  title: string;
  content: string;
  postedOn: string;
  user: string;
  totalLikes: number;
  hasLiked: boolean;
  comments: Comment[];
  id: string;
  getBlog: () => void;
}

export default function SingleBlog({
  title,
  content,
  postedOn,
  user,
  totalLikes,
  hasLiked,
  comments,
  id,
  getBlog,
}: BlogPostProps) {
  const formattedDate = new Date(postedOn).toLocaleDateString();
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const handleCommentSubmission = async (token,comment,id) => {
    if (!token) {
      setError("You must be logged in to comment.");
      return;
    }

    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      setError(null); // Clear previous errors
      await commentOnBlogAPI(token, comment, id);
      setComment(""); // Clear the input
      getBlog(); // Refresh the blog data
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Failed to post the comment. Please try again.");
    }
  };

  return (
    <Card className="w-full p-10 mx-auto mb-6 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
        </div>
        <div className="text-sm text-muted-foreground">
          Posted by <span className="font-medium">{user}</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="prose prose-slate">
          {content?.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <div className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors duration-200">
          <Card className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors duration-200">
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                hasLiked ? "text-red-600 fill-red-600" : "text-gray-600"
              }`}
            />
            <span className="text-sm font-medium text-gray-600">
              {totalLikes}
            </span>
          </Card>
        </div>
      </CardFooter>

      <Card className="flex justify-between items-center mt-4 gap-3 p-5">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Enter your comment"
        />
        <Send
          onClick={() => handleCommentSubmission(token, comment, id)}
          className="cursor-pointer text-gray-600 hover:text-gray-800"
        />
      </Card>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <Card className="mt-6 p-5">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        {comments?.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="border-b pb-3 mb-3">
                <div className="flex items-center gap-3">
                  {comment.user.profilePicture ? (
                    <img
                      src={comment.user.profilePicture}
                      alt={comment.user.username}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {comment.user.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{comment.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </Card>
    </Card>
  );
}
