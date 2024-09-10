/* eslint-disable react/prop-types */
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "../context/AuthContext";
import { dateFormat } from "../lib/utils.js";

const MessageCard = ({ allMessages, loading }) => {
  const { message, createdAt, senderId, newMessage } = allMessages;
  const { user } = useAuthContext();
  let isMe = senderId == user?._id;

  return (
    <div
      className={`md:px-5  px-2 ${
        isMe
          ? `flex-end "   `
          : `flex-start ${newMessage ? "shake-animation" : ""}` // ANIMATION FOR NEW MESSAGES
      }  `}
    >
      {loading ? (
        <SkeleTons />
      ) : (
        <div
          className={`flex flex-col shadow-lg ${
            isMe ? "bg-blue-400 text-white " : "bg-white text-black"
          } px-4 py-2 mt-2 rounded-[5px] `}
        >
          <p
            className={`text-[14px] font-inter ${
              isMe ? "flex-end" : "flex-start"
            } w-full`}
          >
            {message}
          </p>
          <p className={`ml-auto text-[12px] font-roboto ${isMe ? "" : "text-gray-600"}  `}>
            {dateFormat(createdAt)}
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageCard;

// SKELETONS FOR MESSAGE CARD TO SHOW WHILE LOADING
const SkeleTons = () => {
  return (
    <div className="mt-1 flex gap-1 flex-col ">
      <Skeleton className="h-8 w-[250px] " />
      <Skeleton className="h-8 w-[200px] " />
    </div>
  );
};
