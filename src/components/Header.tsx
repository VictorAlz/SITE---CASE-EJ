import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ContactDialog from "@/components/ContactDialog";
import logoAsset from "@/assets/case-logo-descritivo.png.asset.json";
const logo = logoAsset.url;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sobre Nós", path: "/sobre" },
    { name: "Cases", path: "/cases" },
    { name: "Soluções", path: "/solucoes" },
    { name: "Nosso Time", path: "/equipe" },
  ];

  const half = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, half);
  const rightLinks = navLinks.slice(half);

  const linkClass = (path: string) =>
    `font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
      isActive(path) ? "text-white" : "text-white/70 hover:text-white"
    }`;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-surface shadow-md transition-all duration-300">
      <nav className="container-custom">
        {/* Desktop: nav-left | logo center | nav-right */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-24 gap-8">
          <div className="flex items-center justify-start gap-8">
            {leftLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="flex items-center justify-center flex-shrink-0 -my-2"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src={logo}
              alt="CASE - Empresa Júnior"
              className="h-24 md:h-28 w-auto object-contain invert brightness-0 scale-150 origin-center"
            />
          </Link>

          <div className="flex items-center justify-end gap-8">
            {rightLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}
            <ContactDialog
              trigger={
                <Button className="btn-highlight rounded-full px-6 font-mono text-xs uppercase tracking-[0.18em]">
                  Contato
                </Button>
              }
            />
          </div>
        </div>

        {/* Mobile: logo center, menu button right */}
        <div className="lg:hidden flex items-center justify-between h-20">
          <div className="w-10" />
          <Link
            to="/"
            className="flex items-center flex-shrink-0 -my-2"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src={logo}
              alt="CASE - Empresa Júnior"
              className="h-20 w-auto object-contain invert brightness-0 scale-125 origin-center"
            />
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-brand-surface-foreground/20 text-brand-surface-foreground transition-colors hover:bg-brand-surface-foreground/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-brand-surface animate-fade-in">
            <div className="container-custom flex min-h-full flex-col justify-between py-8">
              <div className="mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-brand-surface-foreground/45">
                <span className="inline-block h-px w-8 bg-highlight/70" />
                Navegação · CASE EJ
              </div>

              <nav className="border-t border-brand-surface-foreground/10">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-baseline justify-between gap-4 border-b border-brand-surface-foreground/10 py-5 animate-fade-in"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <span
                      className={`font-serif text-3xl leading-none tracking-tight transition-colors ${
                        isActive(link.path)
                          ? "text-highlight"
                          : "text-brand-surface-foreground/85 group-hover:text-brand-surface-foreground"
                      }`}
                    >
                      {link.name}
                    </span>
                    <span
                      className={`font-mono text-[10px] tracking-[0.25em] transition-colors ${
                        isActive(link.path)
                          ? "text-highlight"
                          : "text-brand-surface-foreground/35 group-hover:text-brand-surface-foreground/60"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-12 space-y-5">
                <ContactDialog
                  trigger={
                    <Button className="btn-highlight h-14 w-full rounded-md font-mono text-xs uppercase tracking-[0.2em]">
                      Entre em Contato
                      <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4" />
                    </Button>
                  }
                />
                <a
                  href="https://api.whatsapp.com/send?phone=5522999443332&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20desejo%20saber%20mais%20sobre%20a%20CASE%20EJ."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-brand-surface-foreground/45 transition-colors hover:text-brand-surface-foreground"
                >
                  <span>WhatsApp</span>
                  <span>+55 22 99944-3332</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
