import { AppSidebar } from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import publishBlogs from "../api/publishBlogs.js";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast.js";

type Props = {};

const BlogPublish = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const token = localStorage.getItem("token")
  const {toast} = useToast();

  const blogPublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      const response = await publishBlogs(title, content,token);
      setTitle("")
      setContent("")
      console.log(response)
      toast({
        title: response.message,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "error publishing blog",
        variant: "destructive"
      });
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarTrigger /> */}
      <div className="flex ml-96 flex-col justify-center align-middle items-center">
        <Card className="p-10 fixed  w-6/12">
          <form onSubmit={(e) => blogPublish(e)} className="flex flex-col gap-4">
            <label htmlFor="Title">Title</label>
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              required
              placeholder="enter title for your blog"
            />

            <label htmlFor="Title">content</label>
            <Textarea
              required
              onChange={(e) => {
                setContent(e.target.value);
              }}
              value={content}
              placeholder="enter content for your blog"
              className="min-h-96"
            />

            <Button>publish</Button>
          </form>
        </Card>
      </div>
    </SidebarProvider>
  );
};

export default BlogPublish;
