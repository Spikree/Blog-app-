import { AppSidebar } from "@/components/shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return <div>
    <SidebarProvider>
      <AppSidebar/>
      <SidebarTrigger className="text-2xl"/> 
    <h1>Home</h1>
    </SidebarProvider>
  </div>;
};

export default Home;
