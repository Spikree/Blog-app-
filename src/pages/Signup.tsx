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
import {signup} from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";


type Props = {};

const Signup = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
 
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signup(username,email, password);
      if(response.accessToken) {
        
        localStorage.setItem('token',response.accessToken);
      }
      toast({
        title: "signed up in successfully",
      });
      setEmail("");
      setPassword("")
      setUsername("");
      navigate("/home")
    } catch (error) {
      toast({
        title: "signup failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="min-h-screen max-w-full flex flex-col justify-center items-center">
      <Card className="w-96 h-full">
        <CardHeader>
          <CardTitle className="text-4xl">Signup</CardTitle>
          <CardDescription>Signup to get access</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3" action="">
          <Label htmlFor="email">Username</Label>
            <Input
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
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
              Signup
            </Button>
            <Label>
              already have an account?{" "}
              <span onClick={() => {navigate("/")}} className="text-red-600">login</span>
            </Label>
          </form>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default Signup;
