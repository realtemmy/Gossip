"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Hash, MessageCircle, TrendingUp, Crown } from "lucide-react";
import { useCategory } from "../contexts/category-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/sidebar/sidebar";
import CategoryIconComponent, {
  categoryColors,
  IconKey,
} from "@/components/CategoryIconComponent";
import { timeAgo } from "@/lib/timeAgo";

import axios from "axios";

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


export default function HomePage() {
  const { searchQuery, selectedCategory } = useCategory();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await axios.get(`/api/category/${selectedCategory}`);
      setCategory(groups.data);
      console.log("Fetched groups:", groups.data);
    };
    if (selectedCategory) {
      fetchGroups();
    }
  }, [selectedCategory]);

  const formatMembers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  if (!category)
    return (
      <div className="h-screen flex items-center justify-center">
        No category has been selected
      </div>
    );

  return (
    <>
      <div className="flex bg-background">
        <Sidebar />
        <div className="h-screen overflow-y-scroll w-full">
          {/* Category Header */}
          <div className="bg-card border-b p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${category?.color} text-whit`}>
                <CategoryIconComponent
                  iconKey={category?.icon.toLowerCase() as IconKey}
                  color={category.color as keyof typeof categoryColors}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{category?.name}</h1>
                <p className="text-muted-foreground">
                  {category?.count} groups •{" "}
                  {category?.groups
                    .reduce((acc, group) => acc + group.members, 0)
                    .toLocaleString()}{" "}
                  total members
                </p>
              </div>
            </div>
          </div>

          {/* Groups Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {category?.groups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.groups.map((group) => (
                  <Link href={`/${group.slug}`} key={group.id}>
                    <Card
                      className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Hash className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex gap-1">
                            {group.trending && (
                              <Badge
                                variant="secondary"
                                className="gap-1 bg-red-100 text-red-700"
                              >
                                <TrendingUp className="w-3 h-3" />
                                Trending
                              </Badge>
                            )}
                            {group.verified && (
                              <Badge
                                variant="secondary"
                                className="gap-1 bg-blue-100 text-blue-700"
                              >
                                <Crown className="w-3 h-3" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>

                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {group.name}
                        </h3>

                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {formatMembers(group.members)} members
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {timeAgo(group.lastActive)}
                          </div>
                        </div>

                        <Button className="w-full transition-all">
                          View Channel
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No groups found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or explore other categories.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
