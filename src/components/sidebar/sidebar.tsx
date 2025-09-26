import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, Settings, Bell, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { useCategory } from "@/contexts/category-context";
import CategoryIconComponent, {
  categoryColors,
  IconKey,
} from "../CategoryIconComponent";


import axios from "axios";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export function Sidebar() {
  const {
    data: categories,
    isLoading,
    error,
    isError
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/api/category");
      return response.data;
    },
  });

  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } =
    useCategory();

  if (error) return <div>Error loading categories</div>;
  return (
    <div className="w-96 bg-card border-r flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Gossipit</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Categories
          </h2>
          <div className="space-y-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-12">
                <Loader className="animate-spin w-5 h-5 text-muted-foreground" />
              </div>
            ) : isError ? (
              <div className="text-red-500 text-sm">
                Failed to load categories
              </div>
            ) : (
              categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "secondary" : "ghost"
                  }
                  className={`w-full justify-start gap-3 h-auto p-3 ${
                    selectedCategory === category.id &&
                    "bg-primary/10 text-primary border border-primary/20"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CategoryIconComponent
                    iconKey={category.icon.toLowerCase() as IconKey}
                    color={category.color as keyof typeof categoryColors}
                  />

                  <div className="flex-1 text-left">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.count ? category.count : 0} groups
                    </div>
                  </div>
                </Button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Group Button */}
      <div className="p-4 border-t">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Create New Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Conversation</DialogTitle>
              <DialogDescription>
                Create a conversation to chat about specifics of your choice.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="conversation-title">Title</Label>
                <Input
                  id="conversation-title"
                  // onChange={(event) =>
                  //   setConversastionTitle(event.target.value)
                  // }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Group</Label>
                <Select
                  onValueChange={(value) => console.log("Selected Id: ", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Conversation Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Groups</SelectLabel>
                      {/* {groups.map((group: Group) => (
                        <SelectItem value={group.id} key={group.id}>
                          {group.name}
                        </SelectItem>
                      ))} */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
