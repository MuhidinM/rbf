"use client";
import Logo from "@/app/admin/components/Logo";
import React, { FC, useState } from "react";
import { UserNav } from "./UserNav";

type NavbarProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: FC<NavbarProps> = ({ setIsOpened, isOpened }) => {
  const toggleSidebar = () => {
    setIsOpened(!isOpened);
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Logo />
          </div>
          <div className="flex items-center"></div>
          <div className="flex space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
