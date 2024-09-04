import { useState } from "react";
import { useToast } from "./use-toast.js";
import { useAuthContext } from "../context/AuthContext";


export const useSignUp = () => {
  const [loading, setloading] = useState(false);
  const { toast } = useToast();
  const {setUser} =useAuthContext()
  

  const signup = async (form) => {
    setloading(true);
    try {
      const success = validatData(form, toast);

      if (!success) return;
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: "Uh oh! Failed to sign in.",
          description: `${data.message}`,
        });
      }



      
      console.log('user data->',data);
      setUser(data.data)
       console.log('local storage',localStorage.setItems('logged-user',JSON.stringify(data.data)))
      
      toast({
        variant: "Success",
        title: `${data.message}`,
      });
      return data;
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! something went wrong please try after some time.",
        description: `${e.error}`,
      });
    } finally {
      setloading(false);
    }
  };

  return { signup, loading };
};

const validatData = (
  { fullName, username, password, confirmPassword, image },
  toast
) => {
  const regex = /^[a-z\d_-]*[a-z][a-z\d_-]*$/;

  if (!fullName || !username || !password || !confirmPassword) {
    toast({
      variant: "destructive",
      title: "All fields are required!.",
    });
    return false;
  }

  if (!regex.test(username)) {
    toast({
      variant: "destructive",
      title: "Uh oh! incorrect username.",
      description: `Contains no spaces.Contains lowercase letters,You  May include underscores (_) and hyphens (-).`,
    });
    return false;
  }
  if (password !== confirmPassword) {
    toast({
      variant: "destructive",
      title: "Uh oh! facing issue while matching password.",
      description: "please check the password is matching.",
    });

    return false;
  }

  if (!image) {
    toast({
      variant: "destructive",
      title: "Please Upload Profile Picture.",
    });

    return false;
  }
  return true;
};
