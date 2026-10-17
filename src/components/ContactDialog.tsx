import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpRight, Loader2, Mail } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().max(20, "Telefone muito longo").optional(),
  serviceType: z.string().min(1, "Selecione um tipo de serviço"),
  message: z.string().max(1000, "Mensagem muito longa").optional(),
});

interface ContactDialogProps {
  trigger: React.ReactNode;
}

const ContactDialog = ({ trigger }: ContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Erro de validação",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from("leads").insert({
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone || null,
        service_type: validation.data.serviceType,
        message: validation.data.message || null,
      });

      if (error) throw error;

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[calc(100%_-_2rem)] max-w-[560px] max-h-[calc(100dvh_-_2rem)] gap-0 overflow-y-auto rounded-lg border-border p-0 shadow-lg">
        <DialogHeader className="space-y-4 border-b border-border bg-muted/50 px-6 pb-6 pt-8 text-left sm:px-8 sm:pb-7 sm:pt-9">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-highlight">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contato · CASE EJ
          </div>
          <DialogTitle className="max-w-[380px] font-serif text-3xl font-normal leading-tight tracking-normal sm:text-4xl">
            Fale com um <span className="text-highlight">Especialista</span>
          </DialogTitle>
          <DialogDescription className="max-w-sm font-sans text-sm leading-relaxed">
            Conte-nos sobre seu projeto e entraremos em contato em breve.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8 sm:py-7">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Nome Completo *
            </Label>
            <Input
              id="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-12 rounded-md border-border bg-muted/30 px-3 font-sans text-base transition-colors focus:bg-background focus-visible:ring-highlight/40"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12 rounded-md border-border bg-muted/30 px-3 font-sans text-base transition-colors focus:bg-background focus-visible:ring-highlight/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 rounded-md border-border bg-muted/30 px-3 font-sans text-base transition-colors focus:bg-background focus-visible:ring-highlight/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType" className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Tipo de Serviço *
            </Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
              required
            >
              <SelectTrigger id="serviceType" className="h-12 rounded-md border-border bg-muted/30 px-3 font-sans text-base transition-colors focus:bg-background focus-visible:ring-highlight/40">
                <SelectValue placeholder="Selecione o tipo de serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="site">Site Institucional</SelectItem>
                <SelectItem value="landing-page">Landing Page</SelectItem>
                <SelectItem value="web-app">Web App</SelectItem>
                <SelectItem value="sistema">Sistema Personalizado</SelectItem>
                <SelectItem value="automacao-ia">Automação com IA</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Mensagem
            </Label>
            <Textarea
              id="message"
              placeholder="Conte-nos mais sobre seu projeto..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="min-h-[104px] resize-none rounded-md border-border bg-muted/30 p-3 font-sans text-base transition-colors focus:bg-background focus-visible:ring-highlight/40"
            />
          </div>

          <Button 
            type="submit" 
            className="btn-highlight h-12 w-full rounded-md font-mono text-xs uppercase tracking-widest"
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 className="animate-spin motion-reduce:animate-none" /> Enviando…</>
            ) : (
              <>Enviar Mensagem <ArrowUpRight aria-hidden="true" className="ml-auto" /></>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
