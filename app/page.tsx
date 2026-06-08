import { art } from "@/lib/ascii";

const links = [
  { label: "GitHub", href: "https://github.com/n0uveau" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/archiemourad" },
  { label: "Email", href: "mailto:mouradarchie@gmail.com" },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1 lg:flex-row gap-8 lg:gap-0 pt-8 lg:pt-0">
      <div className="flex lg:flex-1 items-center justify-center text-muted px-8 select-none">
        <pre className="text-xs hidden lg:block">{art.full}</pre>
        <pre className="text-xs lg:hidden">{art.compact}</pre>
      </div>

      <div className="flex lg:flex-1 items-center justify-center">
        <div className="flex flex-col px-4 py-1 border border-muted">
          <span className="text-center mb-1">archiemourad.com</span>

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
                      : "noopener noreferrer"
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
