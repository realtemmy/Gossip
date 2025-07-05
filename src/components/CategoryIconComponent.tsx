import { cn } from "@/lib/utils";
import {
  Briefcase,
  Gamepad2,
  GraduationCap,
  Star,
  Users,
  Vote,
} from "lucide-react";
import React from "react";

export type IconKey =
  | "users"
  | "star"
  | "vote"
  | "gamepad2"
  | "graduationcap"
  | "briefcase";

interface CategoryIconComponentProps {
  iconKey: IconKey;
  color: keyof typeof categoryColors;
}
export const categoryColors = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
};
const CategoryIconComponent: React.FC<CategoryIconComponentProps> = ({
  iconKey,
  color,
}) => {
  const iconMap = {
    users: Users,
    star: Star,
    vote: Vote,
    gamepad2: Gamepad2,
    graduationcap: GraduationCap,
    briefcase: Briefcase,
  };
  const IconComponent = iconMap[iconKey] || Users;
  return (
    <div className={cn(`p-2 rounded-lg text-white`, categoryColors[color])}>
      <IconComponent />
    </div>
  );
};
export default CategoryIconComponent;
