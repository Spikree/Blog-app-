
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface BlogPostProps {
  title: string;
  content: string;
  postedOn: string;
  user: string;
  totalLikes: number;
  hasLiked: boolean
}

export default function SingleBlog({ title, content, postedOn, user,totalLikes,hasLiked }: BlogPostProps) {
    const formattedDate = new Date(postedOn).toLocaleDateString();
  return (
    <Card className="w-full p-10  mx-auto mb-6 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {formattedDate}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Posted by <span className="font-medium">{user}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-slate">
          {content?.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div>
            <Card className="px-2 py-2 text-gray-600 hover:text-red-700 cursor-pointer">
                <Heart className={hasLiked ? "w-4 h-4 text-red-600": "w-4 h-4"}/>
                <span>{totalLikes}</span>
            </Card>
        </div>
      </CardFooter>
    </Card>
  );
}