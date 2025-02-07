"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

interface MorphingSearchProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function MorphingSearch({
  onSearch,
  placeholder = "Search...",
  className,
}: MorphingSearchProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      onSearch?.(value);
      setExpanded(false);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setExpanded(false);
      setValue("");
    }
  };

  React.useEffect(() => {
    if (expanded) {
      inputRef.current?.focus();
    }
  }, [expanded]);

  return (
    <div className="relative">
      <motion.div 
        className={cn("relative z-[100]", className)}
        initial={false}
        animate={{ 
          width: expanded ? 320 : 40,
          borderRadius: expanded ? 12 : 20
        }}
        transition={{
          duration: 0.3,
          ease: [0.32, 0.72, 0, 1]
        }}
      >
        <div
          className={cn(
            "relative h-10 flex items-center w-full",
            "bg-white dark:bg-neutral-900",
            "border border-black/[0.08] dark:border-white/[0.08]",
            "shadow-[0_1px_1px_rgba(0,0,0,0.025)]",
            "overflow-hidden"
          )}
          style={{ borderRadius: "inherit" }}
        >
          <div className={cn(
            "flex items-center justify-center flex-shrink-0",
            expanded ? "w-[48px]" : "w-10"
          )}>
            <button
              type={expanded ? "submit" : "button"}
              onClick={() => !expanded && setExpanded(true)}
              className={cn(
                "flex items-center justify-center w-10 h-10",
                "text-neutral-600 dark:text-neutral-400",
                "hover:text-neutral-900 dark:hover:text-neutral-100",
                "transition-colors duration-200"
              )}
            >
              <MagnifyingGlass weight="regular" className="h-[18px] w-[18px]" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {expanded && (
              <motion.form 
                onSubmit={handleSubmit}
                className="flex-1 flex items-center pr-2 min-w-0"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8, transition: { duration: 0.15 } }}
                transition={{ 
                  duration: 0.2,
                  ease: [0.32, 0.72, 0, 1]
                }}
              >
                <div className="flex-1 min-w-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={cn(
                      "w-full bg-transparent outline-none truncate",
                      "text-neutral-900 dark:text-neutral-100",
                      "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                      "text-[16px]"
                    )}
                  />
                </div>

                {value && (
                  <button
                    type="button"
                    onClick={() => setValue("")}
                    className={cn(
                      "p-1.5 rounded-full ml-1 flex-shrink-0",
                      "text-neutral-400 dark:text-neutral-500",
                      "hover:text-neutral-600 dark:hover:text-neutral-300",
                      "hover:bg-black/5 dark:hover:bg-white/5",
                      "transition-colors"
                    )}
                  >
                    <X weight="bold" className="h-[14px] w-[14px]" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className={cn(
                    "px-2 py-1 ml-1 flex-shrink-0",
                    "text-[11px] font-medium tracking-wide",
                    "text-neutral-400 dark:text-neutral-500",
                    "transition-colors",
                    "uppercase"
                  )}
                >
                  esc
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 