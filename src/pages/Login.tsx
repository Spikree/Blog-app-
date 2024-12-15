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


type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(email,password)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="min-h-screen max-w-full flex flex-col justify-center items-center">
      <Card className="w-96 h-96">
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
            <Button variant={"outline"}>
              Login
            </Button>
            <Label>
              don't have an account{" "}
              <span className="text-red-600">create account</span>
            </Label>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
