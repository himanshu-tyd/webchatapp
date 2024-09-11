import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useToast from "./useToast.js";

export const useSignUp = () => {
  const [loading, setloading] = useState(false);
  const { setUser } = useAuthContext();
  const { showToast } = useToast();

  const signup = async (form) => {
    setloading(true);
    try {
      const success = validatData(form, showToast);

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
        return showToast("error", "Uh oh! Failed to sign in.", data.message);
      }

      setUser(data.data);
      localStorage.setItem("logged-user", JSON.stringify(data.data));

      showToast("success", data.message);

      return data;
    } catch (e) {
      showToast(
        "error",
        "Uh oh! something went wrong please try after some time.",
        e.message
      );
    } finally {
      setloading(false);
    }
  };

  return { signup, loading };
};

//VALIDATE DATA
//HERE I'M USING Shadcn TOAST DIRECTLY
const validatData = (
  { fullName, username, password, confirmPassword, image },
  showToast
) => {
  const regex = /^[a-z\d_-]*[a-z][a-z\d_-]*$/;

  if (!fullName || !username || !password || !confirmPassword) {
    showToast("error", "All fields are required!.");
    return false;
  }

  if (!regex.test(username)) {
    showToast(
      "error",
      "Uh oh! incorrect username.",
      `Contains no spaces.Contains lowercase letters,You  May include underscores (_) and hyphens (-).`
    );
    return false;
  }
  if (password !== confirmPassword) {
    showToast(
      "error",
      "Uh oh! facing issue while matching password.",
      "please check the password is matching."
    );

    return false;
  }

  if (!image) {
    showToast("error", "Please Upload Profile Picture.");

    return false;
  }
  return true;
};
