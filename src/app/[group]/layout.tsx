"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Hash, Users, Settings, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import axios from "axios";

interface Group {
  id: string;
  name: string;
  slug: string;
  members: number;
  trending: boolean;
  verified: boolean;
  lastActive: string;
  conversations?: Conversation[];
}

type Conversation = {
  id: number;
  title: string;
  unread: number;
  group_id: number;
};

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const params = useParams();
  const { group } = params;
  const [activeChannel, setActiveChannel] = useState(0);

  // const [channels] = useState<Group[]>([
  //   {
  //     id: "general",
  //     name: "general",
  //     type: "channel",
  //     members: 42,
  //     isActive: true,
  //   },
  //   { id: "design", name: "design", type: "channel", members: 28, unread: 3 },
  //   { id: "engineering", name: "engineering", type: "channel", members: 15 },
  //   {
  //     id: "marketing",
  //     name: "marketing",
  //     type: "channel",
  //     members: 8,
  //     unread: 1,
  //   },
  //   { id: "random", name: "random", type: "channel", members: 35 },
  //   { id: "sarah", name: "Sarah Chen", type: "dm" },
  //   { id: "mike", name: "Mike Rodriguez", type: "dm", unread: 2 },
  // ]);

  const { data, isLoading, isError, error } = useQuery<Group>({
    queryKey: ["conversations", group],
    queryFn: async () => {
      const response = await axios.get(`../api/group/${group}`);
      return response.data;
    },
  });

  if (!data || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-slate-900 text-white flex flex-col border-r">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-white">GossipIt</h1>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-slate-800"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search channels, people..."
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        

        {/* Channels */}
        <ScrollArea className="flex-1">
          <div className="px-4 py-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                {data.name || "Conversations"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-800 h-6 w-6 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {data.conversations?.map((convo, index) => (
                <Button
                  key={convo.id}
                  variant="ghost"
                  onClick={() => setActiveChannel(index)}
                  className={`w-full justify-between px-3 py-2 h-auto text-left font-normal ${
                    activeChannel === index
                      ? "bg-blue-600 text-white hover:bg-blue-600"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <Hash className="mr-2 h-4 w-4" />
                    <span className="text-sm">{convo.title}</span>
                  </div>
                  {convo.unread && (
                    <Badge
                      variant="destructive"
                      className="h-5 min-w-[20px] text-xs px-1.5"
                    >
                      {convo.unread}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                Direct Messages
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-800 h-6 w-6 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {/* <div className="space-y-1">
              {channels
                .filter((c) => c.type === "dm")
                .map((channel) => (
                  <Button
                    key={channel.id}
                    variant="ghost"
                    onClick={() => setActiveChannel(channel.id)}
                    className={`w-full justify-between px-3 py-2 h-auto text-left font-normal ${
                      activeChannel === channel.id
                        ? "bg-blue-600 text-white hover:bg-blue-600"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      <span className="text-sm">{channel.name}</span>
                    </div>
                    {channel.unread && (
                      <Badge
                        variant="destructive"
                        className="h-5 min-w-[20px] text-xs px-1.5"
                      >
                        {channel.unread}
                      </Badge>
                    )}
                  </Button>
                ))}
            </div> */}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
