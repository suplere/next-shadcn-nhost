import { BellRing, Command, LogOut, Moon, SunMedium, UserCog } from "lucide-react";

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
  onesignal: BellRing
};

export const Icons: IconsType = icons;
