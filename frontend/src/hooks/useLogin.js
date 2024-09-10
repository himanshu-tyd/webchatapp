import { useState } from "react";
import useToast from "./useToast.js";
import { useAuthContext } from "../context/AuthContext.jsx";

export const useLogin = () => {
  const [loading, setloading] = useState(false);

  const { showToast } = useToast();
  const { setUser } = useAuthContext();

  const login = async ({ username, password }) => {
    setloading(true);
    try {
      const success = validateData(username, password, showToast);

      if (!success) return;

      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return showToast("error", data.message);
      }

      
      setUser(data.data);                                             //SET USER IN CONTEXT
      localStorage.setItem("logged-user", JSON.stringify(data.data)); //SET USER IN LOCAL STORAGE

      showToast("success", data.message); 

      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setloading(false);
    }
  };

  return { login, loading };
};


//VALIDATION FUNCTION
const validateData = (username, password, showToast) => {
  const regex = /^[a-z\d_-]*[a-z][a-z\d_-]*$/;

  if (!username || !password) {
    showToast("error", "Fields are required.", "please fill all details.");
    return false;
  }

  if (!regex.test(username)) {
    showToast(
      "error",
      "Uh oh! incorrect username.",
      "Contains no spaces.Contains lowercase letters,You  May include underscores (_) and hyphens (-)."
    );

    return false;
  }

  return true;
};
