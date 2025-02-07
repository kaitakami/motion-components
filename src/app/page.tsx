"use client";

import { Star } from "@phosphor-icons/react";
import Link from "next/link";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { components } from "@/lib/data";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-16 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500" />
              <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">
                motion-components/ui
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white">
              Beautiful Motion Components
            </h1>
          </div>
          <div className="mt-6 relative">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 relative">
              Copy and paste motion components for your React applications.
              <br />
              Beautifully designed, fully animated, accessible.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm">
              <Link 
                href="/docs" 
                className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                href="https://github.com/kaitakami/motion-components" 
                className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-2"
              >
                <Star weight="regular" className="h-4 w-4" />
                on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {components.map((component) => (
          <li key={component.href || component.title} className="list-none">
            <div className="relative h-full rounded-xl border border-neutral-200 dark:border-neutral-800 p-1">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              {component.comingSoon ? (
                <div className="relative flex flex-col gap-2 rounded-lg p-4 bg-white dark:bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-medium text-gray-900 dark:text-white">
                      {component.title}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {component.description}
                  </p>
                </div>
              ) : (
                <Link 
                  href={component.href || "#"}
                  className="relative flex flex-col gap-2 rounded-lg p-4 bg-white dark:bg-neutral-900"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-medium text-gray-900 dark:text-white">
                      {component.title}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {component.description}
                  </p>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
