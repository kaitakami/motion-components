"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import Link from "next/link";
import { CommandMenu } from "@/components/ui/command-menu";
import { CodeBlock } from "@/components/ui/code-block";
import { 
  Heart,
  Share,
  Download,
  DotsThree,
  Export,
  Copy,
  Flag,
  CaretDown
} from "@phosphor-icons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const exampleCode = `import { CommandMenu } from "@/components/ui/command-menu";
import { Heart, Share, Download, Copy, Export, Flag } from "@phosphor-icons/react";

export function ImageCard() {
  return (
    <div className="relative">
      <img 
        src="/your-image.jpg" 
        alt="Beautiful landscape" 
        className="rounded-lg"
      />
      <div className="absolute top-4 right-4">
        <CommandMenu>
          <CommandMenu.Trigger>
            <DotsThree weight="bold" className="h-5 w-5" />
          </CommandMenu.Trigger>
          <CommandMenu.Content>
            <CommandMenu.Item 
              onClick={() => console.log("Like")}
              label="Like Photo"
              description="Add this photo to your favorites"
              shortcut="⌘L"
            >
              <Heart className="h-4 w-4" weight="regular" />
            </CommandMenu.Item>
            <CommandMenu.Item 
              onClick={() => console.log("Share")}
              label="Share"
              description="Share with friends or on social media"
              shortcut="⌘S"
            >
              <Share className="h-4 w-4" weight="regular" />
            </CommandMenu.Item>
            <CommandMenu.Item 
              onClick={() => console.log("Download")}
              label="Download"
              description="Save photo in full resolution"
              shortcut="⌘D"
            >
              <Download className="h-4 w-4" weight="regular" />
            </CommandMenu.Item>
          </CommandMenu.Content>
        </CommandMenu>
      </div>
    </div>
  );
}`;

const code = `import { CommandMenu } from "@/components/ui/command-menu"
import { Heart, Share, Download, Copy, Export, Flag } from "@phosphor-icons/react"

export function ImageCard() {
  return (
    <div className="relative">
      <CommandMenu>
        <CommandMenu.Trigger>
          <DotsThree weight="bold" className="h-5 w-5" />
        </CommandMenu.Trigger>
        <CommandMenu.Content>
          <CommandMenu.Item 
            onClick={() => console.log("Like")}
            label="Like Photo"
            description="Add this photo to your favorites"
            shortcut="⌘L"
          >
            <Heart className="h-4 w-4" weight="regular" />
          </CommandMenu.Item>
          <CommandMenu.Item 
            onClick={() => console.log("Share")}
            label="Share"
            description="Share with friends or on social media"
            shortcut="⌘S"
          >
            <Share className="h-4 w-4" weight="regular" />
          </CommandMenu.Item>
          <CommandMenu.Item 
            onClick={() => console.log("Download")}
            label="Download"
            description="Save photo in full resolution"
            shortcut="⌘D"
          >
            <Download className="h-4 w-4" weight="regular" />
          </CommandMenu.Item>
          <CommandMenu.Item 
            onClick={() => console.log("Copy")}
            label="Copy Link"
            description="Copy photo URL to clipboard"
            shortcut="⌘C"
          >
            <Copy className="h-4 w-4" weight="regular" />
          </CommandMenu.Item>
          <CommandMenu.Item 
            onClick={() => console.log("Export")}
            label="Export"
            description="Export in different formats"
            shortcut="⌘E"
          >
            <Export className="h-4 w-4" weight="regular" />
          </CommandMenu.Item>
          <CommandMenu.Item 
            onClick={() => console.log("Report")}
            label="Report"
            description="Report inappropriate content"
          >
            <Flag className="h-4 w-4" weight="regular" />
          </CommandMenu.Item>
        </CommandMenu.Content>
      </CommandMenu>
    </div>
  )
}`

export default function CommandMenuPage() {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Command Menu
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A command menu with smooth animations and elegant interactions. Perfect for actions, settings, or navigation menus.
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
            {/* Image Card */}
            <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-500 to-purple-600 relative">
                <div className="absolute top-4 right-4">
                  <CommandMenu>
                    <CommandMenu.Trigger>
                      <DotsThree weight="bold" className="h-5 w-5" />
                    </CommandMenu.Trigger>
                    <CommandMenu.Content>
                      <CommandMenu.Item 
                        onClick={() => console.log("Like")}
                        label="Like Photo"
                        description="Add this photo to your favorites"
                        shortcut="⌘L"
                      >
                        <Heart className="h-4 w-4" weight="regular" />
                      </CommandMenu.Item>
                      <CommandMenu.Item 
                        onClick={() => console.log("Share")}
                        label="Share"
                        description="Share with friends or on social media"
                        shortcut="⌘S"
                      >
                        <Share className="h-4 w-4" weight="regular" />
                      </CommandMenu.Item>
                      <CommandMenu.Item 
                        onClick={() => console.log("Download")}
                        label="Download"
                        description="Save photo in full resolution"
                        shortcut="⌘D"
                      >
                        <Download className="h-4 w-4" weight="regular" />
                      </CommandMenu.Item>
                      <CommandMenu.Item 
                        onClick={() => console.log("Copy")}
                        label="Copy Link"
                        description="Copy photo URL to clipboard"
                        shortcut="⌘C"
                      >
                        <Copy className="h-4 w-4" weight="regular" />
                      </CommandMenu.Item>
                      <CommandMenu.Item 
                        onClick={() => console.log("Export")}
                        label="Export"
                        description="Export in different formats"
                        shortcut="⌘E"
                      >
                        <Export className="h-4 w-4" weight="regular" />
                      </CommandMenu.Item>
                      <CommandMenu.Item 
                        onClick={() => console.log("Report")}
                        label="Report"
                        description="Report inappropriate content"
                      >
                        <Flag className="h-4 w-4" weight="regular" />
                      </CommandMenu.Item>
                    </CommandMenu.Content>
                  </CommandMenu>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-neutral-800">
                <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">Pied Piper</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  A command menu with smooth animations and elegant interactions. Perfect for actions, settings, or navigation menus.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">Richard Hendricks</span>
                </div>
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
                  filename="components/image-card.tsx"
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
            filename="command-menu.tsx"
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