import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface ChainNode {
  name: string;
  companies: string[];
}

interface IndustryChainCompactProps {
  upstream: ChainNode;
  midstream: ChainNode;
  downstream: ChainNode;
}

export const IndustryChainCompact = ({ upstream, midstream, downstream }: IndustryChainCompactProps) => {
  const ChainSection = ({ node, label }: { node: ChainNode; label: string }) => (
    <div className="space-y-2">
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
        {label}
      </Badge>
      <div className="space-y-1">
        <p className="text-xs font-semibold text-foreground">{node.name}</p>
        <div className="flex flex-wrap gap-1">
          {node.companies.slice(0, 3).map((company, idx) => (
            <Badge 
              key={idx}
              variant="secondary"
              className="bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer text-xs py-0"
            >
              {company}
            </Badge>
          ))}
          {node.companies.length > 3 && (
            <Badge variant="secondary" className="text-xs py-0">
              +{node.companies.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 shadow-card">
      <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-0.5 h-4 bg-gradient-primary rounded-full"></span>
        产业链分析
      </h3>
      <div className="space-y-3">
        <ChainSection node={upstream} label="上游" />
        <div className="flex justify-center">
          <ChevronRight className="w-4 h-4 text-primary rotate-90" />
        </div>
        <ChainSection node={midstream} label="中游" />
        <div className="flex justify-center">
          <ChevronRight className="w-4 h-4 text-primary rotate-90" />
        </div>
        <ChainSection node={downstream} label="下游" />
      </div>
    </Card>
  );
};
