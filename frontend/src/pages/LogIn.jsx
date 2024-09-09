import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImpulseSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LogIn = () => {
  const [form, setForm] = useState({});
  const { login, loading } = useLogin();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm({ ...form, [id]: value });
    console.log(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="flex items-center justify-between h-screen  ">
      <Card className="w-full max-w-md mx-auto glassmorphism">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={handleChange}
                id="username"
                placeholder="johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input onChange={handleChange} id="password" type="password" />
            </div>
            <Button type="submit" className="w-full" disable={loading}>
              {loading ? <ImpulseSpinner /> : "Log In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-center">
            I don't have an Account?{" "}
            <Link to={"/signup"} className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LogIn;
