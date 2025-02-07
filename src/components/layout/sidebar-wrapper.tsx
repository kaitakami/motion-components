"use client";

import { Sidebar, DesktopSidebar, MobileSidebar, SidebarLink } from "@/components/ui/sidebar";
import { 
  Sidebar as SidebarIcon, 
  CirclesFour, 
  MagnifyingGlass, 
  Plus, 
  DotsSixVertical, 
  Target, 
  Cards,
  GithubLogo,
  XLogo,
  Book,
} from "@phosphor-icons/react";
import { components } from "@/lib/data";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React from "react";
import Link from "next/link";

const iconMap = {
  Book,
  CirclesFour,
  Sidebar: SidebarIcon,
  MagnifyingGlass,
  Plus,
  DotsSixVertical,
  Target,
  Cards
};

export function SidebarWrapper() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <DesktopSidebar className="bg-gray-50 dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 md:flex flex-col justify-between hidden">
        <div className="flex flex-col flex-1">
          <div className="h-[72px] flex items-center">
            <Link href="/" className={cn(
              "h-7 w-7 rounded-lg bg-gradient-to-br flex-shrink-0",
              `from-${siteConfig.logo.light.from} to-${siteConfig.logo.light.to}`,
              `dark:from-${siteConfig.logo.dark.from} dark:to-${siteConfig.logo.dark.to}`
            )} />
          </div>
          <AnimatePresence mode="wait">
            {open && (
              <motion.div 
                className="flex flex-col gap-0.5 px-4 overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.2,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {components.map((component, index) => (
                  <motion.div 
                    key={component.href || component.title}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.03,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    {component.comingSoon ? (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 py-2 px-4 group">
                        {React.createElement(iconMap[component.iconName], {
                          className: "h-4 w-4 opacity-70",
                          weight: "regular"
                        })}
                        <span className="text-nowrap">{component.title}</span>
                        <div className="relative ml-auto">
                          <div className="h-2 w-2 rounded-full bg-orange-500" />
                          <div className="absolute inset-0 rounded-full bg-orange-500/50 animate-ping" />
                        </div>
                      </div>
                    ) : (
                      <SidebarLink
                        link={{
                          label: component.title,
                          href: component.href || "#",
                          icon: React.createElement(iconMap[component.iconName], {
                            className: "h-4 w-4 opacity-70 group-hover/sidebar:opacity-100 transition-all duration-200",
                            weight: "regular"
                          })
                        }}
                        className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-all duration-200"
                      />
                    )}
                    {index < components.length - 1 && (
                      <div className="h-px bg-gray-200 dark:bg-neutral-800 mx-1 my-0.5 opacity-50" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="px-2 pb-4">
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2 mb-4 flex-col"
              >
                <a 
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  <GithubLogo weight="regular" className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a 
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  <XLogo weight="regular" className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            type="button"
            onClick={() => setOpen(!open)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <SidebarIcon weight="regular" className="h-4 w-4" />
          </button>
        </div>
      </DesktopSidebar>
      <MobileSidebar className="bg-gray-50 dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800">
        <div className="flex flex-col flex-1">
          <div className="h-[72px] flex items-center">
            <div className={cn(
              "h-7 w-7 rounded-lg bg-gradient-to-br flex-shrink-0",
              `from-${siteConfig.logo.light.from} to-${siteConfig.logo.light.to}`,
              `dark:from-${siteConfig.logo.dark.from} dark:to-${siteConfig.logo.dark.to}`
            )} />
          </div>
          {components.map((component, index) => (
            <div key={component.href || component.title}>
              {component.comingSoon ? (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 py-2 px-4 group">
                  {React.createElement(iconMap[component.iconName], {
                    className: "h-4 w-4 opacity-70",
                    weight: "regular"
                  })}
                  <span>{component.title}</span>
                  <div className="relative ml-auto">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <div className="absolute inset-0 rounded-full bg-orange-500/50 animate-ping" />
                  </div>
                </div>
              ) : (
                <SidebarLink
                  link={{
                    label: component.title,
                    href: component.href || "#",
                    icon: React.createElement(iconMap[component.iconName], {
                      className: "h-4 w-4 opacity-70 group-hover/sidebar:opacity-100 transition-all duration-200",
                      weight: "regular"
                    })
                  }}
                  className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-all duration-200"
                />
              )}
              {index < components.length - 1 && (
                <div className="h-px bg-gray-200 dark:bg-neutral-800 mx-1 my-0.5 opacity-50" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <a 
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <GithubLogo weight="regular" className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <a 
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <XLogo weight="regular" className="h-4 w-4" />
            <span>Twitter</span>
          </a>
        </div>
      </MobileSidebar>
    </Sidebar>
  );
} 