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

const HomePromise = () => (
  <section className="py-20 md:py-28 bg-background border-b border-border">
    <div className="container-custom">
      {/* Copy curta */}
      <div className="mb-12 md:mb-16 max-w-3xl animate-fade-in">
        <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-highlight flex items-center gap-3 mb-6">
          <span className="inline-block h-px w-8 bg-highlight/60" />
          CASE EJ · Trajetória
        </div>
        <h2 className="font-serif uppercase text-foreground leading-[0.95] tracking-tight text-4xl md:text-5xl lg:text-6xl font-normal mb-6">
          Mais de cinco<br />
          anos fazendo a ideia<br />
          <em className="not-italic text-highlight">acontecer</em>.
        </h2>
        <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed tracking-wide mb-8">
          A CASE nasce em Macaé, dentro da sala de aula, e entrega no mundo
          real: solução sob medida que o cliente usa todo dia e vê render.
          Conte onde quer chegar — a gente mostra o caminho e caminha junto.
        </p>

        <ContactDialog
          trigger={
            <Button
              size="lg"
              className="group rounded-none font-mono text-xs tracking-[0.2em] uppercase px-7 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Fale com a CASE
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          }
        />
      </div>

      {/* Duas fotos: célula com a proporção original de cada uma, sem corte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {shots.map((shot, index) => (
          <div
            key={shot.label}
            className="group relative overflow-hidden bg-background animate-fade-in"
            style={{ aspectRatio: `${shot.ratio} / 1`, animationDelay: `${index * 100}ms` }}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/20" />
            <div className="absolute bottom-0 left-0 z-10 px-3 py-1.5 md:px-4 md:py-2 bg-background/90 backdrop-blur-sm">
              <span className="font-mono text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.25em] uppercase text-highlight whitespace-nowrap">
                {shot.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomePromise;
