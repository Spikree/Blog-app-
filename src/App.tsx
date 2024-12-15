import Login from "./pages/Login";
import { Toaster } from "@/components/ui/toaster"
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

type Props = {};

const App = (props: Props) => {
  const navigate = useNavigate();

  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/create-account" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
