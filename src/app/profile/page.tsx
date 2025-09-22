"use client";
import React, { useState } from "react";
import {
  Camera,
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Lock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Edit3,
  Save,
  X,
  Check,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfileSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Morgan",
    username: "@alexmorgan",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Digital creator, coffee enthusiast, and adventure seeker. Sharing moments that matter ✨",
    location: "San Francisco, CA",
    website: "alexmorgan.dev",
    joinDate: "March 2022",
  });

  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    email: false,
    push: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    messagePermissions: "everyone",
    tagPermissions: "friends",
    showActivity: true,
    showFollowers: true,
  });

  const handleProfileUpdate = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: "Posts", value: "1,234" },
    { label: "Followers", value: "12.5K" },
    { label: "Following", value: "892" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Profile & Settings
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } mt-1`}
              >
                Manage your account and preferences
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="transition-all duration-300 hover:scale-105"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header Card */}
            <Card
              className={`overflow-hidden ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white/70 backdrop-blur-sm border-white/20"
              } shadow-xl`}
            >
              <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <CardContent className="relative pt-0 pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-6">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                      <AvatarImage
                        src="/api/placeholder/150/150"
                        alt={profileData.name}
                      />
                      <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-2 right-2 rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1 sm:ml-4">
                    <div className="flex items-center gap-3 mb-2">
                      {isEditing ? (
                        <Input
                          value={profileData.name}
                          onChange={(e) =>
                            handleProfileUpdate("name", e.target.value)
                          }
                          className="text-xl font-bold bg-transparent border-dashed"
                        />
                      ) : (
                        <h2
                          className={`text-2xl font-bold ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {profileData.name}
                        </h2>
                      )}
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } mb-3`}
                    >
                      {profileData.username}
                    </p>
                    <div className="flex gap-6 text-sm">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div
                            className={`font-bold ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {stat.value}
                          </div>
                          <div
                            className={`${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "default" : "outline"}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details Card */}
            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white/70 backdrop-blur-sm border-white/20"
              } shadow-xl`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your profile information and bio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profileData.email}
                        onChange={(e) =>
                          handleProfileUpdate("email", e.target.value)
                        }
                        type="email"
                      />
                    ) : (
                      <p
                        className={`px-3 py-2 rounded-md ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {profileData.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) =>
                          handleProfileUpdate("phone", e.target.value)
                        }
                        type="tel"
                      />
                    ) : (
                      <p
                        className={`px-3 py-2 rounded-md ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {profileData.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profileData.location}
                        onChange={(e) =>
                          handleProfileUpdate("location", e.target.value)
                        }
                      />
                    ) : (
                      <p
                        className={`px-3 py-2 rounded-md ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {profileData.location}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Website
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profileData.website}
                        onChange={(e) =>
                          handleProfileUpdate("website", e.target.value)
                        }
                        type="url"
                      />
                    ) : (
                      <p
                        className={`px-3 py-2 rounded-md ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {profileData.website}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        handleProfileUpdate("bio", e.target.value)
                      }
                      placeholder="Tell people about yourself..."
                      className="min-h-[100px]"
                    />
                  ) : (
                    <p
                      className={`px-3 py-2 rounded-md ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {profileData.bio}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Joined {profileData.joinDate}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white/70 backdrop-blur-sm border-white/20"
              } shadow-xl`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3
                    className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Activity Notifications
                  </h3>
                  {[
                    { key: "likes", label: "Likes on your posts", icon: "❤️" },
                    {
                      key: "comments",
                      label: "Comments on your posts",
                      icon: "💬",
                    },
                    { key: "follows", label: "New followers", icon: "👥" },
                    { key: "messages", label: "Direct messages", icon: "✉️" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <Label
                          className={`${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {item.label}
                        </Label>
                      </div>
                      <Switch
                        checked={notifications[item.key]}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            [item.key]: checked,
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3
                    className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Delivery Methods
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <Label
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Email notifications
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          email: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-green-500" />
                      <Label
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Push notifications
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, push: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white/70 backdrop-blur-sm border-white/20"
              } shadow-xl`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Control who can see your content and interact with you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Profile Visibility
                    </Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) =>
                        setPrivacy((prev) => ({
                          ...prev,
                          profileVisibility: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          Public - Anyone can see
                        </SelectItem>
                        <SelectItem value="friends">Friends only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Who can message you
                    </Label>
                    <Select
                      value={privacy.messagePermissions}
                      onValueChange={(value) =>
                        setPrivacy((prev) => ({
                          ...prev,
                          messagePermissions: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="friends">Friends only</SelectItem>
                        <SelectItem value="nobody">Nobody</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Who can tag you in posts</Label>
                    <Select
                      value={privacy.tagPermissions}
                      onValueChange={(value) =>
                        setPrivacy((prev) => ({
                          ...prev,
                          tagPermissions: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="friends">Friends only</SelectItem>
                        <SelectItem value="nobody">Nobody</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3
                    className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Activity Settings
                  </h3>
                  <div className="flex items-center justify-between">
                    <Label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Show activity status
                    </Label>
                    <Switch
                      checked={privacy.showActivity}
                      onCheckedChange={(checked) =>
                        setPrivacy((prev) => ({
                          ...prev,
                          showActivity: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Show follower list
                    </Label>
                    <Switch
                      checked={privacy.showFollowers}
                      onCheckedChange={(checked) =>
                        setPrivacy((prev) => ({
                          ...prev,
                          showFollowers: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3
                    className={`font-semibold text-red-600 ${
                      isDarkMode ? "text-red-400" : ""
                    }`}
                  >
                    Account Security
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Two-Factor Auth
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white/70 backdrop-blur-sm border-white/20"
              } shadow-xl`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Palette className="h-5 w-5" />
                  Appearance & Theme
                </CardTitle>
                <CardDescription>
                  Customize how the app looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3
                    className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Theme Preference
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Monitor },
                    ].map((theme) => (
                      <Card
                        key={theme.id}
                        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                          (theme.id === "dark" && isDarkMode) ||
                          (theme.id === "light" && !isDarkMode)
                            ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => {
                          if (theme.id === "dark") setIsDarkMode(true);
                          if (theme.id === "light") setIsDarkMode(false);
                        }}
                      >
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <theme.icon className="h-8 w-8 mb-2" />
                          <span className="font-medium">{theme.label}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3
                    className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Display Options
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="pst">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">
                            Pacific Standard Time
                          </SelectItem>
                          <SelectItem value="mst">
                            Mountain Standard Time
                          </SelectItem>
                          <SelectItem value="cst">
                            Central Standard Time
                          </SelectItem>
                          <SelectItem value="est">
                            Eastern Standard Time
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
