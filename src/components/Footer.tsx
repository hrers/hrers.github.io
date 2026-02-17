export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-4 text-sm text-muted">
        <span>$ echo &quot;Built with Next.js&quot; | powered-by</span>
        <span className="mx-2">&&</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
