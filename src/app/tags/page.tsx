import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata = {
  title: "Tags — All Topics",
  description: "Browse all blog tags",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-background text-primary font-mono px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-muted text-sm mb-2">
            <Link href="/" className="hover:text-primary transition-colors">~</Link>
            <span className="mx-1">/</span>
            <span className="text-primary">tags</span>
          </p>
          <h1 className="text-2xl font-bold mb-2">$ grep -r &quot;tags&quot; ./posts/</h1>
          <p className="text-muted text-sm">{tags.length} unique tags found</p>
        </div>

        {/* Tags list */}
        <div className="space-y-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded hover:bg-primary/5 transition-colors"
            >
              <span className="text-muted text-sm w-6 text-right shrink-0">{count}</span>
              <span className="text-muted">|</span>
              <span className="text-primary group-hover:text-foreground transition-colors">
                #{tag}
              </span>
              <span className="text-muted text-sm ml-auto hidden sm:inline">
                {count} {count === 1 ? "match" : "matches"}
              </span>
            </Link>
          ))}
        </div>

        {tags.length === 0 && (
          <p className="text-muted mt-8">$ grep: no tags found</p>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border text-muted text-sm">
          <Link href="/posts" className="hover:text-primary transition-colors underline underline-offset-4">
            $ ls ./posts/
          </Link>
          {" — "}view all articles
        </div>
      </div>
    </main>
  );
}
