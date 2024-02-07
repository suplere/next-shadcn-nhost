import { BellRing, Command, Home, LogOut, Mail, Moon, SunMedium, UserCog } from "lucide-react";

export type IconKeys = keyof typeof icons;

type IconsType = {
  [key in IconKeys]: React.ElementType;
};

const icons = {
  logo: Command,
  sun: SunMedium,
  moon: Moon,
  profile: UserCog,
  logout: LogOut,
  onesignal: BellRing,
  email: Mail,
  dashboard: Home
};

export const Icons: IconsType = icons;
