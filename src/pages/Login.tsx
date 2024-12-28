import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import {login} from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
 
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if(response.accessToken) {
        
        localStorage.setItem('token',response.accessToken);
      }
      toast({
        title: "Logged in successfully",
      });
      setEmail("");
      setPassword("")
      navigate("/home");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="min-h-screen max-w-full flex flex-col justify-center items-center align-middle">
      <Card className="w-96 h-full">
        <CardHeader>
          <CardTitle className="text-4xl">Login</CardTitle>
          <CardDescription>Login to get access</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3" action="">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Label htmlFor="email">Password</Label>
            <Input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button  type="submit" variant={"outline"}>
              Login
            </Button>
            <Label>
              don't have an account?{" "}
              <span className="text-red-600" onClick={() => {navigate('/create-account')}}>create account</span>
            </Label>
          </form>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default Login;
