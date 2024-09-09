import useToast from "./useToast.js";
import useMessagesStore from "../zustand/useConversation.js";
import { useState } from "react";


const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { selectedChats, setMessages, messages } = useMessagesStore();

  const sendMesage = async (message) => {

    if (message == "") {
      return showToast("warning", "Please type something to send message.");
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/messages/send/${selectedChats._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const data = await res.json();
        return showToast("error", data.message);
      }

      const data = await res.json();

      const newMessage=data.data

      setMessages([...messages, newMessage]);

    } catch (e) {
      showToast("error", e.message);

    } finally {
      setLoading(false);
    }
  };

  return { sendMesage, loading };
};

export default useSendMessage;
