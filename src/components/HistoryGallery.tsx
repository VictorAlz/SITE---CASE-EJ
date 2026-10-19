import codigoAsset from "@/assets/historia-codigo.jpg.asset.json";
import certificadoAsset from "@/assets/historia-certificado.jpg.asset.json";
import equipeEventoAsset from "@/assets/historia-equipe-evento.jpg.asset.json";
import timeReunidoAsset from "@/assets/historia-time-reunido.jpg.asset.json";
import oficinaAsset from "@/assets/historia-oficina.jpg.asset.json";
import videoAsset from "@/assets/historia-video.mp4.asset.json";

type Item = {
  src: string;
  ratio: number;
  alt?: string;
  label?: string;
  isVideo?: boolean;
};

const video: Item = { src: videoAsset.url, ratio: 1280 / 2276, isVideo: true, label: "Bastidores" };
const codigo: Item = { src: codigoAsset.url, ratio: 1080 / 1920, alt: "Membros da CASE desenvolvendo em evento", label: "Dev · Evento" };
const certificado: Item = { src: certificadoAsset.url, ratio: 1194 / 802, alt: "Time da CASE com certificado de reconhecimento", label: "Reconhecimento" };
const equipeEvento: Item = { src: equipeEventoAsset.url, ratio: 1600 / 1064, alt: "Membros da CASE em evento", label: "Equipe · Evento" };
const oficina: Item = { src: oficinaAsset.url, ratio: 1174 / 766, alt: "Oficina com participantes em evento", label: "Oficina" };
const timeReunido: Item = { src: timeReunidoAsset.url, ratio: 1280 / 720, alt: "Time reunido na sede da CASE", label: "Sede · Reunião" };

const sum = (items: Item[]) => items.reduce((acc, item) => acc + item.ratio, 0);

const Caption = ({ label, persistent }: { label?: string; persistent?: boolean }) => (
  <div
    className={`absolute bottom-0 left-0 z-10 px-3 py-1.5 md:px-4 md:py-2 bg-background/90 backdrop-blur-sm transition-opacity duration-500 ${
      persistent ? "opacity-100" : "opacity-0 group-hover:opacity-100"
    }`}
  >
    <span className="font-mono text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.25em] uppercase text-highlight whitespace-nowrap">
      {label}
    </span>
  </div>
);

const MediaRow = ({ items }: { items: Item[] }) => (
  <div className="flex gap-px bg-border" style={{ aspectRatio: `${sum(items)} / 1` }}>
    {items.map((item, index) => (
      <div
        key={index}
        className="group relative min-w-0 overflow-hidden bg-background"
        style={{ flexGrow: item.ratio, flexBasis: 0 }}
      >
        {item.isVideo ? (
          <>
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <Caption label={item.label} persistent />
          </>
        ) : (
          <>
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/20" />
            <Caption label={item.label} />
          </>
        )}
      </div>
    ))}
  </div>
);

const HistoryGallery = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container-custom">
      {/* Cabeçalho editorial da galeria */}
      <div className="mb-12 md:mb-16 animate-fade-in">
        <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-highlight flex items-center gap-3 mb-6">
          <span className="inline-block h-px w-8 bg-highlight/60" />
          Galeria
        </div>
        <h2 className="font-serif uppercase text-foreground leading-[0.95] tracking-tight text-4xl md:text-6xl lg:text-7xl font-normal mb-6">
          Bastidores<br />
          em <em className="not-italic text-highlight">registro</em>.
        </h2>
        <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed tracking-wide">
          Momentos reais da nossa trajetória: eventos, oficinas, reuniões e
          conquistas — o dia a dia que constrói a CASE.
        </p>
      </div>

      {/* Celular: três fileiras de duas peças, cada uma na proporção original da foto */}
      <div className="md:hidden grid gap-px bg-border border border-border">
        <MediaRow items={[video, codigo]} />
        <MediaRow items={[certificado, equipeEvento]} />
        <MediaRow items={[oficina, timeReunido]} />
      </div>

      {/* Desktop: duas fileiras justificadas, sem corte em nenhuma imagem */}
      <div className="hidden md:grid gap-px bg-border border border-border">
        <MediaRow items={[video, certificado, equipeEvento]} />
        <MediaRow items={[codigo, oficina, timeReunido]} />
      </div>
    </div>
  </section>
);

export default HistoryGallery;
