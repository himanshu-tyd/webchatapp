import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { people } from "../constants";
import ChatsCard from "../components/ChatsCard";
import useGetChats from "../hooks/useGetChats";
import { RotateSpinner } from "react-spinners-kit";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import useToast from "../hooks/useToast";
import useMessagesStore from "../zustand/useConversation";

const Chats = ({ active, setActive }) => {
  const { chats, loading } = useGetChats();
  const [search, setSearch] = useState("");
  const { showToast } = useToast();
  const { setSelectedChats } = useMessagesStore();

  const handleChange = (e) => {
    setSearch(e.target.value);

    if (search.length < 3 || !search) return;

    let fillter = chats.find((c) =>
      c.user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (fillter) {
      setSelectedChats(fillter.user);
    } else {
      return showToast("info", "the user you are lookig for is not found");
    }
  };

  return (
    <>
      <div
        className={`md:w-1/3 h-screen px-1 md:block border-r border-gray-200  glassmorphism  ${
          active ? "w-full  left-0 absolute z-20  " : "hidden"
        } `}
      >
        <div className="mt-2 mb-2 flex ">
          <h1 className="font-semibold text-2xl ">Chats</h1>
          {active && (
            <div
              className="p-2 hover:bg-gray-200 rounded-md border  border-slate-200 md:hidden block ml-auto"
              onClick={() => setActive(false)}
            >
              <ChevronLeft />
            </div>
          )}
        </div>

        <input
          type="text"
          value={search}
          placeholder="Search or start new chat"
          className="input !font-normal "
          onChange={handleChange}
        />

        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <RotateSpinner />
          </div>
        ) : (
          <ScrollArea className="h-full mt-2 w-full">
            <div className="flex flex-col ">
              {chats.map((items, index) => (
                <div key={index} onClick={() => setActive(false)}>
                  <ChatsCard allUsers={items} />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </>
  );
};

export default Chats;
