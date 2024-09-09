import { useState } from "react";
import useToast from "./useToast.js";
import { useAuthContext } from "../context/AuthContext";


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

      setUser(null);
      localStorage.removeItem("logged-user");
      console.log(data);
      showToast("success", data.message);
    } catch (e) {
      showToast("error", e.error);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
