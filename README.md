# Terminal Blog

一个终端风格的个人博客，基于 Next.js 构建。

---

# 第一部分：技术架构

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.1.6 | React 全栈框架，负责路由、SSG 静态生成、页面渲染 |
| React | 19.2.3 | UI 组件库 |
| TypeScript | 5.x | 类型安全的 JavaScript |
| Tailwind CSS | 4.x | 原子化 CSS 样式框架 |
| MDX | via next-mdx-remote 6.x | 文章内容格式，Markdown + JSX |
| Shiki + rehype-pretty-code | 3.x / 0.14.x | 代码块语法高亮 |
| gray-matter | 4.x | 解析 MDX 文件头部的元数据（标题、日期等） |
| reading-time | 1.5.x | 自动计算文章阅读时间 |

## 项目结构

```
blog/
├── content/
│   └── posts/                ← 文章 MDX 文件存放处
│       ├── hello-world.mdx
│       ├── nextjs-blog.mdx
│       └── terminal-aesthetic.mdx
├── public/                   ← 静态资源（图片等）
├── src/
│   ├── app/                  ← 页面（Next.js App Router）
│   │   ├── layout.tsx        ← 全局布局（Header + Footer + 主题）
│   │   ├── page.tsx          ← 首页
│   │   ├── globals.css       ← 全局样式 + 主题颜色变量
│   │   ├── not-found.tsx     ← 404 页面
│   │   ├── about/page.tsx    ← 关于页
│   │   ├── posts/
│   │   │   ├── page.tsx      ← 文章列表页
│   │   │   └── [slug]/page.tsx ← 文章详情页
│   │   └── tags/
│   │       ├── page.tsx      ← 标签列表页
│   │       └── [tag]/page.tsx  ← 按标签筛选页
│   ├── components/           ← 可复用组件
│   │   ├── Header.tsx        ← 顶部导航栏
│   │   ├── Footer.tsx        ← 底部栏
│   │   ├── ThemeProvider.tsx ← 主题切换（亮色/暗色）
│   │   └── Typewriter.tsx    ← 打字机动画效果
│   └── lib/
│       └── posts.ts          ← 文章读取和解析的核心逻辑
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## 核心机制

### 文章系统

```
content/posts/xxx.mdx → src/lib/posts.ts 读取解析 → 页面组件渲染
```

1. 文章以 `.mdx` 文件存放在 `content/posts/` 目录
2. `src/lib/posts.ts` 在构建时读取所有 MDX 文件：
   - 用 `gray-matter` 解析 frontmatter（文件头部 `---` 之间的元数据）
   - 用 `reading-time` 计算阅读时间
   - 按日期降序排列（最新的在前）
3. 文章内容通过 `next-mdx-remote` 渲染为 HTML
4. 代码块由 `rehype-pretty-code`（基于 Shiki）进行语法高亮

**文件名即 URL**：`hello-world.mdx` → `/posts/hello-world`

### 路由

所有页面采用 SSG（静态站点生成），构建时预渲染：

| 路由 | 对应文件 | 说明 |
|------|---------|------|
| `/` | `app/page.tsx` | 首页，展示最近 5 篇文章 |
| `/posts` | `app/posts/page.tsx` | 全部文章列表 |
| `/posts/[slug]` | `app/posts/[slug]/page.tsx` | 文章详情（动态路由） |
| `/tags` | `app/tags/page.tsx` | 全部标签 |
| `/tags/[tag]` | `app/tags/[tag]/page.tsx` | 按标签筛选文章 |
| `/about` | `app/about/page.tsx` | 关于页 |

### 主题系统

支持亮色/暗色切换，点击导航栏右侧按钮切换：

1. `globals.css` 定义两套 CSS 变量（`:root` 亮色、`.dark` 暗色）
2. `ThemeProvider.tsx` 管理主题状态，保存在浏览器 `localStorage`
3. 通过切换 `<html>` 标签的 `dark` class 来切换颜色
4. 页面使用 `bg-background`、`text-primary` 等 token，自动跟随主题

**颜色对照：**

| Token | 亮色 | 暗色 | 用途 |
|-------|------|------|------|
| `background` | #f5f5f5 浅灰 | #0a0a0a 纯黑 | 页面背景 |
| `foreground` | #1a1a1a 深灰 | #e0e0e0 浅灰 | 正文文字 |
| `primary` | #00cc33 绿 | #00ff41 亮绿 | 主色调 |
| `accent` | #0099cc 青 | #00d4ff 亮青 | 强调色 |
| `surface` | #e5e5e5 | #111111 | 代码块等背景 |
| `border` | #cccccc | #333333 | 边框 |
| `muted` | #666666 | #888888 | 次要文字 |

### 布局结构

```
┌──────────────────────────────────┐
│  Header（导航 + 主题切换按钮）    │
├──────────────────────────────────┤
│                                  │
│  页面内容（最大宽度 896px 居中）   │
│                                  │
├──────────────────────────────────┤
│  Footer                         │
└──────────────────────────────────┘
```

字体：Geist Mono（等宽字体，终端风格）

---

# 第二部分：使用指南

## 新增文章

1. 在 `content/posts/` 下新建 `.mdx` 文件
2. 文件名用英文和 `-`，如 `my-new-post.mdx`（文件名 = URL 路径）
3. 按以下格式填写：

```mdx
---
title: "文章标题"
date: "2026-02-17"
excerpt: "文章摘要，显示在列表页"
tags: ["标签1", "标签2"]
---

正文用 Markdown 语法书写...

## 小标题

普通段落，**加粗**，*斜体*，`行内代码`，[链接](https://example.com)

> 引用文字

- 列表项 1
- 列表项 2

代码块（指定语言会自动高亮）：

```javascript
console.log("hello");
```（结尾反引号）
```

**Frontmatter 字段：**

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `title` | 是 | 文章标题 | `"我的文章"` |
| `date` | 是 | 发布日期 | `"2026-02-17"` |
| `excerpt` | 是 | 摘要 | `"这是一段简介"` |
| `tags` | 是 | 标签数组 | `["前端", "React"]` |

阅读时间会自动计算，不需要手动填。

## 删除文章

删除 `content/posts/` 下对应的 `.mdx` 文件。

## 编辑文章

直接修改对应的 `.mdx` 文件内容。

## 修改网站标题和描述

编辑 `src/app/layout.tsx`：

```typescript
export const metadata: Metadata = {
  title: "Terminal Blog",                                    // ← 网站标题
  description: "A geek-style terminal blog built with Next.js",  // ← 网站描述
};
```

## 修改导航栏

编辑 `src/components/Header.tsx`：

```typescript
const navItems = [
  { href: "/", label: "cd /home" },
  { href: "/posts", label: "ls /posts" },
  { href: "/tags", label: "tags" },
  { href: "/about", label: "cat /about" },
];
```

改 `label` = 改显示文字，改 `href` = 改链接。

## 修改底部栏

编辑 `src/components/Footer.tsx`，直接改文字。

## 修改「关于」页面

编辑 `src/app/about/page.tsx`，需要替换的占位信息：

- GitHub 链接：搜索 `github.com/username`
- Email：搜索 `hello@example.com`
- Twitter：搜索 `twitter.com/username`

## 修改首页欢迎语

编辑 `src/app/page.tsx`，找到 `Typewriter` 修改 `text`：

```tsx
<Typewriter text="> Terminal Blog - 一个开发者的终端" speed={40} />
```

## 修改主题颜色

编辑 `src/app/globals.css`，修改颜色值即可全局生效：

```css
:root {          /* 亮色 */
  --primary: #00cc33;
  --background: #f5f5f5;
}
.dark {          /* 暗色 */
  --primary: #00ff41;
  --background: #0a0a0a;
}
```

## 替换网站图标

用新文件替换 `src/app/favicon.ico`。

## 在文章中插入图片

1. 把图片放到 `public/images/` 目录（如 `public/images/photo.png`）
2. 在 MDX 中引用：

```markdown
![描述文字](/images/photo.png)
```

## 本地开发

```bash
npm install    # 安装依赖（首次）
npm run dev    # 启动开发服务器 → http://localhost:3000
npm run build  # 构建生产版本
npm run start  # 本地预览生产版本
npm run lint   # 代码检查
```

开发服务器会自动监听变化，改完文件后页面自动刷新。

## 部署到 Vercel

1. 代码推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入仓库
3. Vercel 自动识别 Next.js 并部署
4. 之后每次 push 代码自动重新部署

## 常见问题

**Q: 文章排序规则？**
按 `date` 降序，最新的在最前面。

**Q: 标签需要手动维护吗？**
不需要，自动从所有文章的 `tags` 字段汇总生成。

**Q: 新增文章后要重新构建吗？**
开发模式（`npm run dev`）自动生效。生产环境需要重新构建，Vercel 部署则 push 代码后自动处理。
