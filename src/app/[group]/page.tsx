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
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatSkeleton from "@/components/chat-skeleton";
import { useConversation } from "@/contexts/conversation-context";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Message {
  id: number;
  content: string;
  senderId: string;
  conversationId: number;
  status: "PENDING" | "SENT" | "DELIVERED";
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
    enabled: !!selectedConversation.id,
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
    if (message.trim()) {
      mutation.mutate();
    }
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

  const formatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) {
      return "Today";
    } else if (d.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return d.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: d.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  const handleJoinGroup = () => {
    // Implement join group logic
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.createdAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <>
      {!selectedConversation.id ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
          <div className="max-w-md space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Hash className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Select a conversation
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose a conversation from the sidebar to start chatting with your
              community.
            </p>
            <Button onClick={handleJoinGroup} className="mt-4">
              Join Group
            </Button>
          </div>
        </div>
      ) : (
        <TooltipProvider>
          <div className="flex flex-col h-full overflow-hidden">
            {/* Chat Header */}
            <div className="h-16 bg-background border-b px-4 md:px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center min-w-0 flex-1">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mr-3 shrink-0">
                  <Hash className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-foreground truncate">
                    {selectedConversation.title}
                  </h2>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {messages.length} messages
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 md:space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voice call</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Video className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Video call</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 hidden sm:flex"
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Members</p>
                  </TooltipContent>
                </Tooltip>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="sm:hidden">
                      <Users className="mr-2 h-4 w-4" />
                      View Members
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Info className="mr-2 h-4 w-4" />
                      Conversation Info
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6">
              <div className="py-4 max-w-4xl mx-auto">
                {isLoading ? (
                  <ChatSkeleton />
                ) : isError ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center space-y-2">
                      <p className="text-sm text-destructive font-medium">
                        Error loading messages
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {error instanceof Error
                          ? error.message
                          : "An error occurred"}
                      </p>
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-2">
                      <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                        <Hash className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        No messages yet. Start the conversation!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(groupedMessages).map(([date, msgs]) => (
                      <div key={date} className="space-y-4">
                        {/* Date Separator */}
                        <div className="flex items-center justify-center py-2">
                          <div className="px-3 py-1 bg-muted rounded-full">
                            <span className="text-xs font-medium text-muted-foreground">
                              {date}
                            </span>
                          </div>
                        </div>

                        {/* Messages for this date */}
                        {msgs.map((msg) => {
                          const isOwnMessage =
                            msg.senderId === session?.user?.id;
                          return (
                            <div
                              key={msg.id}
                              className={`flex ${
                                isOwnMessage ? "justify-end" : "justify-start"
                              }`}
                            >
                              <div
                                className={`flex max-w-[85%] sm:max-w-lg md:max-w-xl ${
                                  isOwnMessage ? "flex-row-reverse" : "flex-row"
                                }`}
                              >
                                <div
                                  className={`${
                                    isOwnMessage ? "ml-2" : "mr-2"
                                  }`}
                                >
                                  <Card
                                    className={`px-3 py-2 sm:px-4 sm:py-3 ${
                                      isOwnMessage
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-muted border-muted"
                                    }`}
                                  >
                                    <p className="text-sm break-words">
                                      {msg.content}
                                    </p>
                                  </Card>
                                  <div
                                    className={`mt-1 ${
                                      isOwnMessage ? "text-right" : "text-left"
                                    }`}
                                  >
                                    <span className="text-xs text-muted-foreground">
                                      {formatTime(msg.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-3 md:p-6 bg-background border-t shrink-0">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end gap-2 md:gap-3">
                  <div className="flex-1 relative">
                    <Textarea
                      ref={textareaRef}
                      value={message}
                      onChange={handleMessageChange}
                      onKeyDown={handleKeyDown}
                      placeholder={`Message #${selectedConversation.title}`}
                      className="min-h-[48px] max-h-[120px] resize-none pr-20 py-3 text-sm"
                      rows={1}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Paperclip className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Attach file</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Smile className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add emoji</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <Button
                    onClick={sendMessage}
                    disabled={!message.trim() || mutation.isPending}
                    size="icon"
                    className="h-12 w-12 rounded-full shrink-0"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>
      )}
    </>
  );
}
