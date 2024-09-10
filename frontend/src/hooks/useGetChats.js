import { useState, useEffect } from "react";
import useToast from "./useToast";


//CUSTOME HOOKE FOR GETTING CHATS AND MESSAGES
const useGetChats = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const getMessages = async () => {
        setLoading(true)
      try {
        const res = await fetch(`/api/users`,{
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
          return showToast("error", data.message);
        }

        setChats(data.data);

      } catch (e) {
        showToast("error", e.message);
        console.log('ERROR IN GETTING CHATS ->', e);
      }finally{
        setLoading(false)
      }
    };

    getMessages()

  },[]);

  return {loading,chats}

};
export default useGetChats;
