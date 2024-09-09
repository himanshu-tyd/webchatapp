import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "../context/AuthContext";
import useMessagesStore from "../zustand/useConversation.js";
import { dateFormat } from "../lib/utils.js";
import { useEffect } from "react";

const MessageCard = ({ allMessages, loading }) => {
  const { message, createdAt, senderId, newMessage } = allMessages;

  const { user } = useAuthContext();

  let isMe = senderId == user?._id;

  return (
    <div
      className={` ${
        isMe
          ? `flex-end "   `
          : `flex-start ${newMessage ? "shake-animation" : ""}   `
      } md:px-5 px-2 `}
    >
      {loading ? (
        <SkeleTons />
      ) : (
        <div
          className={`flex flex-col ${
            isMe ? "bg-blue-400 text-white " : "bg-white text-black"
          } px-4 py-1 mt-3 rounded-[5px] `}
        >
          <p className={`text-14px ${isMe ? "flex-end" : "flex-start"} w-full`}>
            {message}
          </p>
          <p className="ml-auto text-[12px] ">{dateFormat(createdAt)}</p>
        </div>
      )}
    </div>
  );
};

export default MessageCard;

const SkeleTons = () => {
  return (
    <div className="mt-1 flex gap-1 flex-col ">
      <Skeleton className="h-8 w-[250px] " />
      <Skeleton className="h-8 w-[200px] " />
    </div>
  );
};
