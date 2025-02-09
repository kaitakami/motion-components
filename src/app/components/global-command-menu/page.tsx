"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { CodeBlock } from "@/components/ui/code-block";
import { GlobalCommandMenu, type GlobalCommandMenuItem } from "@/components/ui/global-command-menu";
import { CaretDown, House, Gear, User, Bell, ChatCircle, Plus, ArrowSquareOut, Folder, Globe, Lock } from "@phosphor-icons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const exampleCode = `import { GlobalCommandMenu } from "@/components/ui/global-command-menu";
import { House, Gear, User, Bell } from "@phosphor-icons/react";

const items = [
  {
    id: "home",
    title: "Go Home",
    description: "Return to the home page",
    icon: <House className="h-5 w-5" />,
    shortcut: ["⌘", "H"],
    onClick: () => window.location.href = "/",
    category: "Navigation"
  },
  {
    id: "settings",
    title: "Settings",
    description: "Manage your account settings",
    icon: <Gear className="h-5 w-5" />,
    shortcut: ["⌘", "S"],
    category: "Settings"
  },
  // ... more items
];

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600" />
        <h1 className="text-lg font-semibold">
          Dashboard
        </h1>
      </div>
      <GlobalCommandMenu 
        items={items}
        onSelect={(item) => console.log("Selected:", item)}
      />
    </header>
  );
}`;

const items: GlobalCommandMenuItem[] = [
  {
    id: "home",
    title: "Go Home",
    description: "Return to the home page",
    icon: <House className="h-5 w-5" />,
    shortcut: ["⌘", "H"],
    onClick: () => console.log("Go Home"),
    category: "Navigation"
  },
  {
    id: "settings",
    title: "Settings",
    description: "Manage your account settings",
    icon: <Gear className="h-5 w-5" />,
    shortcut: ["⌘", "S"],
    category: "Settings"
  },
  {
    id: "profile",
    title: "Profile",
    description: "View and edit your profile",
    icon: <User className="h-5 w-5" />,
    shortcut: ["⌘", "P"],
    category: "Navigation"
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "View your notifications",
    icon: <Bell className="h-5 w-5" />,
    shortcut: ["⌘", "N"],
    category: "Navigation"
  },
  {
    id: "messages",
    title: "Messages",
    description: "View your messages",
    icon: <ChatCircle className="h-5 w-5" />,
    shortcut: ["⌘", "M"],
    category: "Navigation"
  },
  {
    id: "new-project",
    title: "Create Project",
    description: "Create a new project",
    icon: <Plus className="h-5 w-5" />,
    shortcut: ["⌘", "⇧", "N"],
    category: "Actions"
  },
  {
    id: "docs",
    title: "Documentation",
    description: "View the documentation",
    icon: <ArrowSquareOut className="h-5 w-5" />,
    shortcut: ["⌘", "D"],
    category: "Help"
  },
  {
    id: "projects",
    title: "Projects",
    description: "Browse all projects",
    icon: <Folder className="h-5 w-5" />,
    category: "Navigation"
  },
  {
    id: "website",
    title: "Visit Website",
    description: "Open the public website",
    icon: <Globe className="h-5 w-5" />,
    category: "Actions"
  },
  {
    id: "security",
    title: "Security",
    description: "Manage security settings",
    icon: <Lock className="h-5 w-5" />,
    category: "Settings"
  }
];

const code = `
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { MagnifyingGlass, Command, ArrowRight } from "@phosphor-icons/react";
import { useHotkeys } from "react-hotkeys-hook";

interface GlobalCommandMenuProps {
  items?: GlobalCommandMenuItem[];
  onSelect?: (item: GlobalCommandMenuItem) => void;
  className?: string;
}

export interface GlobalCommandMenuItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  onClick?: () => void;
  category?: string;
}

export function GlobalCommandMenu({
  items = [],
  onSelect,
  className,
}: GlobalCommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const categories = React.useMemo(() => {
    const uniqueCategories = new Set(items.map(item => item.category));
    return Array.from(uniqueCategories).filter(Boolean) as string[];
  }, [items]);

  const filteredItems = React.useMemo(() => {
    if (!value) return items;
    const searchValue = value.toLowerCase();
    return items.filter((item) => 
      item.title.toLowerCase().includes(searchValue) || 
      item.description?.toLowerCase().includes(searchValue) ||
      item.category?.toLowerCase().includes(searchValue)
    );
  }, [items, value]);

  const groupedItems = React.useMemo(() => {
    return categories.reduce((acc, category) => {
      const categoryItems = filteredItems.filter(item => item.category === category);
      if (categoryItems.length > 0) {
        acc[category] = categoryItems;
      }
      return acc;
    }, {} as Record<string, GlobalCommandMenuItem[]>);
  }, [categories, filteredItems]);

  useHotkeys(["meta+k", "ctrl+k"], (e) => {
    e.preventDefault();
    setOpen(true);
  });

  useHotkeys("esc", () => {
    setOpen(false);
    setValue("");
  }, { enabled: true });

  useHotkeys("enter", () => {
    if (filteredItems[selectedIndex]) {
      handleSelect(filteredItems[selectedIndex]);
    }
  }, { enabled: open });

  useHotkeys("up", (e) => {
    e.preventDefault();
    setSelectedIndex((prev) => 
      prev > 0 ? prev - 1 : filteredItems.length - 1
    );
  }, { enabled: open });

  useHotkeys("down", (e) => {
    e.preventDefault();
    setSelectedIndex((prev) => 
      prev < filteredItems.length - 1 ? prev + 1 : 0
    );
  }, { enabled: open });

  const handleSelect = (item: GlobalCommandMenuItem) => {
    onSelect?.(item);
    item.onClick?.();
    setOpen(false);
    setValue("");
  };

  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [value]);

  React.useEffect(() => {
    const selectedElement = listRef.current?.children[selectedIndex] as HTMLElement;
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 px-3 h-10 rounded-xl",
          "bg-white/90 dark:bg-neutral-900/90",
          "backdrop-blur-xl",
          "border border-black/[0.08] dark:border-white/[0.08]",
          "shadow-[0_2px_4px_rgba(0,0,0,0.02)]",
          "text-neutral-600 dark:text-neutral-400",
          "hover:text-neutral-900 dark:hover:text-neutral-100",
          "hover:bg-white dark:hover:bg-neutral-800",
          "transition-all duration-200",
          className
        )}
      >
        <Command weight="regular" className="h-[18px] w-[18px]" />
        <span className="text-[15px]">Quick Actions</span>
        <div className="flex items-center gap-1 ml-auto">
          <kbd className="text-[12px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
            ⌘
          </kbd>
          <kbd className="text-[12px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
            K
          </kbd>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[999999]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setOpen(false);
                  setValue("");
                }
              }}
            />

            <div 
              className="fixed inset-0 flex items-start justify-center pt-[20vh]"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setOpen(false);
                  setValue("");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setOpen(false);
                  setValue("");
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ 
                  duration: 0.2,
                  ease: [0.32, 0.72, 0, 1]
                }}
                className="w-full max-w-[640px] p-4"
              >
                <div className="relative rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-2xl shadow-black/[0.1] dark:shadow-black/[0.2]">
                  <div className="p-4 border-b border-black/[0.08] dark:border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <MagnifyingGlass weight="regular" className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search actions..."
                        className={cn(
                          "flex-1 bg-transparent outline-none",
                          "text-neutral-900 dark:text-neutral-100",
                          "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                          "text-[16px]"
                        )}
                      />
                      {value && (
                        <button
                          type="button"
                          onClick={() => setValue("")}
                          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div 
                    ref={listRef}
                    className={cn(
                      "px-2 pb-2 max-h-[382px] overflow-y-auto overscroll-contain",
                      "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    )}
                  >
                    {Object.entries(groupedItems).length === 0 ? (
                      <div className="px-4 py-12 text-center text-neutral-500 dark:text-neutral-400">
                        No results found.
                      </div>
                    ) : (
                      Object.entries(groupedItems).map(([category, items]) => (
                        <div key={category} className="mb-4 first:mt-2">
                          <div className="px-3 mb-2">
                            <h3 className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                              {category}
                            </h3>
                          </div>
                          <div className="space-y-1">
                            {items.map((item, index) => (
                              <motion.button
                                key={item.id}
                                type="button"
                                initial={false}
                                animate={{ 
                                  backgroundColor: selectedIndex === index 
                                    ? "rgb(0 0 0 / 0.06)" 
                                    : "transparent",
                                  color: selectedIndex === index
                                    ? "rgb(23 23 23)"
                                    : "rgb(115 115 115)"
                                }}
                                onClick={() => handleSelect(item)}
                                className={cn(
                                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg group",
                                  "text-neutral-700 dark:text-neutral-300",
                                  "hover:bg-black/[0.06] dark:hover:bg-white/[0.06]",
                                  "dark:[&[data-selected=true]]:text-white",
                                  "dark:[&[data-selected=true]]:bg-white/[0.1]",
                                  "transition-all duration-200"
                                )}
                                data-selected={selectedIndex === index}
                              >
                                <div className={cn(
                                  "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                                  "bg-neutral-100 dark:bg-neutral-800",
                                  "text-neutral-500 dark:text-neutral-400",
                                  "group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700",
                                  "transition-colors duration-200"
                                )}>
                                  {item.icon}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-[15px] font-medium flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                                    {item.title}
                                    <ArrowRight weight="bold" className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                  </div>
                                  {item.description && (
                                    <div className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                                      {item.description}
                                    </div>
                                  )}
                                </div>
                                {item.shortcut && (
                                  <div className="flex items-center gap-1">
                                    {item.shortcut.map((key, i) => (
                                      <React.Fragment key={i}>
                                        <kbd className="text-[12px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                          {key}
                                        </kbd>
                                      </React.Fragment>
                                    ))}
                                  </div>
                                )}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
} 
`;

export default function GlobalCommandMenuPage() {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Global Command Menu
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A modern command menu with smooth animations and elegant interactions. Perfect for global actions, navigation, and quick access to features.
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
          <div className="relative rounded-lg bg-white dark:bg-neutral-900 p-4 md:p-8">
            <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08]">
              <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-black/[0.08] dark:border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600" />
                  <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Dashboard
                  </h1>
                </div>
                <GlobalCommandMenu 
                  items={items}
                  onSelect={(item) => console.log("Selected:", item)}
                />
              </div>
              <div className="h-[400px] bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-center text-neutral-400 dark:text-neutral-500">
                Press ⌘K to open the command menu
              </div>
            </div>
          </div>
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
                  filename="components/header.tsx"
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
            filename="global-command-menu.tsx"
            code={code}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex-1">
            <Link
              href="/components/command-menu"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              ← Previous: Command Menu
            </Link>
          </div>
          <div className="flex-1 text-right">
            <Link
              href="/components/peekable-sidebar"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Next: Peekable Sidebar →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 