"use client";
import React from "react";

import NavbarMenu from "./NavbarMenu";

export interface NavItem {
  name: string;
  path: string;
  id: string; // <-- dodaj to pole!
}
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems: NavItem[] = [
  { name: "INFO", path: "#info", id: "info" },
  { name: "WORK", path: "#work", id: "work" },
  { name: "ARCHIVE", path: "#archive", id: "archive" },
  { name: "VINYL", path: "#vinyl", id: "vinyl" },
];

// Możesz zmienić kolory tła dla każdej sekcji według uznania
const sectionBg: Record<string, string> = {
  info: "bg-transparent",
  work: "bg-white/10",
  archive: "bg-black/20",
  vinyl: "bg-[#23201e]/80",
};

const Navbar: React.FC = () => {
  const wordContainerVariants = {
    rest: { transition: { staggerChildren: 0.005 } },
    hover: { transition: { staggerChildren: 0.005 } },
  };

  const letter1Variants = {
    rest: (i: number) => ({
      y: "0%",
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    }),
    hover: (i: number) => ({
      y: i % 2 === 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  const letter2Variants = {
    rest: (i: number) => ({
      y: i % 2 === 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
    hover: (i: number) => ({
      y: "0%",
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    }),
  };

  const activeSection = useActiveSection(navItems.map((item) => item.id));

  return (
    <nav
      className={`fixed top-0 left-0 w-auto z-50 bg-transparent  transition-colors duration-500`}
    >
      <div className="container ml-6 py-8 flex justify-between items-start relative">
        <NavbarMenu
          navItems={navItems}
          wordContainerVariants={wordContainerVariants}
          letter1Variants={letter1Variants}
          letter2Variants={letter2Variants}
          activeSection={activeSection}
        />
      </div>
    </nav>
  );
};

export default Navbar;
