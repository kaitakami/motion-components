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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
                                      <React.Fragment key={`${i + 1}`}>
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