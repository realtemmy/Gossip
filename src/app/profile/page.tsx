"use client"
import { useState } from "react";
import { Bell, CheckCircle, Shield, User } from "lucide-react";

import { ProfileHeader } from "./header";
import { ProfileDetails } from "./profile-details";
import { PrivacySettings } from "./privacy-settings";
import { VerificationSection } from "./verification";
import { NotificationSettings } from "./notification-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Morgan",
    username: "@alexmorgan",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Digital creator, coffee enthusiast, and adventure seeker. Sharing moments that matter ✨",
    location: "San Francisco, CA",
    website: "alexmorgan.dev",
    joinDate: "March 2022",
    verified: true,
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

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const handleVerificationApply = () => {
    // Add verification application logic
    console.log("Applying for verification...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          <ProfileHeader
            profileData={profileData}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 lg:w-fit">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="verification"
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Verification</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <ProfileDetails
                profileData={profileData}
                isEditing={isEditing}
                onChange={handleProfileChange}
              />
            </TabsContent>

            <TabsContent value="verification" className="mt-6">
              <VerificationSection
                verified={profileData.verified}
                onApply={handleVerificationApply}
              />
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <NotificationSettings
                notifications={notifications}
                onChange={handleNotificationChange}
              />
            </TabsContent>

            <TabsContent value="privacy" className="mt-6">
              <PrivacySettings
                privacy={privacy}
                onChange={handlePrivacyChange}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;

