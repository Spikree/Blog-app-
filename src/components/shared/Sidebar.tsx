import { Book, LogOutIcon, SquarePlus, StickyNote } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function AppSidebar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const route = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!token) {
    return null;
  }

  return (
    <div className="z-50">
      <Sidebar className="flex gap-10">
        <SidebarHeader className="flex flex-row gap-10 items-center">
          <h1 className="text-2xl font-bold">Blog app</h1>
        </SidebarHeader>
        <br />
        <SidebarContent>
          <SidebarGroup className="flex gap-4">
          <Link to="/home">
            <SidebarMenuButton
              variant={route.pathname === "/home" ? "outline" : "default"}
              className="text-xl"
            >
              <StickyNote />
              Blogs
            </SidebarMenuButton>
            </Link>

            <Link to="/publish">
            <SidebarMenuButton
              variant={route.pathname === "/publish" ? "outline" : "default"}
              className="text-xl"
            >
              <SquarePlus />
              Publish a blog
            </SidebarMenuButton>
            </Link>

            <Link to={"/user-blogs"}>
            <SidebarMenuButton
              variant={route.pathname === "/user-blogs" ? "outline" : "default"}
              className="text-xl"
            >
              <Book />
              Your blogs
            </SidebarMenuButton>
            </Link>

          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-8">
          <SidebarMenuButton onClick={() => logout()} className="text-xl">
            <LogOutIcon size={24} />
            Logout
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
