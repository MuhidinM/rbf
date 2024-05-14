"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Activity,
  Calculator,
  ChevronDown,
  ChevronUp,
  GitBranchPlusIcon,
  GitGraph,
  LayoutDashboard,
  LucideGitGraph,
  Settings,
  User2Icon,
  Users,
  Users2,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";

type SidebarProps = {
  className: any;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MainNav: FC<SidebarProps> = ({
  className,
  isOpened,
  setIsOpened,
}) => {
  const pathname = usePathname();
  const userAuthorities = localStorage.getItem("authorities");
  const router = useRouter();
  console.log(userAuthorities?.length);
  const [isOpen, setIsOpen] = useState("");

  const menuItems = [
    {
      href: `/admin`,
      label: "Dashboard",
      active: pathname === `/admin`,
      authorized: true,
      icon: (
        <LayoutDashboard
          size={15}
          color={`${pathname === `/admin` ? "#fff" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/admin/cohorts`,
      label: "Cohorts",
      active: pathname === `/admin/cohorts`,
      items: [
        {
          href: `/admin/cohorts/rbfcohorts`,
          label: "RBF Cohorts",
          active: pathname === `/admin/cohorts/rbfcohorts`,
          authorized: true,
          icon: (
            <Users2
              size={15}
              color={`${
                pathname === `/admin/cohorts/rbfcohorts` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/admin/cohorts/bnplcohorts`,
          label: "BNPL Cohorts",
          active: pathname === `/admin/cohorts/bnplcohorts`,
          authorized: true,
          icon: (
            <Users2Icon
              size={15}
              color={`${
                pathname === `/admin/cohorts/bnplcohorts` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/admin/cohorts/agrocohorts`,
          label: "Agro Cohorts",
          active: pathname === `/admin/cohorts/agrocohorts`,
          authorized: true,
          icon: (
            <Users2Icon
              size={15}
              color={`${
                pathname === `/admin/cohorts/agrocohorts` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
      ],
      icon: (
        <Users
          size={15}
          color={`${pathname === `/admin/cohorts` ? "#fff" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/admin/calculator`,
      label: "Calculator",
      active: pathname === `/admin/calculator`,
      items: [
        {
          href: `/admin/calculator/rbfcalculator`,
          label: "RBF Calculator",
          active: pathname === `/admin/calculator/rbfcalculator`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/admin/calculator/rbfcalculator`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/admin/calculator/bnplcalculator`,
          label: "BNPL Calculator",
          active: pathname === `/admin/calculator/bnplcalculator`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/admin/calculator/bnplcalculator`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/admin/calculator/agrocalculator`,
          label: "Agro Calculator",
          active: pathname === `/admin/calculator/agrocalculator`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/admin/calculator/agrocalculator`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
      ],
      icon: (
        <Activity
          size={15}
          color={`${pathname === `/admin/calculator` ? "#fff" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/admin/forecast`,
      label: "Forecast",
      active: pathname === `/admin/forecast`,
      items: [
        {
          href: `/admin/forecast/rbfforecast`,
          label: "RBF Forecast (Prophet)",
          active: pathname === `/admin/forecast/rbfforecast`,
          authorized: true,
          icon: (
            <GitBranchPlusIcon
              size={15}
              color={`${
                pathname === `/admin/forecast/rbfforecast` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/admin/forecast/bnplforecast`,
          label: "BNPL Forecast (Prophet)",
          active: pathname === `/admin/forecast/bnplforecast`,
          authorized: true,
          icon: (
            <GitBranchPlusIcon
              size={15}
              color={`${
                pathname === `/admin/forecast/bnplforecast` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
      ],
      icon: (
        <GitBranchPlusIcon
          size={15}
          color={`${pathname === `/admin/calculator` ? "#fff" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/admin/settings`,
      label: "Settings",
      active: pathname === `/admin/settings`,
      items: [
        {
          href: `/admin/settings/rbfsettings`,
          label: "RBF Settings",
          active: pathname === `/admin/settings/rbfsettings`,
          authorized: true,
          icon: (
            <Settings
              size={15}
              color={`${
                pathname === `/admin/settings/rbfsettings` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/admin/settings/bnplsettings`,
          label: "BNPL Settings",
          active: pathname === `/admin/settings/bnplsettings`,
          authorized: true,
          icon: (
            <Settings
              size={15}
              color={`${
                pathname === `/admin/settings/bnplsettings` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/admin/settings/agrosettings`,
          label: "Agro Settings",
          active: pathname === `/admin/settings/agrosettings`,
          authorized: true,
          icon: (
            <Settings
              size={15}
              color={`${
                pathname === `/admin/settings/agrosettings` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
      ],
      authorized: true,
      icon: (
        <Settings
          size={15}
          color={`${pathname === `/admin/settings` ? "#fff" : "#707E94"}`}
        />
      ),
    },
  ];

  return (
    <div>
      <nav
        className={cn("flex flex-col justify-center space-y-2 mt-3", className)}
      >
        <div className="font-semibold opacity-50">Menu</div>
        {menuItems.map((route, index) => (
          <div key={index}>
            <div
              className={`${!route.authorized && "cursor-not-allowed"}`}
              title={`${!route.authorized && "Not Authorized"}`}
            >
              <Button
                variant="outline"
                className={cn(
                  " w-full flex px-2 items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
                  route.active
                    ? "text-white bg-cyan-500 hover:text-white hover:bg-cyan-500"
                    : "text-muted-foreground"
                )}
                key={route.href}
                onClick={() => {
                  setIsOpened(!isOpened);
                  if (route.items) setIsOpen(route.label);
                  if (isOpen === route.label) setIsOpen("");
                  if (!route.items) router.push(route.href);
                }}
              >
                <span className="flex items-center justify-between w-full">
                  <span className="flex items-center w-full space-x-2">
                    <span>{route?.icon}</span>
                    <Link
                      href={!route.items ? route.href : ""}
                      className={cn(
                        "text-base font-medium disabled transition-colors"
                      )}
                    >
                      <span>{route.label}</span>
                    </Link>
                  </span>
                  <span>
                    {route.items &&
                      (isOpen === route.label ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </span>
                </span>
              </Button>
            </div>
            {isOpen === route.label &&
              route.items &&
              route.items.map((route, index) => (
                <div
                  key={index}
                  className={`${
                    !route.authorized && "cursor-not-allowed animate-in"
                  } border-l ml-3 pl-2`}
                  title={`${!route.authorized && "Not Authorized"}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      " w-full flex px-1 my-2 items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
                      route.active
                        ? "text-white bg-cyan-500 hover:text-white hover:bg-cyan-500"
                        : "text-muted-foreground"
                    )}
                    key={route.href}
                    onClick={() => {
                      setIsOpened(!isOpened);
                      router.push(route.href);
                    }}
                  >
                    <span>{route?.icon}</span>
                    <Link
                      href={route.href}
                      className={cn(
                        "text-sm font-medium disabled transition-colors"
                      )}
                    >
                      {route.label}
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
        ))}
      </nav>
    </div>
  );
};
