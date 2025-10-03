"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Users,
  Hash,
  MessageCircle,
  TrendingUp,
  Crown,
  Loader2,
  Sparkles,
  BadgeCheck,
  CreditCard,
  Bell,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useCategory } from "../contexts/category-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/sidebar/sidebar";

import CategoryIconComponent, {
  categoryColors,
  IconKey,
} from "@/components/CategoryIconComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { timeAgo } from "@/lib/timeAgo";
import { useSession, signOut } from "next-auth/react";

import axios from "axios";
import { Input } from "@/components/ui/input";

interface ChatGroup {
  id: string;
  name: string;
  members: number;
  slug: string;
  lastActive: string;
  trending?: boolean;
  verified?: boolean;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  groups: ChatGroup[];
  count: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function HomePage() {
  const { data } = useSession();
  const user = data?.user;

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [groupSearchQuery, setGroupSearchQuery] = useState("");

  const { selectedCategory } = useCategory();

  const {
    data: category,
    isLoading,
    isError,
  } = useQuery<Category | null>({
    queryKey: ["groups", selectedCategory],
    queryFn: async () => {
      const response = await axios.get(`/api/category/${selectedCategory}`);
      return response.data;
    },
    enabled: !!selectedCategory,
  });

  const filteredGroups =
    category?.groups.filter((group) =>
      group.name.toLowerCase().includes(groupSearchQuery.toLowerCase())
    ) || [];

  return (
    <div className="flex bg-background min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar isMobile={false} />

      {/* Mobile Sidebar */}
      <Sidebar
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header Bar */}
        <div className="lg:hidden border-b bg-card p-4 flex items-center justify-between sticky top-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="h-9 w-9"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Gossipit
          </h1>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9">
                  <AvatarImage
                    src={user.image ?? "https://github.com/shadcn.png"}
                    alt={user.name ?? "User"}
                  />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.image ?? "https://github.com/shadcn.png"}
                        alt={user.name ?? "User"}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button size="sm" variant="ghost">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Handle loading */}
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Loading category...
                </p>
              </div>
            </div>
          )}

          {/* Handle error */}
          {isError && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Failed to Load</h3>
                <p className="text-muted-foreground">
                  Unable to load category data. Please try again.
                </p>
              </div>
            </div>
          )}

          {/* Handle no category selected */}
          {!selectedCategory && !isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-6 max-w-md">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Hash className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Welcome to Gossipit
                </h3>
                <p className="text-muted-foreground">
                  Select a category from the sidebar to explore groups and start
                  chatting!
                </p>
              </div>
            </div>
          )}

          {/* Render main content when category exists */}
          {category && !isLoading && (
            <>
              {/* Category Header - Desktop */}
              <div className="hidden lg:block bg-card border-b p-6 sticky top-0 z-10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
                    >
                      <CategoryIconComponent
                        iconKey={category.icon.toLowerCase() as IconKey}
                        color={category.color as keyof typeof categoryColors}
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{category.name}</h1>
                      <p className="text-muted-foreground text-sm">
                        {category.groups.length > 1 ? (
                          <span>{category.groups.length} groups</span>
                        ) : (
                          <span>{category.groups.length} group</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Search Input */}
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search groups..."
                        value={groupSearchQuery}
                        onChange={(e) => setGroupSearchQuery(e.target.value)}
                        className="pl-9 pr-3 py-2 text-sm rounded-lg border focus-visible:ring-1 focus-visible:ring-primary"
                      />
                    </div>

                    {/* Profile dropdown */}
                    {user ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="relative">
                            <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                              <AvatarImage
                                src={
                                  user.image ?? "https://github.com/shadcn.png"
                                }
                                alt={user.name ?? "User"}
                              />
                              <AvatarFallback>
                                {user.name?.charAt(0).toUpperCase() ?? "U"}
                              </AvatarFallback>
                            </Avatar>
                            {user.verified && (
                              <sup className="absolute top-2 left-4 -translate-y-1/2">
                                <BadgeCheck
                                  absoluteStrokeWidth
                                  strokeWidth={2.5}
                                  className="text-white bg-blue-600 p-0 rounded-full"
                                  size={20}
                                />
                              </sup>
                            )}
                          </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          className="w-56 rounded-lg"
                          align="end"
                          sideOffset={4}
                        >
                          <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm relative">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={
                                    user.image ??
                                    "https://github.com/shadcn.png"
                                  }
                                  alt={user.name ?? "User"}
                                />
                                <AvatarFallback>
                                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                                </AvatarFallback>
                              </Avatar>
                              {user.verified && (
                                <sup className="absolute top-3 left-5 -translate-y-1/2">
                                  <BadgeCheck
                                    absoluteStrokeWidth
                                    strokeWidth={2.5}
                                    className="text-white bg-blue-600 p-0 rounded-full"
                                    size={20}
                                  />
                                </sup>
                              )}

                              <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                  {user.name}
                                </span>
                                <span className="truncate text-xs">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </DropdownMenuLabel>

                          {!user.verified && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                <DropdownMenuItem>
                                  <Sparkles className="mr-2 h-4 w-4" />
                                  Upgrade to Pro
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </>
                          )}

                          <DropdownMenuSeparator />

                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <BadgeCheck className="mr-2 h-4 w-4" />
                              Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bell className="mr-2 h-4 w-4" />
                              Notifications
                            </DropdownMenuItem>
                          </DropdownMenuGroup>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => signOut({ callbackUrl: "/" })}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link href="/auth">
                        <Button>Sign In</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Header - Mobile */}
              <div className="lg:hidden bg-card border-b p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2.5 rounded-lg bg-gradient-to-br ${category.color} shadow-md`}
                  >
                    <CategoryIconComponent
                      iconKey={category.icon.toLowerCase() as IconKey}
                      color={category.color as keyof typeof categoryColors}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-bold truncate">
                      {category.name}
                    </h1>
                    <p className="text-muted-foreground text-xs">
                      {category.groups.length > 1 ? (
                        <span>{category.groups.length} groups</span>
                      ) : (
                        <span>{category.groups.length} group</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search groups..."
                    value={groupSearchQuery}
                    onChange={(e) => setGroupSearchQuery(e.target.value)}
                    className="pl-9 pr-3 h-10 text-sm rounded-lg border focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>

              {/* Groups Grid */}
              <div className="p-4 md:p-6">
                {filteredGroups.length === 0 && groupSearchQuery ? (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center p-6 max-w-md">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        No groups found
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Try adjusting your search terms or explore other
                        categories.
                      </p>
                    </div>
                  </div>
                ) : filteredGroups.length === 0 ? (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center p-6 max-w-md">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        No groups yet
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Be the first to create a group in this category!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredGroups.map((group) => (
                      <Link href={`/${group.slug}`} key={group.id}>
                        <Card className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group border-muted-foreground/20 h-full">
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary via-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                <Hash className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex flex-wrap gap-1 justify-end">
                                {group.trending && (
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800"
                                  >
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="hidden sm:inline">
                                      Trending
                                    </span>
                                  </Badge>
                                )}
                                {group.verified && (
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                                  >
                                    <Crown className="w-3 h-3" />
                                    <span className="hidden sm:inline">
                                      Verified
                                    </span>
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <h3 className="font-semibold text-base mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                              {group.name}
                            </h3>

                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 gap-2">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <Users className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">
                                  {/* {formatMembers(group.members)} */}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">
                                  {timeAgo(group.lastActive)}
                                </span>
                              </div>
                            </div>

                            <Button className="w-full transition-all group-hover:shadow-lg">
                              View Channel
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
