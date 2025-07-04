"use client"
import React, { useEffect, useState } from 'react';
import {
  Users,
  Star,
  Vote,
  Gamepad2,
  GraduationCap,
  Briefcase,
  Hash,
  MessageCircle,
  TrendingUp,
  Crown
} from 'lucide-react';
import { useCategory } from '../contexts/category-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/sidebar/sidebar';
import axios from "axios";

interface ChatGroup {
  id: string;
  name: string;
  members: number;
  lastActive: string;
  trending?: boolean;
  verified?: boolean;
}

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  groups: ChatGroup[];
}



const categories: Category[] = [
  {
    id: 1,
    name: 'Lifestyle',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-purple-500',
    groups: [
      { id: '1', name: 'Fitness Enthusiasts', members: 12847, lastActive: '2m ago', trending: true },
      { id: '2', name: 'Healthy Cooking', members: 8934, lastActive: '5m ago' },
      { id: '3', name: 'Travel Stories', members: 15623, lastActive: '1h ago', verified: true },
      { id: '4', name: 'Minimalist Living', members: 6721, lastActive: '3h ago' },
      { id: '5', name: 'Photography Tips', members: 9456, lastActive: '45m ago' }
    ]
  },
  {
    id: 2,
    name: 'Celebrities',
    icon: <Star className="w-5 h-5" />,
    color: 'bg-yellow-500',
    groups: [
      { id: '6', name: 'Hollywood Buzz', members: 23456, lastActive: '1m ago', trending: true },
      { id: '7', name: 'Music Artists Fan Club', members: 18932, lastActive: '3m ago', verified: true },
      { id: '8', name: 'Reality TV Discussions', members: 11234, lastActive: '15m ago' },
      { id: '9', name: 'Celebrity Fashion', members: 14567, lastActive: '22m ago' },
      { id: '10', name: 'Award Show Commentary', members: 7890, lastActive: '1h ago' }
    ]
  },
  {
    id: 3,
    name: 'Politics',
    icon: <Vote className="w-5 h-5" />,
    color: 'bg-blue-500',
    groups: [
      { id: '11', name: 'Global Politics', members: 19874, lastActive: '4m ago', verified: true },
      { id: '12', name: 'Policy Discussions', members: 8765, lastActive: '12m ago' },
      { id: '13', name: 'Election Updates', members: 15432, lastActive: '8m ago', trending: true },
      { id: '14', name: 'Political Theory', members: 6543, lastActive: '35m ago' },
      { id: '15', name: 'Local Government', members: 4321, lastActive: '2h ago' }
    ]
  },
  {
    id: 4,
    name: 'Gaming',
    icon: <Gamepad2 className="w-5 h-5" />,
    color: 'bg-green-500',
    groups: [
      { id: '16', name: 'RPG Masters', members: 31245, lastActive: 'now', trending: true },
      { id: '17', name: 'FPS Arena', members: 28976, lastActive: '2m ago', verified: true },
      { id: '18', name: 'Indie Game Lovers', members: 12456, lastActive: '7m ago' },
      { id: '19', name: 'Retro Gaming', members: 9876, lastActive: '18m ago' },
      { id: '20', name: 'Mobile Gaming', members: 16543, lastActive: '25m ago' }
    ]
  },
  {
    id: 5,
    name: 'Education',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'bg-indigo-500',
    groups: [
      { id: '21', name: 'Computer Science Hub', members: 22134, lastActive: '6m ago', verified: true },
      { id: '22', name: 'Language Exchange', members: 18765, lastActive: '9m ago', trending: true },
      { id: '23', name: 'Study Groups', members: 14532, lastActive: '14m ago' },
      { id: '24', name: 'Online Courses', members: 11876, lastActive: '28m ago' },
      { id: '25', name: 'Academic Research', members: 7654, lastActive: '1h ago' }
    ]
  },
  {
    id: 6,
    name: 'Business',
    icon: <Briefcase className="w-5 h-5" />,
    color: 'bg-orange-500',
    groups: [
      { id: '26', name: 'Startup Founders', members: 16789, lastActive: '3m ago', verified: true },
      { id: '27', name: 'Marketing Strategies', members: 13456, lastActive: '11m ago' },
      { id: '28', name: 'Freelancers United', members: 19234, lastActive: '5m ago', trending: true },
      { id: '29', name: 'Investment Club', members: 8976, lastActive: '21m ago' },
      { id: '30', name: 'Remote Work Tips', members: 12543, lastActive: '33m ago' }
    ]
  }
];

export default function HomePage() {



  const { searchQuery, selectedCategory } = useCategory();
  const currentCategory = categories.find(cat => cat.name.toLowerCase() === selectedCategory.toLowerCase());

  const filteredGroups = currentCategory?.groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const formatMembers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <>
      <div className="flex bg-background">
        <Sidebar />
        <div className='h-screen overflow-y-scroll w-full'>

          {/* Category Header */}
          <div className="bg-card border-b p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${currentCategory?.color} text-white`}>
                {currentCategory?.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentCategory?.name}</h1>
                <p className="text-muted-foreground">
                  {filteredGroups.length} groups • {' '}
                  {filteredGroups.reduce((acc, group) => acc + group.members, 0).toLocaleString()} total members
                </p>
              </div>
            </div>
          </div>

          {/* Groups Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Hash className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex gap-1">
                          {group.trending && (
                            <Badge variant="secondary" className="gap-1 bg-red-100 text-red-700">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </Badge>
                          )}
                          {group.verified && (
                            <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700">
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
                          {group.lastActive}
                        </div>
                      </div>

                      <Button className="w-full transition-all">
                        View Channel
                      </Button>
                    </CardContent>
                  </Card>
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