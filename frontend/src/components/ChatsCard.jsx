import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMessagesStore from "../zustand/useConversation.js";
import { dateFormat } from "../lib/utils.js";
import useToast from "../hooks/useToast.js";
import { useSocketContext } from "../context/SocketContex.jsx";

const ChatsCard = ({ allUsers }) => {
  const { user, lastMessage } = allUsers;
  
  const {onlineUsers}= useSocketContext()

  const { selectedChats, setSelectedChats } = useMessagesStore();

  let lastDate = dateFormat(lastMessage?.createdAt);

  let isSelected = selectedChats?._id === user?._id;

  const isOnline=onlineUsers.includes(user?._id)


  return (
    <div
      className={`w-full h-15  flex hover:bg-gray-100 hover:cursor-pointer duration-100 items-center px-2 ${
        isSelected ? "bg-gray-100" : ""
      } `}
      onClick={() => setSelectedChats(user)}
    >
      <div>
        <div className={` ${isOnline ?  'w-2 h-2 bg-green-400 absolute rounded-full z-10 shadow-lg ' : ''} `}></div>
        <Avatar>
          <AvatarImage src={user?.image} className="object-cover"></AvatarImage>
          <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full ml-3 flex flex-col ">
        <div className="w-full flex">
          <h2 className="text-inter font-bold">{user?.fullName}</h2>
          <span className="text-gray-600 ml-auto text-[12px] ">{lastDate}</span>
        </div>
        <p className="text-[14px]">
          {lastMessage == null
            ? "Start new chat."
            : `${lastMessage.message}`}
        </p>
      </div>
    </div>
  );
};

export default ChatsCard;
