"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Hash, Settings, Search, Plus, Loader2, Menu, X } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useConversation } from "@/contexts/conversation-context";
import { useDebounce } from "@/hooks/useDebounce";
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [conversationTitle, setConversastionTitle] = useState<string>("");
  const [converstionGroupId, setConversationGroupId] = useState<number>(0);
  const [conversations, setConversations] = useState<Conversation[] | []>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { setSelectedConversation } = useConversation();

  const { data, isLoading, isError, error } = useQuery<Group>({
    queryKey: ["conversations", group],
    queryFn: async () => {
      const response = await axios.get(`../api/groups/${group}`);
      setConversations(response.data.conversations);
      return response.data;
    },
  });

  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    isLoading: convoLoading,
    isError: isConvoError,
    error: convoError,
  } = useQuery({
    queryKey: ["conversation", `search-${searchQuery}`],
    queryFn: async () => {
      const response = await axios.get(
        `../api/conversation?title=${searchQuery}&groupId=${data?.id}`
      );
      setConversations(response.data);
      return response.data;
    },
    enabled: !!data?.id && !!debouncedSearch,
  });

  const {
    data: groups,
    isLoading: groupLoading,
    isError: isGroupError,
    error: groupError,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await axios.get("../api/groups");
      return response.data;
    },
    enabled: open,
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
      setOpen(false);
      setConversastionTitle("");
      setConversationGroupId(0);
    },
  });

  const handleCreateConversation = () => {
    if (conversationTitle && converstionGroupId) {
      mutation.mutate();
    }
  };

  const handleConversationClick = (convo: Conversation) => {
    setActiveChannel(convo.title);
    setSelectedConversation({
      title: convo.title,
      id: convo.id,
    });
    setSidebarOpen(false); // Close mobile sidebar
  };

  if (!data || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center space-y-3 p-6">
          <p className="text-destructive font-semibold">Error loading data</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            GossipIt
          </h1>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-10 h-10"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="px-4 py-2 flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {data.name || "Conversations"}
          </h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-primary/10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Conversation</DialogTitle>
                <DialogDescription>
                  Create a new conversation to chat about specific topics.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="conversation-title">Title</Label>
                  <Input
                    id="conversation-title"
                    placeholder="Enter conversation title"
                    value={conversationTitle}
                    onChange={(event) =>
                      setConversastionTitle(event.target.value)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="group-select">Group</Label>
                  <Select
                    value={converstionGroupId.toString()}
                    onValueChange={(value) =>
                      setConversationGroupId(Number(value))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Groups</SelectLabel>
                        {groupLoading ? (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : isGroupError ? (
                          <div className="px-2 py-1 text-xs text-destructive">
                            Error: {groupError.message}
                          </div>
                        ) : (
                          groups?.map((group: Group) => (
                            <SelectItem value={group.id} key={group.id}>
                              {group.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={handleCreateConversation}
                  disabled={
                    mutation.isPending ||
                    !conversationTitle ||
                    !converstionGroupId
                  }
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1 pr-3">
            {convoLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : isConvoError ? (
              <div className="text-xs text-destructive p-3 bg-destructive/10 rounded-md">
                Error: {convoError.message}
              </div>
            ) : conversations.length > 0 ? (
              conversations.map((convo) => (
                <Button
                  key={convo.id}
                  variant="ghost"
                  onClick={() => handleConversationClick(convo)}
                  className={`w-full justify-between px-3 py-2.5 h-auto text-left font-normal transition-all ${
                    activeChannel === convo.title
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <div className="flex items-center min-w-0">
                    <Hash className="mr-2 h-4 w-4 shrink-0" />
                    <span className="text-sm truncate">{convo.title}</span>
                  </div>
                  {convo.unread > 0 && (
                    <Badge
                      variant="destructive"
                      className="h-5 min-w-[20px] text-xs px-1.5 ml-2 shrink-0"
                    >
                      {convo.unread > 99 ? "99+" : convo.unread}
                    </Badge>
                  )}
                </Button>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-8">
                No conversations found.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 flex-col border-r">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-background shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">GossipIt</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {children}
      </div>
    </div>
  );
}
