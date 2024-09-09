import { useEffect, useState } from "react";
import useToast from "./useToast.js";
import useMessagesStore from "../zustand/useConversation.js";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedChats } = useMessagesStore();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedChats?._id}`);

        const data = await res.json();

        setMessages(data.data);
        
      } catch (e) {
        showToast("error", e.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChats?._id) fetchMessage();
  }, [selectedChats?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
