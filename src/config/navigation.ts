import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Settings,
  PlusCircle,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  mobile?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    mobile: true,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: Users,
    mobile: true,
  },
  {
    label: "Add Customer",
    path: "/customers/create",
    icon: PlusCircle,
    mobile: true,
  },
  {
    label: "Follow-ups",
    path: "/follow-ups",
    icon: CalendarClock,
    mobile: true,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
