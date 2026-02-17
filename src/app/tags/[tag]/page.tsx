import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  return params.then(({ tag }) => {
    const decoded = decodeURIComponent(tag);
    return {
      title: `#${decoded} — Tagged Posts`,
      description: `All posts tagged with ${decoded}`,
    };
  });
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-primary font-mono px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-muted text-sm mb-2">
            <Link href="/" className="hover:text-primary transition-colors">~</Link>
            <span className="mx-1">/</span>
            <Link href="/tags" className="hover:text-primary transition-colors">tags</Link>
            <span className="mx-1">/</span>
            <span className="text-primary">{tag}</span>
          </p>
          <h1 className="text-2xl font-bold mb-2">$ grep -r &quot;{tag}&quot; ./posts/</h1>
          <p className="text-muted text-sm">{posts.length} {posts.length === 1 ? "match" : "matches"} found</p>
        </div>

        {/* Post listing header */}
        <div className="border-b border-border pb-2 mb-4 text-xs text-muted hidden sm:grid sm:grid-cols-[100px_60px_1fr]">
          <span>date</span>
          <span>read</span>
          <span>title</span>
        </div>

        {/* Posts */}
        <ul className="space-y-1">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="group block sm:grid sm:grid-cols-[100px_60px_1fr] items-baseline py-2 px-2 -mx-2 rounded hover:bg-primary/5 transition-colors"
              >
                <time className="text-muted text-sm shrink-0">
                  {post.date}
                </time>
                <span className="text-muted text-xs hidden sm:inline">
                  {post.readingTime.replace(" read", "")}
                </span>
                <span className="text-primary group-hover:text-foreground transition-colors block sm:inline">
                  <span className="text-muted mr-1">&gt;</span>
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border flex justify-between text-sm text-muted">
          <Link href="/tags" className="hover:text-primary transition-colors">
            &lt;- cd ../tags
          </Link>
          <Link href="/posts" className="hover:text-primary transition-colors">
            $ ls ./posts/
          </Link>
        </div>
      </div>
    </main>
  );
}
