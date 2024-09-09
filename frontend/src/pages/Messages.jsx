import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SmileIcon,
  SendHorizonalIcon,
  MessageCircleMoreIcon,
  Send,
} from "lucide-react";
import { CircleSpinner, FlapperSpinner } from "react-spinners-kit";
import useMessagesStore from "../zustand/useConversation.js";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../hooks/useSendMessage.js";
import Message from "./Message.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useSocketContext } from "../context/SocketContex.jsx";
import { dateFormat } from "../lib/utils.js";

const Messages = () => {
  const inputRef = useRef(null);
  const { selectedChats, setSelectedChats } = useMessagesStore();
  const { sendMesage, loading } = useSendMessage();
  const [message, setMessage] = useState("");
  const [picker, setPicker] = useState(false);
  const { onlineUsers } = useSocketContext();

  const online = onlineUsers.includes(selectedChats?._id);
  const lastOnline = dateFormat(selectedChats?.updatedAt);

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
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <h3 className="font-bold">{selectedChats.fullName}</h3>
                <span
                  className={`text-[14px] ${
                    online ? "text-green-600 " : "text-gray-600"
                  } `}
                >
                  {online ? "online" : `last online: ${lastOnline}`}
                </span>
              </div>
            </div>

            <div></div>
          </header>

          {/* -------------messages ------------- */}

          <Message className='sticky top-0' />

          {picker && <Emoji message={message} setMessage={setMessage}  />}

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
      <h1 className="text-2xl font-semibold blue_gradient ">
        Welcome {user.fullName}
      </h1>
      <p className="text-gray-600">
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
