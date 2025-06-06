"use client";
import React from "react";
import Link from "next/link";
import AnimatedText from "./AnimatedText";
import { NavItem } from "../../types/interfaces";
import { useSectionProgress } from "@/hooks/useSectionProgress";

type Props = {
  navItems: NavItem[];
  wordContainerVariants: any;
  letter1Variants: any;
  letter2Variants: any;
  activeSection?: string | null;
};

const NavbarMenu: React.FC<Props> = ({
  navItems,
  wordContainerVariants,
  letter1Variants,
  letter2Variants,
  activeSection,
}) => {
  const progresses = navItems.map((item) => useSectionProgress(item.id));

  return (
    <div className="flex flex-col gap-0.5">
      {navItems.map((item, index) => {
        const progress = progresses[index];

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`relative overflow-hidden px-1.5 py-1 rounded-full text-sm font-semibold flex items-center transition-colors duration-300
              ${
                activeSection === item.id
                  ? "text-black"
                  : "text-gray-300 hover:text-white"
              }
            `}
            scroll={false}
            style={{ zIndex: 1 }}
          >
            {/* Progresywne tło za tekstem */}
            <span
              className="absolute left-0 top-0 h-full"
              style={{
                width: `${Math.round(progress * 130)}%`,
                background: "#fff",
                borderRadius: "9999px",
                transition: "width 0.4s cubic-bezier(.4,0,.2,1)",
                zIndex: 0,
              }}
            />
            {/* Numer i tekst */}
            <span className="relative z-10 text-[10px] font-mono font-bold mr-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="relative z-10">
              <AnimatedText
                text={item.name}
                wordContainerVariants={wordContainerVariants}
                letter1Variants={letter1Variants}
                letter2Variants={letter2Variants}
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarMenu;
