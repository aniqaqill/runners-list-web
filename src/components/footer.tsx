import Link from "next/link";
import * as SimpleIcons from "simple-icons";
// ref icon : https://simpleicons.org/

export default function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold">runners list</h2>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/aniqaqill/runners-list"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={SimpleIcons.siGithub.path} />
              </svg>
            </Link>
            {/* <Link
              href="https://twitter.com/fmt_aniq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={SimpleIcons.siX.path} />
              </svg>
            </Link>
            <Link
              href="mailto:scriptaniq@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={SimpleIcons.siGmail.path} />
              </svg>
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}