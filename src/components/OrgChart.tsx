import { Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@/lib/team-types";

interface OrgChartProps {
  members: TeamMember[];
}

const MemberNode = ({
  member,
  featured = false,
}: {
  member: TeamMember;
  featured?: boolean;
}) => (
  <Card
    className={`bg-card border-border overflow-hidden text-center transition-all duration-300 card-hover ${
      featured ? "w-48 md:w-56 border-highlight/60" : "w-40 md:w-44"
    }`}
  >
    <CardContent className="p-4 md:p-5 space-y-2">
      <div
        className={`relative mx-auto rounded-full overflow-hidden ring-2 ring-highlight/40 ${
          featured ? "w-24 h-24 md:w-28 md:h-28" : "w-20 h-20 md:w-24 md:h-24"
        }`}
      >
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
        )}
      </div>
      <div>
        <h3
          className={`font-serif font-normal leading-tight ${
            featured ? "text-lg md:text-xl" : "text-base md:text-lg"
          }`}
        >
          {member.name}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-highlight mt-1 leading-snug">
          {member.role}
        </p>
      </div>
    </CardContent>
  </Card>
);

/**
 * Organograma: Diretor Presidente no topo; abaixo dele, os demais diretores
 * em linha horizontal — a estrutura é horizontal sob a presidência.
 */
const OrgChart = ({ members }: OrgChartProps) => {
  const president =
    members.find((m) => /presidente/i.test(m.role)) || members[0];
  const directors = members.filter((m) => m.id !== president?.id);

  if (!president) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Presidência */}
      <MemberNode member={president} featured />

      {/* Conector vertical presidência -> linha horizontal */}
      <div className="w-px h-8 md:h-10 bg-border" aria-hidden="true" />

      {/* Linha horizontal dos diretores */}
      <div className="relative w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 justify-items-center">
        {/* Trilho horizontal (apenas desktop) — liga primeiro ao último diretor */}
        <div
          className="hidden md:block absolute top-0 left-[12.5%] right-[12.5%] h-px bg-border"
          aria-hidden="true"
        />
        {directors.map((member) => (
          <div key={member.id} className="flex flex-col items-center">
            <div className="w-px h-8 md:h-10 bg-border" aria-hidden="true" />
            <MemberNode member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgChart;
