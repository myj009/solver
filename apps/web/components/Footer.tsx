import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#121212] rounded-xl w-full py-12 text-muted-foreground">
      <div className="container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold text-white">For Clients</h4>
          <nav className="grid gap-2 text-gray-200">
            <Link href="#" className="hover:underline" prefetch={false}>
              Services
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Portfolio
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold text-white">For Developers</h4>
          <nav className="grid gap-2 text-gray-200">
            <Link href="#" className="hover:underline" prefetch={false}>
              Job Postings
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Tools
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Community
            </Link>
          </nav>
        </div>
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold text-white">Company</h4>
          <nav className="grid gap-2 text-gray-200">
            <Link href="#" className="hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
          </nav>
        </div>
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold text-white">Follow Us</h4>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              aria-label="LinkedIn"
              className="text-2xl hover:text-white"
              prefetch={false}
            >
              <LinkedinIcon />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="text-2xl hover:text-white"
              prefetch={false}
            >
              <TwitterIcon />
            </Link>
            <Link
              href="#"
              aria-label="GitHub"
              className="text-2xl hover:text-white"
              prefetch={false}
            >
              <GitlabIcon />
            </Link>
          </div>
          <div className="text-sm text-gray-200">
            &copy; 2024 Solver. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function GitlabIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  );
}

function LinkedinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
