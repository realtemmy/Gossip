"use client";
import React, { useState, useRef, useEffect, use } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Send,
  Hash,
  Users,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useConversation } from "@/contexts/conversation-context";
import axios from "axios";

interface Message {
  id: number;
  content: string;
  senderId: string;
  conversationId: number;
  status: "sent" | "delivered" | "read";
  // user: string;
  // avatar: string;
  createdAt: Date;
}

export default function ChatPage() {
  const { selectedConversation } = useConversation();
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     id: 1,
  //     user: "Sarah Chen",
  //     avatar:
  //       "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  //     content:
  //       "Hey everyone! Just pushed the latest updates to the staging environment. Could you all take a look?",
  //     timestamp: new Date(Date.now() - 1000 * 60 * 5),
  //   },
  //   {
  //     id: 2,
  //     user: "Mike Rodriguez",
  //     avatar:
  //       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  //     content:
  //       "Looks great! The new UI components are really smooth. Nice work on the animations.",
  //     timestamp: new Date(Date.now() - 1000 * 60 * 3),
  //   },
  //   {
  //     id: 3,
  //     user: "You",
  //     avatar:
  //       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  //     content:
  //       "Thanks! I spent extra time on the micro-interactions. Glad you noticed!",
  //     timestamp: new Date(Date.now() - 1000 * 60 * 1),
  //     isOwn: true,
  //   },
  // ]);

  const {
    data: messages = [],
    isLoading,
    error,
  } = useQuery<Message[]>({
    queryKey: ["messages", selectedConversation.id],
    queryFn: async () => {
      const response = await axios.get(
        `../api/messaages/${selectedConversation.id}`
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

  const sendMessage = async () => {
    const response = await axios.post(`../api/messages`, {
      content: message, senderId: "", conversationId: selectedConversation.id,
    });
  }

  // const sendMessage = () => {
  //   if (message.trim()) {
  //     const newMessage: Message = {
  //       id: Date.now().toString(),
  //       user: "You",
  //       avatar:
  //         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  //       content: message,
  //       timestamp: new Date(),
  //       isOwn: true,
  //     };
  //     // setMessages([...messages, newMessage]);
  //     setMessage("");

  //     // Reset textarea height
  //     setTimeout(() => {
  //       if (textareaRef.current) {
  //         textareaRef.current.style.height = "auto";
  //       }
  //     }, 0);
  //   }
  // };

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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-2xl ${
                      msg.isOwn ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {!msg.isOwn && (
                      <Avatar className="w-10 h-10 mr-3 flex-shrink-0">
                        <AvatarImage src={msg.avatar} alt={msg.user} />
                        <AvatarFallback>{getInitials(msg.user)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`${msg.isOwn ? "mr-3" : ""}`}>
                      {!msg.isOwn && (
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-foreground text-sm">
                            {msg.user}
                          </span>
                          <span className="text-muted-foreground text-xs ml-2">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      )}
                      <Card
                        className={`px-4 py-3 ${
                          msg.isOwn
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </Card>
                      {msg.isOwn && (
                        <div className="text-right mt-1">
                          <span className="text-muted-foreground text-xs">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
                disabled={!message.trim()}
                className="h-12 w-12 rounded-full p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
