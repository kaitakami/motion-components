"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { MorphingSearch } from "@/components/ui/morphing-search";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const exampleCode = `import { MorphingSearch } from "@/components/ui/morphing-search";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-black/[0.08] dark:border-white/[0.08]">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600" />
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Dashboard
        </h1>
      </div>
      <MorphingSearch 
        onSearch={(value) => console.log("Search:", value)}
        placeholder="Search anything..."
      />
    </header>
  );
}`;

const code = `import * as React from "react";
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
                      "text-[15px]"
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
}`;

export default function MorphingSearchPage() {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Morphing Search
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A search input that morphs from a compact icon to an expanded search field with smooth animations. Perfect for navigation bars and minimal interfaces.
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
                <MorphingSearch 
                  onSearch={(value) => console.log("Search:", value)}
                  placeholder="Search anything..."
                />
              </div>
              <div className="h-[400px] bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-center text-neutral-400 dark:text-neutral-500">
                Main Content Area
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
            filename="morphing-search.tsx"
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
              href="/components/command-menu"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Next: Command Menu →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 