"use client";

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
PeekableSidebar.Item = PeekableSidebarItem; 