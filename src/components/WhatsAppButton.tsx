import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  const { pathname } = useLocation();
  const hiddenRoutes = ["/membro", "/admin/dashboard", "/admin/login", "/login", "/convite", "/contratos", "/contrato"];
  if (hiddenRoutes.some((r) => pathname.startsWith(r))) return null;

  const phone = "5522999443332";
  const message = encodeURIComponent("Olá! Vim pelo site e desejo saber mais sobre a CASE EJ.");

  return (
    <Button
      asChild
      variant="outline"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 h-16 rounded-full border-border bg-background p-2 text-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-background hover:shadow-xl motion-reduce:transform-none sm:bottom-6 sm:right-6 sm:pr-5"
    >
      <a
        href={`https://api.whatsapp.com/send?phone=${phone}&text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        title="Falar com a CASE pelo WhatsApp"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground [&_svg]:size-6">
          <MessageCircle aria-hidden="true" strokeWidth={1.8} />
        </span>
        <span className="hidden flex-col items-start gap-1 pl-2 sm:flex">
          <span className="font-sans text-sm font-semibold">Vamos conversar</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">WhatsApp · CASE EJ</span>
        </span>
        <ArrowUpRight aria-hidden="true" className="ml-3 hidden text-muted-foreground sm:block" />
      </a>
    </Button>
  );
};

export default WhatsAppButton;