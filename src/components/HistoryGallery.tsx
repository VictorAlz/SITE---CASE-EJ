import codigoAsset from "@/assets/historia-codigo.jpg.asset.json";
import certificadoAsset from "@/assets/historia-certificado.jpg.asset.json";
import equipeEventoAsset from "@/assets/historia-equipe-evento.jpg.asset.json";
import timeReunidoAsset from "@/assets/historia-time-reunido.jpg.asset.json";
import oficinaAsset from "@/assets/historia-oficina.jpg.asset.json";
import videoAsset from "@/assets/historia-video.mp4.asset.json";

const HistoryGallery = () => {
  const photos = [
    { src: certificadoAsset.url, alt: "Time da CASE com certificado de reconhecimento" },
    { src: equipeEventoAsset.url, alt: "Membros da CASE em evento" },
    { src: codigoAsset.url, alt: "Membros da CASE desenvolvendo em evento" },
    { src: timeReunidoAsset.url, alt: "Time reunido na sede da CASE" },
    { src: oficinaAsset.url, alt: "Oficina com participantes em evento" },
  ];

  return (
    <section className="pb-24 md:pb-32 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
          <div className="relative col-span-2 md:row-span-2 overflow-hidden bg-background">
            <video
              src={videoAsset.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover aspect-[16/10] md:aspect-auto"
            />
            <div className="absolute bottom-0 left-0 bg-background/90 backdrop-blur-sm px-4 py-2">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-highlight">
                Bastidores · CASE EJ
              </span>
            </div>
          </div>

          {photos.map((media, index) => (
            <div key={index} className="relative overflow-hidden bg-background">
              <img
                src={media.src}
                alt={media.alt}
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryGallery;
