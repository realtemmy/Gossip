import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, CheckCircle, Edit3, Save } from "lucide-react";

interface ProfileHeaderProps {
  profileData: {
    name: string;
    username: string;
    verified: boolean;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  isEditing,
  onEdit,
  onSave,
}) => {
  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row items-start gap-6 -mt-12 pb-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src="/api/placeholder/150/150"
                alt={profileData.name}
              />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {profileData.name}
              </h1>
              {profileData.verified && (
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-4">{profileData.username}</p>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-semibold text-gray-900">1,234</span>
                <span className="text-gray-600 ml-1">Posts</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">12.5K</span>
                <span className="text-gray-600 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">892</span>
                <span className="text-gray-600 ml-1">Following</span>
              </div>
            </div>
          </div>

          <Button onClick={isEditing ? onSave : onEdit} className="shrink-0">
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
