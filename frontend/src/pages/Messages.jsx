import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SmileIcon,
  SendHorizonalIcon,
  MessageCircleMoreIcon,
} from "lucide-react";
import useMessagesStore from "../zustand/useConversation.js";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../hooks/useSendMessage.js";
import Message from "./Message.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useSocketContext } from "../context/SocketContex.jsx";


const Messages = () => {
  const [picker, setPicker] = useState(false);
  const [message, setMessage] = useState("");
  const { selectedChats, setSelectedChats } = useMessagesStore();         //ZUSTAND STORE
  const { sendMesage, loading } = useSendMessage();                       //HOOK TO SEND MESSAGES
  const { onlineUsers } = useSocketContext();                             //SOCKET CONTEXT
  const online = onlineUsers.includes(selectedChats?._id);                //CHECKING IF USER IS ONLINE
  const lastOnline = dateFormat(selectedChats?.updatedAt);                //LAST ONLINE
  const inputRef = useRef(null);                                           //FOR SCROLLING




  useEffect(() => {
    const clentUp = () => {
      return setSelectedChats(null);
    };

    clentUp();
  }, [setSelectedChats]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await sendMesage(message);

    setMessage("");
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      const size = window.innerWidth <= 768;
      if (size) setPicker(false);
    });

    return ()=> window.removeEventListener("resize", ()=>{})
  },[]);

  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, []);

  return (
    <>
      {!selectedChats ? (
        <NoSelectedChats />
      ) : (
        <div className="flex flex-col w-full h-screen  ">
          {/* -------------header--------------- */}

          <header className="w-full flex items-center p-5 h-20 bg-white border-b border-gray-200 z-10 sticky top-0 ">
            <div className="flex gap-3 items-center">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={selectedChats.image}
                  className="object-cover"
                />
                <AvatarFallback>{selectedChats?.fullName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <h3 className="font-bold font-inter text-[18px] ">{selectedChats.fullName}</h3>
                <span
                  className={`text-[14px] font-roboto ${
                    online ? "text-green-600 " : "text-gray-600"
                  } `}
                >
                  {online ? "online" : `Last online: ${lastOnline}`}
                </span>
              </div>
            </div>

            <div></div>
          </header>

          {/* -------------messages ------------- */}

          <Message className="sticky top-0" />

          {picker && <Emoji message={message} setMessage={setMessage} />}

          {/* --------------send Message section ------------   */}
          <form
            onSubmit={handleSendMessage}
            className="w-full glassmorphism h-20 border-r  border-gray-200 flex items-center px-5  sticky bottom-0"
          >
            <input
              ref={inputRef}
              value={message}
              className="w-full h-full outline-none bg-transparent text-gray-900"
              placeholder="Type message....."
              onChange={(e) => setMessage(e.target.value)}
              autoFocus={true}
            />

            <div className="flex items-ceneter justify-center gap-2 ">
              <div
                onClick={() => setPicker(!picker)}
                className={` hover:text-[#171717]  p-4 rounded-md   cursor-pointer hidden md:block ${
                  picker ? "text-[#171717]" : "text-gray-600"
                } `}
              >
                <SmileIcon />
              </div>

              <div
                className={`flex justify-center items-center cursor-pointer p-4 rounded-full  duration-300   ${
                  message
                    ? ` ${loading ? "bg-gray-200 " : " bg-blue-400 "} `
                    : " hover:bg-gray-300 bg-gray-200  "
                }  `}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    message && "origin-center -rotate-45  "
                  }  duration-100 `}
                >
                  <SendHorizonalIcon />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Messages;

const NoSelectedChats = () => {
  const { user } = useAuthContext();
  return (
    <div className=" w-full h-full flex-center items-center glassmorphism flex-col ">
      <h1 className="text-2xl font-semibold blue_gradient font-inter ">
        Welcome {user.fullName}
      </h1>
      <p className="text-gray-600 font-roboto text-[14px]">
        Select any chat to start the conversation.
      </p>
      <MessageCircleMoreIcon className="w-28 h-28  " />
    </div>
  );
};

const Emoji = ({ message, setMessage }) => {
  const handleAddEmoj = (e) => {
    setMessage((pre) => pre + e.emoji);
  };

  return (
    <div className="absolute right-0 bottom-20">
      <EmojiPicker
        reactions={true}
        emojiStyle="facebook"
        skinTonesDisabled
        onEmojiClick={(e) => handleAddEmoj(e)}
      />
    </div>
  );
};
