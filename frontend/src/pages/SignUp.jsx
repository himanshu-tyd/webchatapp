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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import uploadImage from "../lib/uploadImage.js";
import FullLoader from "../components/FullLoader.jsx";
import { toast } from "../hooks/use-toast.js";
import { useSignUp } from "../hooks/useSignup.js";
import { ImpulseSpinner } from "react-spinners-kit";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setloading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const { signup, loading: singInloading } = useSignUp();

  const handleFileUpload = async (e) => {
    setloading(true);

    try {
      const file = e.target.files[0];
      const data = await uploadImage(file);

      setProfileImage(data.url);
      setForm({ ...form, image: data.url });
    } catch (e) {
      toast({ variant: "destructive", title: `${e.error}` });
    } finally {
      setloading(false);
    }
  };

  const handleChange = (e) => {
    let { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
  };

  if (loading) {
    return <FullLoader />;
  }

  return (
    <div className="py-10  ">
      <Card className="w-full max-w-md mx-auto glassmorphism">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={profileImage || ""}
                  alt="Profile picture"
                  className="object-cover"
                />
                <AvatarFallback>UP</AvatarFallback>
              </Avatar>
              <Label
                htmlFor="picture"
                className="cursor-pointer text-sm text-blue-600 hover:underline"
              >
                Upload Profile Picture
              </Label>
              <Input
                id="picture"
                onChange={handleFileUpload}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                onChange={handleChange}
                id="fullName"
                value={form.fullName}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={handleChange}
                id="username"
                value={form.username}
                placeholder="johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={handleChange}
                id="password"
                value={form.password}
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                onChange={handleChange}
                value={form.confirmPassword}
                id="confirmPassword"
                type="password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disable={singInloading.toString()}
            >
              {singInloading ? <ImpulseSpinner /> : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
