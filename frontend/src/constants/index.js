import { MessageCircle } from "lucide-react";
import {
  LightningBoltIcon,
  LockClosedIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { p1, p2, p3, p4 } from "../assets";

const LandingPageData = [
  {
    icon: MessageCircle,
    title: "Real-time Messaging",
    description: "Instant communication with friends and colleagues",
  },
  {
    icon: VideoIcon,
    title: "Video Calls",
    description: "Face-to-face conversations with crystal clear quality",
  },
  {
    icon: LockClosedIcon,
    title: "Secure Chats",
    description: "End-to-end encryption for your privacy",
  },
  {
    icon: LightningBoltIcon,
    title: "Lightning Fast",
    description: "Optimized performance for smooth chatting experience",
  },
];

const people = [
  {
name: "Anil",
    message: "April fool’s day",
    time: "Today, 9.52pm",
    status: "✔✔",
    photo: p1,
  },
  {
    name: "Chuuthiya",
    message: "Baag",
    time: "Today, 12.11pm",
    status: "1",
    photo: p2,
  },
  {
    name: "Mary ma’am",
    message: "You have to report it...",
    time: "Today, 2.40pm",
    status: "1",
    photo: p3,
  },
  {
    name: "Bill Gates",
    message: "Nevermind bro",
    time: "Yesterday, 12.31pm",
    status: "5",
    photo: p4,
  },
  {
    name: "Victoria H",
    message: "Okay, brother. let’s see...",
    time: "Wednesday, 11.12am",
    status: "✔",
    photo: p1,
  },
  {
    name: "Chuuthiya",
    message: "Baag",
    time: "Today, 12.11pm",
    status: "1",
    photo: p2,
  },
  {
    name: "Chuuthiya",
    message: "Baag",
    time: "Today, 12.11pm",
    status: "1",
    photo: p2,
  },
  {
    name: "Chuuthiya",
    message: "Baag",
    time: "Today, 12.11pm",
    status: "1",
    photo: p2,
  },
];

const conversation = [
  {
    sender: "Anil",
    time: "8:30pm",
    message: "Hey There!",
  },
  {
    sender: "Anil",
    time: "8:30pm",
    message: "How are you?",
  },
  {
    sender: "You",
    time: "8:33pm",
    message: "Hello!",
  },
  {
    sender: "You",
    time: "8:34pm",
    message: "I am fine and how are you?",
  },
  {
    sender: "Anil",
    time: "8:36pm",
    message: "I am doing well, Can we meet tomorrow?",
  },
  {
    sender: "You",
    time: "8:58pm",
    message: "Yes Sure!",
  },
];

export { LandingPageData, people, conversation };
