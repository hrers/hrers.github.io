import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于 | Terminal Blog',
  description: '关于博主的信息',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-mono text-primary px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* whoami */}
        <section className="space-y-3">
          <p>
            <span className="text-accent">visitor@blog</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ </span>
            whoami
          </p>
          <div className="pl-4 border-l-2 border-primary/20 space-y-2">
            <p className="text-lg text-foreground">一个热爱技术的全栈开发者</p>
            <p className="text-muted">
              专注于 Web 开发、系统架构和开源项目。喜欢用代码解决问题，
              也喜欢把学到的东西写下来分享给更多人。
            </p>
            <p className="text-muted">
              相信技术的力量可以改变世界，也相信持续学习是工程师最重要的品质。
            </p>
          </div>
        </section>

        {/* skills --list */}
        <section className="space-y-3">
          <p>
            <span className="text-accent">visitor@blog</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ </span>
            skills --list
          </p>
          <div className="pl-4 border-l-2 border-primary/20">
            <table className="text-sm">
              <tbody>
                <tr>
                  <td className="pr-8 py-1 text-accent">语言</td>
                  <td className="text-foreground">TypeScript, JavaScript, Python, Go, Rust</td>
                </tr>
                <tr>
                  <td className="pr-8 py-1 text-accent">前端</td>
                  <td className="text-foreground">React, Next.js, Vue, Tailwind CSS</td>
                </tr>
                <tr>
                  <td className="pr-8 py-1 text-accent">后端</td>
                  <td className="text-foreground">Node.js, Express, NestJS, FastAPI</td>
                </tr>
                <tr>
                  <td className="pr-8 py-1 text-accent">数据库</td>
                  <td className="text-foreground">PostgreSQL, MongoDB, Redis</td>
                </tr>
                <tr>
                  <td className="pr-8 py-1 text-accent">DevOps</td>
                  <td className="text-foreground">Docker, Kubernetes, CI/CD, Linux</td>
                </tr>
                <tr>
                  <td className="pr-8 py-1 text-accent">工具</td>
                  <td className="text-foreground">Git, Vim, VS Code, Claude</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* contact --info */}
        <section className="space-y-3">
          <p>
            <span className="text-accent">visitor@blog</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ </span>
            contact --info
          </p>
          <div className="pl-4 border-l-2 border-primary/20 space-y-1 text-sm">
            <p>
              <span className="text-accent">GitHub    </span>
              <a
                href="https://github.com/username"
                className="text-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/username
              </a>
            </p>
            <p>
              <span className="text-accent">Email     </span>
              <a
                href="mailto:hello@example.com"
                className="text-foreground hover:text-primary transition-colors"
              >
                hello@example.com
              </a>
            </p>
            <p>
              <span className="text-accent">Twitter   </span>
              <a
                href="https://twitter.com/username"
                className="text-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                @username
              </a>
            </p>
          </div>
        </section>

        {/* EOF */}
        <div className="pt-4 text-muted text-sm">
          <p>--- EOF ---</p>
        </div>
      </div>
    </div>
  )
}
