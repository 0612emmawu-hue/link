import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ChainNode {
  name: string;
  companies: string[];
}

interface IndustryChainProps {
  upstream: ChainNode;
  midstream: ChainNode;
  downstream: ChainNode;
}

export const IndustryChain = ({ upstream, midstream, downstream }: IndustryChainProps) => {
  const ChainCard = ({ node, label }: { node: ChainNode; label: string }) => (
    <div className="flex-1 space-y-3">
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
        {label}
      </Badge>
      <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50 h-full">
        <h4 className="font-semibold text-foreground mb-3">{node.name}</h4>
        <div className="flex flex-wrap gap-2">
          {node.companies.map((company, idx) => (
            <Badge 
              key={idx}
              variant="secondary"
              className="bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              {company}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 shadow-card">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
        产业链分析
      </h3>
      <div className="flex items-center gap-4">
        <ChainCard node={upstream} label="上游" />
        <ArrowRight className="w-6 h-6 text-primary flex-shrink-0" />
        <ChainCard node={midstream} label="中游" />
        <ArrowRight className="w-6 h-6 text-primary flex-shrink-0" />
        <ChainCard node={downstream} label="下游" />
      </div>
    </Card>
  );
};
