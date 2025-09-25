"use client";
import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Send,
  Hash,
  Users,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChatSkeleton from "@/components/chat-skeleton";

import { useConversation } from "@/contexts/conversation-context";
import { useSession } from "next-auth/react";

import axios from "axios";

interface Message {
  id: number;
  content: string;
  senderId: string;
  conversationId: number;
  status: "PENDING" | "SENT" | "DEELIVERED";
  createdAt: Date;
}

export default function ChatPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { selectedConversation } = useConversation();
  const [message, setMessage] = useState("");

  const {
    data: messages = [],
    isLoading,
    isError,
    error,
  } = useQuery<Message[]>({
    queryKey: ["messages", selectedConversation.id],
    queryFn: async () => {
      const response = await axios.get(
        `../api/messages/${selectedConversation.id}`
      );
      return response.data;
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  const mutation = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async () => {
      const response = await axios.post(`../api/messages`, {
        content: message,
        senderId: session?.user?.id,
        conversationId: selectedConversation.id,
      });
      console.log("Message sent: ", response.data);
      return response.data;
    },
    onSuccess: async () => {
      setMessage("");
      adjustTextareaHeight();
      await queryClient.invalidateQueries({
        queryKey: ["messages", selectedConversation.id],
      });
    },
  });

  const sendMessage = () => {
    mutation.mutate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const formatTime = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleJoinGroup = () => {};

  return (
    <>
      {!selectedConversation.id ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Select a conversation
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Choose a conversation from the left to start chatting.
          </p>
          <Button onClick={handleJoinGroup}>Join Group</Button>
        </div>
      ) : (
        <>
          {/* Chat Header */}
          <div className="h-16 bg-background border-b px-6 flex items-center justify-between">
            <div className="flex items-center">
              <Hash className="mr-2 text-muted-foreground h-5 w-5" />

              <div>
                <h2 className="font-semibold text-foreground">
                  {selectedConversation.title || "No conversation selected"}
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip>
                <TooltipTrigger>
                  <Phone className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voice call</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Video className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Video call</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Users className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Users</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <MoreVertical className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>More</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-4">
              {isLoading ? (
                <ChatSkeleton />
              ) : isError ? (
                <div className="text-red-500">
                  Error:{" "}
                  {error instanceof Error ? error.message : "An error occurred"}
                </div>
              ) : messages.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center ">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === session?.user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-2xl ${
                        msg.senderId === session?.user?.id
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <div
                        className={`${
                          msg.senderId === session?.user?.id ? "mr-3" : ""
                        }`}
                      >
                        <Card
                          className={`px-4 py-3 ${
                            msg.senderId === session?.user?.id
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-car"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </Card>

                        <div className="text-right mt-">
                          <span className="text-muted-foreground text-xs">
                            {formatTime(msg.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-6 bg-background border-t">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleMessageChange}
                    onKeyDown={handleKeyDown}
                    placeholder={`Message ${"#"}${selectedConversation.title}`}
                    className="min-h-[48px] max-h-[120px] resize-none pr-20 py-3"
                    rows={1}
                  />
                  <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!message.trim() || mutation.isPending}
                className="h-12 w-12 rounded-full p-0"
              >
                {mutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
