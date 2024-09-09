import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContex";
import useMessagesStore from "../zustand/useConversation.js";
import beep from '../assets/sounds/iphone.mp3'

const useListeneEvent = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useMessagesStore();

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      message.newMessage=true
      const sound=new Audio(beep)
      sound.play()
      setMessages([...messages, message]);
    });

    return () => socket?.off("newMessage");
  },[socket,messages,setMessages]);
};

export default useListeneEvent
