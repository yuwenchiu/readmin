import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react";
import readminLogo from "../assets/readmin-logo.svg";
import readminLogoSquare from "../assets/logo-square-dark.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "./ui/button";
import clsx from "clsx";

const items = [
  {
    title: "Home",
    to: "/dashboard",
    icon: Home,
  },
  {
    title: "Search",
    to: "#",
    icon: Search,
  },
  {
    title: "My Library",
    to: "#",
    icon: Inbox,
  },
  {
    title: "Family Library",
    to: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    to: "#",
    icon: Settings,
  },
];

export function CustomSidebar() {
  const navigate = useNavigate();
  const { open } = useSidebar();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="relative">
      <SidebarTrigger
        className={clsx(
          "absolute right-0 transition-transform duration-700",
          !open && "rotate-180",
        )}
      />

      <SidebarHeader className="mb-4 grid place-items-center">
        <Link to="/dashboard">
          <img
            src={open ? readminLogo : readminLogoSquare}
            alt="readmin"
            className={open ? "my-8 h-7" : "my-7 h-9"}
          />
        </Link>

        <SidebarSeparator className="max-w-48" />
      </SidebarHeader>

      <SidebarContent className={open ? "px-6" : "px-4"}>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="lg">
                <Link to={item.to}>
                  <item.icon className={open ? "" : "ml-2"} />
                  <span className="text-base font-extralight tracking-wider">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className={clsx("my-4", open ? "px-6" : "px-4")}>
        <Button
          variant="secondary"
          size="xl"
          onClick={handleLogout}
          className="overflow-hidden"
        >
          {open ? "Log out" : <LogOut />}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default CustomSidebar;
