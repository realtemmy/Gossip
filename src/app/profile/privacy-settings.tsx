import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

interface PrivacySettingsProps {
  privacy: {
    profileVisibility: string;
    messagePermissions: string;
    tagPermissions: string;
    showActivity: boolean;
    showFollowers: boolean;
  };
  onChange: (key: string, value: string | boolean) => void;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  privacy,
  onChange,
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy & Security
        </CardTitle>
        <CardDescription>
          Control your privacy and security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Profile Visibility</Label>
            <Select
              value={privacy.profileVisibility}
              onValueChange={(value) => onChange("profileVisibility", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can see</SelectItem>
                <SelectItem value="friends">Friends only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Who can message you</Label>
            <Select
              value={privacy.messagePermissions}
              onValueChange={(value) => onChange("messagePermissions", value)}
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
            <Label className="text-sm font-medium">Who can tag you</Label>
            <Select
              value={privacy.tagPermissions}
              onValueChange={(value) => onChange("tagPermissions", value)}
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

        <div className="border-t pt-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Activity Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-700 cursor-pointer">
                Show activity status
              </Label>
              <Switch
                checked={privacy.showActivity}
                onCheckedChange={(checked) => onChange("showActivity", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-700 cursor-pointer">
                Show follower list
              </Label>
              <Switch
                checked={privacy.showFollowers}
                onCheckedChange={(checked) =>
                  onChange("showFollowers", checked)
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
