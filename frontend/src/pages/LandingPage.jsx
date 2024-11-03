import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LandingPageData } from "../constants/index.js";
import {
  MoonIcon,
  SunIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
  LinkedInLogoIcon
} from "@radix-ui/react-icons";
import extractYear from "../lib/utils.js";
import { Link } from "react-router-dom";

export default function LandingPage() {


  return (
    <div className="min-h-screen bg-gray-100  transition-colors duration-200">
      <div className="gradient"></div>
      <div className="container mx-auto px-4 py-4 relative z-10">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-2xl md:text-3xl font-bold text-roboto">
            <span className="">Web</span>
            <span className="">Chat</span>
            <span className="">App</span>
          </h1>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/himanshu-tyd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Button size="icon" variant="ghost">
                <LinkedInLogoIcon className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://x.com/himanshu_tyd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Button size="icon" variant="ghost">
                <TwitterLogoIcon className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://github.com/himanshu-tyd/WebChatApp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Button size="icon" variant="ghost">
                <GitHubLogoIcon className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </header>

        <main>
          <section className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="">Connect,</span>{" "}
              <span className="">Collaborate,</span>{" "}
              <span className="">Communicate</span>
            </h2>
            <p className="text-xl text-gray-600  mb-8  ">
              Experience seamless communication with WebChatApp
            </p>
            <Link to={"/login"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
              >
                Start Chatting Now
              </Button>
            </Link>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {LandingPageData.map((feature, index) => (
              <Card key={index} className="bg-white ">
                <CardContent className="p-6 flex flex-col items-center ">
                  <feature.icon className="w-12 h-12 mb-4 text-blue-500" />
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600  text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="blue_gradient">Ready to get started?</span>
            </h2>
            <p className="text-xl text-gray-600  mb-8">
              Join thousands of users already enjoying WebChatApp
            </p>
          </section>
        </main>

        <footer className="text-center !font-extralight text-gray-500">
          <p>&copy; {extractYear()} WebChatApp. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
