"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Hash, Settings, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useConversation } from "@/contexts/conversation-context";

import axios from "axios";
import { Label } from "@/components/ui/label";

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
  const queryClient = useQueryClient();
  const { group } = params;
  const [activeChannel, setActiveChannel] = useState("");
  const [conversationTitle, setConversastionTitle] = useState<string>("");
  const [converstionGroupId, setConversationGroupId] = useState<number>(0);
  const { setSelectedConversation } = useConversation();

  const { data, isLoading, isError, error } = useQuery<Group>({
    queryKey: ["conversations", group],
    queryFn: async () => {
      const response = await axios.get(`../api/group/${group}`);
      return response.data;
    },
  });

  const { data: groups } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await axios.get("../api/group");
      // console.log("Groups: ", response.data);
      return response.data;
    },
    // enabled:
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("../api/conversation", {
        title: conversationTitle,
        group_id: converstionGroupId,
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const handleCreateConversation = () => {
    mutation.mutate()
  };

  if (!data || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return <div>There was an error: {error.message}</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80  flex flex-col border-r">
        {/* Header */}
        <div className="p-4 border-b ">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">GossipIt</h1>
            <Button variant="ghost" size="sm" className="">
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
              className="pl-10 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Groups */}
        <ScrollArea className="flex-1">
          <div className="px-4 py-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide">
                {data.name || "Conversations"}
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Conversation</DialogTitle>
                    <DialogDescription>
                      Create a conversation to chat about specifics of your
                      choice.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="conversation-title">Title</Label>
                      <Input
                        id="conversation-title"
                        onChange={(event) =>
                          setConversastionTitle(event.target.value)
                        }
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Group</Label>
                      <Select
                        onValueChange={(value) =>
                          console.log("Selected Id: ", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Conversation Group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Groups</SelectLabel>
                            {groups.map((group: Group) => (
                              <SelectItem value={group.id} key={group.id}>
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleCreateConversation}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-1">
              {data &&
              Array.isArray(data.conversations) &&
              data.conversations.length > 0 ? (
                data.conversations.map((convo) => (
                  <Button
                    key={convo.id}
                    variant="ghost"
                    onClick={() => {
                      setActiveChannel(convo.title);
                      setSelectedConversation({
                        title: convo.title,
                        id: convo.id,
                      });
                    }}
                    className={`w-full justify-between px-3 py-2 h-auto text-left font-normal hover:text-white ${
                      activeChannel === convo.title
                        ? "bg-slate-800 text-white hover:bg-slate-600"
                        : "text-slate-600 hover:bg-slate-600 hover:text-white"
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
                ))
              ) : (
                <div className="text-sm">No conversations found.</div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
