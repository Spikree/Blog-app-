import Login from "./pages/Login";
import { Toaster } from "@/components/ui/toaster";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BlogPublish from "./pages/BlogPublish";
import UserBlogs from "./pages/UserBlogs";
import Blog from "./pages/Blog";
import { Card } from "./components/ui/card";
import { SidebarTrigger, SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/shared/Sidebar";

type Props = {};

const App = (props: Props) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }

  

  return (
    <SidebarProvider>
      <div>
        {token ? <Card className="block md:hidden m-3 p-2">
          <AppSidebar />
          <SidebarTrigger />
        </Card> : null}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/publish" element={<BlogPublish />} />
          <Route path="/user-blogs" element={<UserBlogs />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default App;
