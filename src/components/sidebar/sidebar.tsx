import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, Settings, Bell, Loader, Loader2, X } from "lucide-react";
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
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useCategory } from "@/contexts/category-context";
import CategoryIconComponent, {
  categoryColors,
  IconKey,
} from "../CategoryIconComponent";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } =
    useCategory();

  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    data: categories = [],
    isLoading,
    error,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["categories", searchQuery],
    queryFn: async () => {
      const response = await axios.get(`/api/category?name=${searchQuery}`);
      return response.data;
    },
    enabled: debouncedSearch !== undefined,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/groups", {
        name: groupName,
        categoryId,
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      setGroupName("");
      setCategoryId("");
      setOpen(false);
    },
  });

  const handleCreateGroup = () => {
    mutation.mutate();
  };

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
    onItemClick?.();
  };

  if (error)
    return <div className="p-4 text-destructive">Error loading categories</div>;

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Gossipit
          </h1>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-primary/10"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-primary/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 lg:p-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Categories
          </h2>
          <div className="space-y-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-24">
                <Loader className="animate-spin w-5 h-5 text-primary" />
              </div>
            ) : isError ? (
              <div className="text-destructive text-sm text-center py-4">
                Failed to load categories
              </div>
            ) : categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-24 text-muted-foreground">
                <span className="text-sm">No categories found</span>
              </div>
            ) : (
              categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-auto p-3 rounded-lg transition-all hover:scale-[1.02] ${
                    selectedCategory === category.id
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      selectedCategory === category.id
                        ? "bg-primary/20"
                        : "bg-muted"
                    }`}
                  >
                    <CategoryIconComponent
                      iconKey={category.icon.toLowerCase() as IconKey}
                      color={category.color as keyof typeof categoryColors}
                    />
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium truncate">{category.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {category.count || 0} groups
                    </div>
                  </div>
                </Button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Group Button */}
      <div className="p-3 lg:p-4 border-t bg-card/50">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full gap-2 h-11 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-4 h-4" />
              Create New Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Create a conversation to chat about specifics of your choice.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="conversation-title">Name</Label>
                <Input
                  id="conversation-title"
                  value={groupName}
                  onChange={(event) => setGroupName(event.target.value)}
                  placeholder="Enter group name..."
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category-select">Category</Label>
                <Select
                  onValueChange={(value) => setCategoryId(value)}
                  value={categoryId}
                >
                  <SelectTrigger className="w-full" id="category-select">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category: Category) => (
                        <SelectItem
                          value={String(category.id)}
                          key={category.id}
                        >
                          {category.name}
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
              <Button
                onClick={handleCreateGroup}
                disabled={mutation.isPending || !(groupName && categoryId)}
              >
                {mutation.isPending ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Create Group"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export function Sidebar({ isOpen, onClose, isMobile }: SidebarProps) {
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 w-[280px] sm:w-[320px]">
          <SidebarContent onItemClick={onClose} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-80 xl:w-96 border-r flex flex-col h-screen hidden lg:flex">
      <SidebarContent />
    </div>
  );
}
