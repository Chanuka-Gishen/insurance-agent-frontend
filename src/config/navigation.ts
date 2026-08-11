import {
  LayoutDashboard,
  Users,
  Settings,
  PlusCircle,
  type LucideIcon,
  RefreshCw,
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
    label: "Renewals",
    path: "/renewals",
    icon: RefreshCw,
    mobile: true,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
