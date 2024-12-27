import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-[#1a1a1a] shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          Malaysia Runners List
        </Link>

        {/* Right Side: Theme Toggle and Submit Events Button */}
        <div className="flex items-center gap-4">

          {/* Submit Events Button */}
          <Button variant="outline">Submit Events</Button>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}