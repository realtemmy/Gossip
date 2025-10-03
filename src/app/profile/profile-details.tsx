import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

interface ProfileDetailsProps {
  profileData: {
    email: string;
    phone: string;
    location: string;
    website: string;
    bio: string;
    joinDate: string;
  };
  isEditing: boolean;
  onChange: (field: string, value: string) => void;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  profileData,
  isEditing,
  onChange,
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Profile Information</CardTitle>
        <CardDescription>Manage your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              Email
            </Label>
            {isEditing ? (
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
            ) : (
              <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md">
                {profileData.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              Phone
            </Label>
            {isEditing ? (
              <Input
                type="tel"
                value={profileData.phone}
                onChange={(e) => onChange("phone", e.target.value)}
              />
            ) : (
              <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md">
                {profileData.phone}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              Location
            </Label>
            {isEditing ? (
              <Input
                value={profileData.location}
                onChange={(e) => onChange("location", e.target.value)}
              />
            ) : (
              <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md">
                {profileData.location}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-gray-500" />
              Website
            </Label>
            {isEditing ? (
              <Input
                type="url"
                value={profileData.website}
                onChange={(e) => onChange("website", e.target.value)}
              />
            ) : (
              <a
                href={`https://${profileData.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 bg-gray-50 px-3 py-2 rounded-md block"
              >
                {profileData.website}
              </a>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Bio</Label>
          {isEditing ? (
            <Textarea
              value={profileData.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              placeholder="Tell people about yourself..."
              className="min-h-[100px] resize-none"
            />
          ) : (
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md">
              {profileData.bio}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
          <Calendar className="h-4 w-4" />
          <span>Joined {profileData.joinDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};
