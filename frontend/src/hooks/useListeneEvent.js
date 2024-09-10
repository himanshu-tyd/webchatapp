import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContex";
import useMessagesStore from "../zustand/useConversation.js";
import beep from '../assets/sounds/iphone.mp3'



// FUNCTION THAT WILL LISTENE TO  newMessage EVENT 
const useListeneEvent = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useMessagesStore(); //GLOBAL STORE ZUSTAND

  useEffect(() => {
    // WHEN WE GET A newMessage EVENT FROM THE SERVER, WE WILL UPDATE OUR GLOBAL STATE BY ADDING THE NEW MESSAGE TO THE EXISTING ONES
    const handleNewMessage = (message) => {
      message.newMessage=true
      const sound=new Audio(beep)
      sound.play()
      setMessages([...messages, message]);
    }
    socket?.on("newMessage", handleNewMessage);

    // WHEN WE UNMOUNT THE COMPONENT, WE WILL REMOVE THE EVENT LISTENER SO WE DONT HAVE MEMORY LEAKS
    return () => socket?.off("newMessage", handleNewMessage);
  },[socket,messages,setMessages]);
};

export default useListeneEvent
