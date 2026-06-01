import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-serif text-lg tracking-tight">FITVIKY</Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/" hash="sobre-mi" className="transition-colors hover:text-foreground">Sobre mí</Link>
          <Link to="/" hash="mis-chicas" className="transition-colors hover:text-foreground">Mis chicas</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12 text-center text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 sm:flex-row sm:justify-between">
        <span>© 2026 FITVIKY</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Política de privacidad</a>
          <a href="#" className="hover:text-foreground">Términos</a>
        </div>
      </div>
    </footer>
  );
}
