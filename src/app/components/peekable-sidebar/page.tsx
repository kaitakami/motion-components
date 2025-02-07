"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { PeekableSidebar } from "@/components/ui/peekable-sidebar";
import { House, User, Gear, Bell, BookmarkSimple, CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const exampleCode = `"use client";

import { PeekableSidebar } from "@/components/ui/peekable-sidebar";
import { House, User, Gear, Bell, BookmarkSimple } from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <PeekableSidebar>
      <PeekableSidebar.Header>
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600" />
      </PeekableSidebar.Header>
      <PeekableSidebar.Content>
        <PeekableSidebar.Item
          href="/"
          icon={<House weight="regular" className="h-4 w-4" />}
          label="Home"
          active
        />
        <PeekableSidebar.Item
          href="/profile"
          icon={<User weight="regular" className="h-4 w-4" />}
          label="Profile"
        />
        <PeekableSidebar.Item
          href="/bookmarks"
          icon={<BookmarkSimple weight="regular" className="h-4 w-4" />}
          label="Bookmarks"
        />
        <PeekableSidebar.Item
          href="/notifications"
          icon={<Bell weight="regular" className="h-4 w-4" />}
          label="Notifications"
        />
        <PeekableSidebar.Item
          href="/settings"
          icon={<Gear weight="regular" className="h-4 w-4" />}
          label="Settings"
        />
      </PeekableSidebar.Content>
    </PeekableSidebar>
  );
}`;

const code = `"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PeekableSidebarProps {
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
}

interface PeekableSidebarContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  hovered: boolean;
  setHovered: (hovered: boolean) => void;
}

const PeekableSidebarContext = React.createContext<PeekableSidebarContextValue | undefined>(
  undefined
);

const usePeekableSidebar = () => {
  const context = React.useContext(PeekableSidebarContext);
  if (!context) {
    throw new Error("PeekableSidebar components must be used within a PeekableSidebar");
  }
  return context;
};

interface PeekableSidebarHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

interface PeekableSidebarContentProps {
  children: React.ReactNode;
  className?: string;
}

interface PeekableSidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}

function PeekableSidebarHeader({
  children,
  className,
}: PeekableSidebarHeaderProps) {
  const { expanded } = usePeekableSidebar();

  return (
    <motion.div
      className={cn(
        "h-14 flex items-center px-4",
        "border-b border-black/[0.08] dark:border-white/[0.08]",
        className
      )}
      animate={{ 
        width: expanded ? "240px" : "64px",
      }}
      transition={{
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

function PeekableSidebarContent({
  children,
  className,
}: PeekableSidebarContentProps) {
  const { expanded } = usePeekableSidebar();

  return (
    <motion.div
      className={cn(
        "flex-1 overflow-hidden",
        className
      )}
      animate={{ 
        width: expanded ? "240px" : "64px",
      }}
      transition={{
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1]
      }}
    >
      <div className="h-full overflow-y-auto py-2">
        {children}
      </div>
    </motion.div>
  );
}

function PeekableSidebarItem({
  icon,
  label,
  href,
  onClick,
  className,
  active,
}: PeekableSidebarItemProps) {
  const { expanded } = usePeekableSidebar();

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 px-4 py-2 w-full",
          "text-neutral-600 dark:text-neutral-300",
          "hover:text-neutral-900 dark:hover:text-white",
          "transition-colors duration-150",
          "relative group",
          active && "text-neutral-900 dark:text-white",
          className
        )}
      >
        <ItemContent
          icon={icon}
          label={label}
          expanded={expanded}
          active={active}
        />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-2 w-full",
        "text-neutral-600 dark:text-neutral-300",
        "hover:text-neutral-900 dark:hover:text-white",
        "transition-colors duration-150",
        "relative group",
        active && "text-neutral-900 dark:text-white",
        className
      )}
    >
      <ItemContent
        icon={icon}
        label={label}
        expanded={expanded}
        active={active}
      />
    </button>
  );
}

function ItemContent({
  icon,
  label,
  expanded,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  active?: boolean;
}) {
  return (
    <>
      <div className={cn(
        "h-8 w-8 rounded-lg",
        "flex items-center justify-center flex-shrink-0",
        "bg-transparent transition-colors duration-150",
        "group-hover:bg-black/5 dark:group-hover:bg-white/5",
        active && "bg-black/5 dark:bg-white/5"
      )}>
        {icon}
      </div>
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.span
            initial={{ opacity: 0, x: -8, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.96 }}
            transition={{
              duration: 0.4,
              ease: [0.32, 0.72, 0, 1]
            }}
            className="text-sm font-medium"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {!expanded && (
        <div className="absolute left-16 px-3 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </>
  );
}

export function PeekableSidebar({ 
  children, 
  className,
  defaultExpanded = false,
}: PeekableSidebarProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (hovered) {
      timeout = setTimeout(() => {
        setExpanded(true);
      }, 150);
    } else {
      timeout = setTimeout(() => {
        setExpanded(false);
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [hovered]);

  return (
    <PeekableSidebarContext.Provider value={{ expanded, setExpanded, hovered, setHovered }}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "flex flex-col h-full overflow-hidden",
          "bg-white dark:bg-neutral-900",
          "border-r border-black/[0.08] dark:border-white/[0.08]",
          className
        )}
        animate={{ 
          width: expanded ? "240px" : "64px",
          scale: expanded ? 1 : 0.98,
        }}
        transition={{
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1]
        }}
      >
        {children}
      </motion.div>
    </PeekableSidebarContext.Provider>
  );
}

PeekableSidebar.Header = PeekableSidebarHeader;
PeekableSidebar.Content = PeekableSidebarContent;
PeekableSidebar.Item = PeekableSidebarItem;`;

export default function PeekableSidebarPage() {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Peekable Sidebar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            An elegant sidebar that expands on hover with smooth animations and tooltips. Perfect for navigation menus and dashboards.
          </p>
        </div>

        {/* Preview */}
        <div className="relative rounded-xl border border-neutral-200 dark:border-neutral-800 p-1">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <motion.div 
            className="relative rounded-lg bg-white dark:bg-neutral-900 p-4 md:p-8"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.32, 0.72, 0, 1]
            }}
          >
            <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] h-[480px] flex">
              <div className="h-full min-w-[64px] max-w-[240px]">
                <PeekableSidebar>
                  <PeekableSidebar.Header>
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600" />
                  </PeekableSidebar.Header>
                  <PeekableSidebar.Content>
                    <PeekableSidebar.Item
                      href="#"
                      icon={<House weight="regular" className="h-4 w-4" />}
                      label="Home"
                      active
                    />
                    <PeekableSidebar.Item
                      href="#"
                      icon={<User weight="regular" className="h-4 w-4" />}
                      label="Profile"
                    />
                    <PeekableSidebar.Item
                      href="#"
                      icon={<BookmarkSimple weight="regular" className="h-4 w-4" />}
                      label="Bookmarks"
                    />
                    <PeekableSidebar.Item
                      href="#"
                      icon={<Bell weight="regular" className="h-4 w-4" />}
                      label="Notifications"
                    />
                    <PeekableSidebar.Item
                      href="#"
                      icon={<Gear weight="regular" className="h-4 w-4" />}
                      label="Settings"
                    />
                  </PeekableSidebar.Content>
                </PeekableSidebar>
              </div>
              <div className="flex-1 p-8 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="h-full flex items-center justify-center text-neutral-400 dark:text-neutral-500">
                  Main Content Area
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Example Code */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setShowExample(!showExample)}
            className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <motion.div
              animate={{ rotate: showExample ? 180 : 0 }}
              transition={{ 
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1]
              }}
            >
              <CaretDown weight="bold" className="h-4 w-4" />
            </motion.div>
            Example Usage
          </button>
          <AnimatePresence mode="wait">
            {showExample && (
              <motion.div
                initial={{ height: 0, opacity: 0, scale: 0.98 }}
                animate={{ height: "auto", opacity: 1, scale: 1 }}
                exit={{ height: 0, opacity: 0, scale: 0.98 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1]
                }}
                className="overflow-hidden"
              >
                <CodeBlock
                  language="tsx"
                  filename="components/sidebar.tsx"
                  code={exampleCode}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Code */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Code
          </h2>
          <CodeBlock
            language="tsx"
            filename="peekable-sidebar.tsx"
            code={code}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex-1">
            <Link
              href="/"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              ← Back to components
            </Link>
          </div>
          <div className="flex-1 text-right">
            <Link
              href="/components/morphing-search"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Next: Morphing Search →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 