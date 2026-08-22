import { AsciiArt } from "@/components/ascii-art";

const links = [
  { label: "GitHub", href: "https://github.com/n0uveau" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/archiemourad" },
  { label: "Email", href: "mailto:mouradarchie@gmail.com" },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1 lg:flex-row gap-8 lg:gap-0 pt-8 lg:pt-0">
      <div
        aria-hidden
        className="flex lg:flex-1 items-center justify-center text-muted px-8"
      >
        <AsciiArt variant="full" className="hidden lg:block" />
        <AsciiArt variant="compact" className="lg:hidden" />
      </div>

      <div className="flex lg:flex-1 items-center justify-center">
        <div className="flex flex-col px-4 py-1 border border-muted">
          <div className="flex flex-col text-center mb-2">
            <h1>Archie Mourad</h1>
            <span className="text-muted text-xs">archiemourad.com</span>
          </div>

          <nav className="leading-tight">
            {links.map(({ label, href }) => (
              <div key={href} className="flex gap-1">
                <span className="text-muted">&gt;</span>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "me noopener noreferrer"
                  }
                  className="text-link no-underline hover:underline"
                >
                  {label}
                </a>
              </div>
            ))}
          </nav>

          <div className="text-xs mt-2">
            <span className="text-muted">~ this site is </span>
            <a
              href="https://github.com/n0uveau/archiemourad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent no-underline hover:underline"
            >
              open source
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
