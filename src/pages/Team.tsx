import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrgChart from "@/components/OrgChart";
import { AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { TeamMember } from "@/lib/team-types";

interface PSSettings {
  active: boolean;
  form_url: string;
  description: string;
}

const Team = () => {
  const [psSettings, setPsSettings] = useState<PSSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);

  useEffect(() => {
    fetchPSSettings();
    fetchTeamMembers();
  }, []);

  const fetchPSSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "processo_seletivo")
        .single();

      if (error) throw error;
      if (data?.value) {
        setPsSettings(data.value as unknown as PSSettings);
      }
    } catch (error) {
      console.error("Error fetching PS settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setTeamLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
              <span className="h-px w-12 bg-primary-foreground/40" />
              <span>Quem faz acontecer</span>
              <span className="h-px w-12 bg-primary-foreground/40" />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-normal text-primary-foreground leading-[1.05]">
              Nosso <em className="italic text-highlight">Time</em>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Conheça os profissionais excepcionais que tornam possível a transformação dos nossos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Organograma — Presidência no topo, diretores em linha horizontal */}
      <section className="pb-24 pt-4">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in mb-14">
            <h2 className="font-serif text-4xl md:text-5xl font-normal leading-[1.1]">
              Um time <em className="italic text-highlight">competente</em> e experiente
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
              É essa experiência reunida que coloca de pé a solução que o seu
              negócio precisa — do primeiro esboço ao resultado no ar.
            </p>
          </div>
          {teamLoading ? (
            <div className="flex justify-center">
              <div className="animate-pulse w-56 h-64 bg-muted rounded-lg"></div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <OrgChart members={teamMembers} />
            </div>
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-muted/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-10 bg-border" />
              <span>Faça parte</span>
              <span className="h-px w-10 bg-border" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal leading-[1.1]">
              Junte-se ao <em className="italic text-highlight">nosso time</em>
            </h2>

            {loading ? (
              <div className="animate-pulse h-20 bg-muted rounded-lg"></div>
            ) : psSettings?.active ? (
              <>
                <p className="text-lg text-muted-foreground">
                  {psSettings.description || "Estamos com processo seletivo aberto! Se você é apaixonado por tecnologia e transformação, queremos conhecê-lo."}
                </p>
                <Button
                  className="btn-highlight rounded-none px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open(psSettings.form_url, "_blank")}
                >
                  Ver Oportunidades
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <div className="bg-muted/50 border border-border rounded-xl p-6 inline-flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <AlertCircle className="h-6 w-6" />
                    <span className="text-lg font-medium">Processo Seletivo Fechado</span>
                  </div>
                  <p className="text-muted-foreground max-w-md">
                    {psSettings?.description || "Não há processo seletivo ativo no momento. Fique atento às nossas redes sociais para saber quando abriremos novas vagas!"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
