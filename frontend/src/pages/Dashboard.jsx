import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

import { CircleSpinner } from "react-spinners-kit";
import { MenuIcon, LogOutIcon, MessageCircleMoreIcon } from "lucide-react";
import Messages from "./Messages";
import Chats from "./Chats";
import { useAuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout.js";

const Dashboard = () => {
  const [active, setActive] = useState(false);
  const { user } = useAuthContext();

  const { logout, loading } = useLogout();
  const [isMobile, setIsMobile] = useState(false);

  // RESPONSIVE FOR SIDEBAR USERS
  useEffect(() => {
    const handResize = () => {
      const size = window.innerWidth <= 768;
      if (size) {
        setIsMobile(size);
      }
      if (!size) setActive(false);
    };
    handResize();
    window.addEventListener("resize", handResize);

    return () => window.removeEventListener("resize", handResize);
  }, []);

  return (
    <>
      {/* -----------settings section------------------- */}

      <section className="w-full flex  h-screen md:fixed    ">
        <div className="w-[60px] h-screen border-r glassmorphism border-gray-400  flex flex-col items-center  gap-2  ">
          <div className="mt-8">
            <img src="chat.png" width={"40"} height={"40"} />
          </div>

          <div className={`w-full icons mt-10`}>
            <MenuIcon className="text-gray-600" />
          </div>
          <div
            className={`w-full icons  md:bg-gray-200 ${
              active ? "bg-gray-200" : ""
            }  `}
            onClick={isMobile ? () => setActive(true) : null}
          >
            <MessageCircleMoreIcon className={`text-gray-600   `} />
          </div>

          <div className="w-full flex flex-col items-center mt-auto gap-5">
            <div>
              <Avatar className="border border-gray-400">
                <AvatarImage src={user?.image} className="object-cover" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </div>
            <div onClick={logout} className="w-full icons mb-2">
              {loading ? (
                <CircleSpinner size={20} color="#171717" />
              ) : (
                <LogOutIcon className="text-gray-600" />
              )}
            </div>
          </div>
        </div>

        {/* -----------chats section------------------- */}

        <Chats active={active} setActive={setActive} />

        {/* ----------------messsages section-------------- */}

        <Messages />
      </section>
    </>
  );
};

export default Dashboard;
