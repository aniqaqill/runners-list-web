import Link from "next/link";
// import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import Image from "next/image";
import logoWhite from "../../public/running-white.svg";
import logoBlack from "../../public/running-black.svg";
import { useTheme } from "next-themes"; // Assuming you're using next-themes for theme management

export default function Navbar() {
  const { theme } = useTheme(); // Get the current theme

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-[#1a1a1a] shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Group logo and name together */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={theme === "dark" ? logoWhite : logoBlack} // Toggle logo based on theme
            alt="Malaysia Runners List"
            className="w-8 h-8"
          />
          <span className="text-lg font-bold hidden sm:inline">Malaysia Runners List</span>
        </Link>
        {/* Right Side: Theme Toggle and Submit Events Button */}
        <div className="flex items-center gap-4">
          {/* Submit Events Button */}
          {/* <Button variant="outline">Feedback</Button> */}
          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}