import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Posts — All Articles",
  description: "Browse all blog posts",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-background text-primary font-mono px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-muted text-sm mb-2">
            <Link href="/" className="hover:text-primary transition-colors">~</Link>
            <span className="mx-1">/</span>
            <span className="text-primary">posts</span>
          </p>
          <h1 className="text-2xl font-bold mb-2">$ ls -la ./posts/</h1>
          <p className="text-muted text-sm">total {posts.length} articles</p>
        </div>

        {/* Post listing header */}
        <div className="border-b border-border pb-2 mb-4 text-xs text-muted hidden sm:grid sm:grid-cols-[100px_60px_1fr_120px]">
          <span>date</span>
          <span>read</span>
          <span>title</span>
          <span>tags</span>
        </div>

        {/* Posts */}
        <ul className="space-y-1">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="group block sm:grid sm:grid-cols-[100px_60px_1fr_120px] items-baseline py-2 px-2 -mx-2 rounded hover:bg-primary/5 transition-colors"
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
                <span className="text-muted text-xs truncate hidden sm:inline">
                  [{post.tags.join(", ")}]
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {posts.length === 0 && (
          <p className="text-muted mt-8">$ ls: no articles found</p>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border text-muted text-sm">
          <p>
            <Link href="/tags" className="hover:text-primary transition-colors underline underline-offset-4">
              $ cat tags
            </Link>
            {" — "}browse by topic
          </p>
        </div>
      </div>
    </main>
  );
}
