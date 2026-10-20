import type { CSSProperties } from "react";
import timeReunidoAsset from "@/assets/historia-time-reunido.jpg.asset.json";
import certificadoAsset from "@/assets/historia-certificado.jpg.asset.json";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Shot = {
  src: string;
  ratio: number;
  alt: string;
  label: string;
};

const sede: Shot = {
  src: timeReunidoAsset.url,
  ratio: 1280 / 720,
  alt: "Time da CASE reunido na sede",
  label: "Sede · Reunião",
};

const reconhecimento: Shot = {
  src: certificadoAsset.url,
  ratio: 1194 / 802,
  alt: "Time da CASE com certificado de reconhecimento",
  label: "Reconhecimento",
};

const shots = [sede, reconhecimento];
const rowRatio = shots.reduce((acc, shot) => acc + shot.ratio, 0);

const ShotCell = ({ shot, style, delay }: { shot: Shot; style?: CSSProperties; delay?: number }) => (
  <div
    className="group relative min-w-0 overflow-hidden bg-background animate-fade-in"
    style={{ ...style, animationDelay: `${delay ?? 0}ms` }}
  >
    <img
      src={shot.src}
      alt={shot.alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/20" />
    <div className="absolute bottom-0 left-0 z-10 px-2.5 py-1.5 bg-background/90 backdrop-blur-sm">
      <span className="font-mono text-[8px] tracking-[0.14em] uppercase text-highlight whitespace-nowrap">
        {shot.label}
      </span>
    </div>
  </div>
);

const HomePromise = () => (
  <section className="py-12 md:py-16 bg-background border-b border-border">
    <div className="container-custom">
      {/* Copy curta */}
      <div className="mb-7 md:mb-8 max-w-xl animate-fade-in">
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-highlight flex items-center gap-3 mb-4">
          <span className="inline-block h-px w-6 bg-highlight/60" />
          CASE EJ · Trajetória
        </div>
        <h2 className="font-serif uppercase text-foreground leading-[1] tracking-tight text-2xl md:text-3xl font-normal mb-4">
          Mais de cinco anos<br />
          fazendo a ideia <em className="not-italic text-highlight">acontecer</em>.
        </h2>
        <p className="font-mono text-[11px] sm:text-xs text-muted-foreground max-w-md leading-relaxed tracking-wide mb-5">
          A CASE nasce em Macaé, dentro da sala de aula, e entrega no mundo
          real: solução sob medida que o cliente usa todo dia e vê render.
        </p>

        <ContactDialog
          trigger={
            <Button
              className="group rounded-none font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-3 h-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Fale com a CASE
              <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          }
        />
      </div>

      {/* Fileirinha com as duas fotos, cada uma na sua proporção, sem corte */}
      <div
        className="flex gap-px bg-border border border-border w-full max-w-xl"
        style={{ aspectRatio: `${rowRatio} / 1` }}
      >
        {shots.map((shot, index) => (
          <ShotCell
            key={shot.label}
            shot={shot}
            delay={index * 100}
            style={{ flexGrow: shot.ratio, flexBasis: 0 }}
          />
        ))}
      </div>
    </div>
  </section>
);

export default HomePromise;
