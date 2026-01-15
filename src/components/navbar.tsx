"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ModeToggle from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for client-side hydration to avoid flash
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/70 dark:bg-black/70 backdrop-blur-xl"
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            {/* Show both logos, use CSS to toggle visibility to prevent flash */}
            <Image
              src="/running-black.svg"
              alt="Runners List Logo"
              fill
              className={`object-contain transition-opacity duration-200 ${
                mounted && resolvedTheme === "dark" ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src="/running-white.svg"
              alt="Runners List Logo"
              fill
              className={`object-contain absolute inset-0 transition-opacity duration-200 ${
                mounted && resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-foreground">
              Runners List
            </span>
            <span className="block text-xs text-muted-foreground -mt-0.5">
              Malaysia
            </span>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}