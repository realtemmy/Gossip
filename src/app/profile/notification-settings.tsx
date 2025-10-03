import { Bell, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationSettingsProps {
  notifications: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    messages: boolean;
    email: boolean;
    push: boolean;
  };
  onChange: (key: string, value: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  notifications,
  onChange,
}) => {
  const notificationItems = [
    { key: "likes", label: "Likes on your posts", icon: "❤️" },
    { key: "comments", label: "Comments on your posts", icon: "💬" },
    { key: "follows", label: "New followers", icon: "👥" },
    { key: "messages", label: "Direct messages", icon: "✉️" },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>Manage your notification preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Activity Notifications
          </h3>
          <div className="space-y-4">
            {notificationItems.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <Label className="text-sm text-gray-700 cursor-pointer">
                    {item.label}
                  </Label>
                </div>
                <Switch
                  checked={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onCheckedChange={(checked) => onChange(item.key, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Delivery Methods
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <Label className="text-sm text-gray-700 cursor-pointer">
                  Email notifications
                </Label>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => onChange("email", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-green-600" />
                <Label className="text-sm text-gray-700 cursor-pointer">
                  Push notifications
                </Label>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => onChange("push", checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
