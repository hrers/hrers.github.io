import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-mono text-[#00ff41] flex items-center justify-center px-6">
      <div className="max-w-xl w-full space-y-6">
        <div className="space-y-2">
          <p>
            <span className="text-[#00d4ff]">visitor@blog</span>
            <span className="text-white">:</span>
            <span className="text-[#00d4ff]">~</span>
            <span className="text-white">$ </span>
            cd /page-not-found
          </p>
          <p className="text-red-500">
            bash: cd: /page-not-found: No such file or directory
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-zinc-500">
            # 错误代码: 404
          </p>
          <p className="text-zinc-500">
            # 您访问的页面不存在或已被移除
          </p>
        </div>

        <div>
          <p>
            <span className="text-[#00d4ff]">visitor@blog</span>
            <span className="text-white">:</span>
            <span className="text-[#00d4ff]">~</span>
            <span className="text-white">$ </span>
            <Link
              href="/"
              className="text-[#00ff41] hover:text-[#00d4ff] underline underline-offset-4 transition-colors"
            >
              cd /home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
