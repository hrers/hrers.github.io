import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    try {
      const post = getPostBySlug(slug);
      return {
        title: `${post.title} — Blog`,
        description: post.excerpt,
      };
    } catch {
      return { title: "Post Not Found" };
    }
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-primary font-mono px-6 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            ~
          </Link>
          <span className="mx-1">/</span>
          <Link href="/posts" className="hover:text-primary transition-colors">
            posts
          </Link>
          <span className="mx-1">/</span>
          <span className="text-primary">{slug}</span>
        </nav>

        {/* Post header */}
        <header className="mb-10 border-b border-border pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <time>date: {post.date}</time>
            <span>read: {post.readingTime}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-xs border border-border px-2 py-0.5 text-muted hover:text-primary hover:border-primary transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        {/* MDX content */}
        <article
          className="prose max-w-none
          prose-headings:text-primary prose-headings:font-mono prose-headings:font-bold
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-accent
          prose-strong:text-primary
          prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-none
          prose-blockquote:border-l-primary prose-blockquote:text-muted
          prose-li:text-foreground
          prose-ol:text-foreground
          prose-ul:text-foreground
          [&_pre]:!bg-surface
          [&_code[data-theme]]:!bg-transparent
        "
        >
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    { theme: { light: "github-light", dark: "github-dark" } },
                  ],
                ],
              },
            }}
          />
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-6 border-t border-border flex justify-between text-sm text-muted">
          <Link href="/posts" className="hover:text-primary transition-colors">
            &lt;- cd ../posts
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            cd ~
          </Link>
        </div>
      </div>
    </main>
  );
}
