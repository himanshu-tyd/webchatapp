import { useState } from "react";
import useToast from "./useToast.js";
import { useAuthContext } from "../context/AuthContext";


//HOOK TO LOGOUT
export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const { setUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        showToast("error", data.message);
      }

      setUser(null);                               //SET USER TO NULL IN CONTEXT
      localStorage.removeItem("logged-user");      //REMOVE USER FROM LOCAL STORAGE  
  
      showToast("success", data.message)

    } catch (e) {
      showToast("error", e.error);
   
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
