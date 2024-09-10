/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useToast from "./useToast.js";
import useMessagesStore from "../zustand/useConversation.js";

//HOOK TO GET MESSAGES WHEN USET GET SELECTED 
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedChats } = useMessagesStore(); //GLOBAL STORE
  const { showToast } = useToast(); //CUSTOME TOAST HOOK

  useEffect(() => {

    //FUNCTION TO CALL API-END-POINT
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedChats?._id}`); //API END-POINT

        const data = await res.json();

        setMessages(data.data);  //SET MESSAGES IN ZUSTAND
        
      } catch (e) {
        showToast("error", e.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChats?._id) fetchMessage();  //CALL FUNCTION IF SELECTED CHATS EXISTS

  }, [selectedChats?._id, setMessages]); 

  return { messages, loading };
};

export default useGetMessages;
