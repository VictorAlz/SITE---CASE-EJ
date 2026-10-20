import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface CaseCardProps {
  title: string;
  category: string;
  description: string;
  results: string;
  image?: string;
}

const CaseCard = ({ title, category, results }: CaseCardProps) => {
  return (
    <Card className="h-full rounded-lg border-border shadow-none transition-colors hover:border-highlight/50">
      <CardContent className="flex h-full flex-col p-6 md:p-8">
        <Badge variant="secondary" className="mb-5 w-fit rounded-sm font-mono text-[10px] uppercase text-secondary-foreground">
          {category}
        </Badge>
        <h3 className="mb-8 text-2xl font-normal leading-snug tracking-normal">
          {title}
        </h3>
        <div className="mt-auto border-t border-border pt-5">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase text-highlight">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            Resultado
          </div>
          <p className="text-lg font-medium leading-relaxed text-foreground">{results}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseCard;
