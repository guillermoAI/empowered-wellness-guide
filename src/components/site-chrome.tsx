import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-serif text-lg tracking-tight">NOMBRE STUDIO</Link>
        <Link to="/" hash="sobre-mi" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          Sobre mí
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12 text-center text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 sm:flex-row sm:justify-between">
        <span>© 2026 NOMBRE STUDIO</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Política de privacidad</a>
          <a href="#" className="hover:text-foreground">Términos</a>
        </div>
      </div>
    </footer>
  );
}
