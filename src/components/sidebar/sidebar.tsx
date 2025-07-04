import React, { useState, useEffect } from "react";
import {
  Users,
  Star,
  Vote,
  Gamepad2,
  GraduationCap,
  Briefcase,
  Search,
  Plus,
  Settings,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategory } from "@/contexts/category-context";
import { cn } from "@/lib/utils";

import axios from "axios";

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  groupCount: number;
}

const iconMap = {
  users: Users,
  star: Star,
  vote: Vote,
  gamepad2: Gamepad2,
  graduationcap: GraduationCap,
  briefcase: Briefcase,
};
const categoryColors = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
};

export function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } =
    useCategory();
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
            {categories.map((category) => {
              const iconKey = category.icon.toLowerCase() as keyof typeof iconMap;
              const IconComponent = iconMap[iconKey] || Users;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.name ? "secondary" : "ghost"
                  }
                  className={`w-full justify-start gap-3 h-auto p-3 ${
                    selectedCategory === category.name &&
                    "bg-primary/10 text-primary border border-primary/20"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div
                    className={cn(
                      `p-2 rounded-lg text-white`,
                      categoryColors[
                        category.color as keyof typeof categoryColors
                      ]
                    )}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.groupCount} channels
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Group Button */}
      <div className="p-4 border-t">
        <Button className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Create New Group
        </Button>
      </div>
    </div>
  );
}
