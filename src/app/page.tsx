import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import Typewriter from '@/components/Typewriter'

export default async function HomePage() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="min-h-screen bg-background font-mono text-primary px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Terminal welcome */}
        <section className="space-y-3">
          <p>
            <span className="text-accent">visitor@blog</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ </span>
            whoami
          </p>
          <p className="text-lg">
            <Typewriter text="> Terminal Blog - 一个开发者的终端" speed={40} />
          </p>

          <p className="mt-4">
            <span className="text-accent">visitor@blog</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ </span>
            cat welcome.txt
          </p>
          <p className="text-muted">
            <Typewriter
              text="> 欢迎来到我的博客。这里记录代码、技术和一些思考。"
              speed={30}
              delay={2000}
            />
          </p>
        </section>

        {/* Recent posts */}
        <section className="space-y-4">
          <p>
            <span className="text-accent">visitor@blog</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ </span>
            ls -la /posts/ --recent
          </p>

          <div className="space-y-1 text-sm">
            <p className="text-muted">
              total {posts.length}
            </p>
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block hover:bg-primary/5 px-2 py-0.5 -mx-2 rounded transition-colors group"
              >
                <span className="text-muted">drwxr-xr-x  </span>
                <span className="text-accent">user  </span>
                <span className="text-muted">{post.date}  </span>
                <span className="text-primary group-hover:text-accent transition-colors">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>

          <p className="pt-2">
            <span className="text-accent">visitor@blog</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ </span>
            <Link
              href="/posts"
              className="text-primary hover:text-accent underline underline-offset-4 transition-colors"
            >
              ls -la /posts/
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}
