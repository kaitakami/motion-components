"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface CommandMenuProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down";
  align?: "start" | "center" | "end";
}

interface CommandMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  direction: "up" | "down";
  align: "start" | "center" | "end";
}

const CommandMenuContext = React.createContext<CommandMenuContextValue | undefined>(
  undefined
);

const useCommandMenu = () => {
  const context = React.useContext(CommandMenuContext);
  if (!context) {
    throw new Error("CommandMenu components must be used within a CommandMenu");
  }
  return context;
};

interface CommandMenuTriggerProps {
  className?: string;
  children?: React.ReactNode;
}

interface CommandMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CommandMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
  description?: string;
  shortcut?: string;
}

function CommandMenuTrigger({
  className,
  children,
}: CommandMenuTriggerProps) {
  const { open, setOpen } = useCommandMenu();

  return (
    <motion.button
      type="button"
      onClick={() => setOpen(!open)}
      whileHover={{ 
        scale: 1.02,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ 
        scale: 0.98,
        backgroundColor: "rgba(0, 0, 0, 0.15)",
      }}
      className={cn(
        "h-9 w-9 rounded-full bg-black/5 dark:bg-white/10",
        "text-neutral-700 dark:text-neutral-200",
        "flex items-center justify-center relative z-50",
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

function CommandMenuContent({
  children,
  className,
}: CommandMenuContentProps) {
  const context = useCommandMenu();
  const { open, direction, align } = context;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/10 dark:bg-black/30 backdrop-blur-sm z-40"
            onClick={() => context.setOpen(false)}
          />
          <div 
            className={cn(
              "absolute z-50",
              {
                "right-0": align === "end",
                "left-1/2 -translate-x-1/2": align === "center",
                "left-0": align === "start"
              },
              direction === "up" ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
            )}
          >
            <motion.div
              className={cn(
                "flex flex-col bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xl rounded-xl py-1",
                "shadow-lg shadow-black/5 dark:shadow-black/20",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "min-w-[220px] max-w-[280px]",
                className
              )}
              initial={{ opacity: 0, y: direction === "up" ? 4 : -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: direction === "up" ? 4 : -4, scale: 0.98 }}
              transition={{ 
                duration: 0.1,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function CommandMenuItem({
  children,
  className,
  onClick,
  label,
  description,
  shortcut,
}: CommandMenuItemProps) {
  const context = useCommandMenu();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => {
        onClick?.();
        context.setOpen(false);
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative w-full px-3 py-2 group",
        "text-neutral-700 dark:text-neutral-200",
        "flex items-center gap-3",
        "transition-all duration-150",
        className
      )}
    >
      <motion.div 
        className={cn(
          "h-7 w-7 rounded-full bg-black/[0.06] dark:bg-white/[0.06]",
          "flex items-center justify-center flex-shrink-0",
          "transition-colors duration-150",
          "group-hover:bg-black/10 dark:group-hover:bg-white/10",
          "group-active:bg-black/15 dark:group-active:bg-white/15"
        )}
      >
        {children}
      </motion.div>
      <div className="flex-1 text-left">
        <div className="text-sm font-medium transition-colors group-hover:text-black dark:group-hover:text-white">{label}</div>
        {description && (
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-300">{description}</div>
        )}
      </div>
      {shortcut && (
        <div className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0 transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-400">{shortcut}</div>
      )}
    </motion.button>
  );
}

export function CommandMenu({ 
  children, 
  className,
  direction = "down",
  align = "end",
}: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <CommandMenuContext.Provider value={{ open, setOpen, direction, align }}>
      <div className={cn("relative inline-block", className)}>{children}</div>
    </CommandMenuContext.Provider>
  );
}

CommandMenu.Trigger = CommandMenuTrigger;
CommandMenu.Content = CommandMenuContent;
CommandMenu.Item = CommandMenuItem; 