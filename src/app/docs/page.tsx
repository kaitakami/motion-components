"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { GithubLogo } from "@phosphor-icons/react";

const utilsCode = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Getting Started
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Learn how to use Motion Components in your React applications.
          </p>
        </div>

        {/* Introduction */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Motion Components is a collection of beautiful, reusable React components with smooth animations. Each component is designed to be copy-pasted into your project, allowing you to customize and adapt them to your needs.
          </p>
        </div>

        {/* Prerequisites */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Prerequisites
          </h2>
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 dark:text-gray-400">
              To use these components, you'll need:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-2">
              <li>A React project</li>
              <li>TailwindCSS for styling</li>
              <li>The Motion library (<code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">pnpm i motion</code>)</li>
              <li>clsx and tailwind-merge for class name utilities</li>
            </ul>
          </div>
        </div>

        {/* Utils File */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Required Utils File
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            All components use a utility function for merging Tailwind classes. Create a <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">utils.ts</code> file in your project with the following content:
          </p>
          <CodeBlock
            language="typescript"
            filename="utils.ts"
            code={utilsCode}
          />
        </div>

        {/* Icons */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Icons
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The examples use Phosphor Icons, but you can use any icon library you prefer (like Lucide, Heroicons, etc.). The components are designed to be flexible and work with any icon system that renders as React components.
          </p>
        </div>

        {/* Customization */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Customization
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Each component is designed to be a starting point. Feel free to modify the code, change the styling, or adapt the functionality to match your project's needs. The goal is to provide beautiful, working examples that you can build upon.
          </p>
        </div>

        {/* Contributing */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Contributing
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have a cool component idea or found a bug? Feel free to open an issue on GitHub. I'm actively working on adding new components and improving existing ones.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/kaitakami/motion-components/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <GithubLogo weight="regular" className="h-4 w-4" />
              Create an Issue
            </a>
          </div>
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