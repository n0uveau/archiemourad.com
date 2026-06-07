import { art } from "@/lib/ascii";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 lg:flex-row gap-8 lg:gap-0 pt-8 lg:pt-0">
      <div className="flex lg:flex-1 items-center justify-center px-8">
        <pre className="text-xs hidden lg:block">{art.full}</pre>
        <pre className="text-xs lg:hidden">{art.compact}</pre>
      </div>

      <div className="flex lg:flex-1 items-center justify-center">
        <div className="px-4 py-1 border border-foreground">
          archiemourad.com
        </div>
      </div>
    </main>
  );
}
