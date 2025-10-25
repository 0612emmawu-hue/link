import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface ChainNode {
  name: string;
  companies: string[];
}
interface IndustryChainCompactProps {
  upstream: ChainNode;
  midstream: ChainNode;
  downstream: ChainNode;
}
export const IndustryChainCompact = ({
  upstream,
  midstream,
  downstream
}: IndustryChainCompactProps) => {
  const ChainSection = ({
    node,
    label
  }: {
    node: ChainNode;
    label: string;
  }) => {
    return <>
        <div className="space-y-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
            {label}
          </Badge>
          <div className="space-y-1">
            <p className="text-foreground font-bold text-sm">{node.name}</p>
            <div className="flex flex-wrap gap-1 transition-all duration-250 ease-out">
              {node.companies.map((company, idx) => <Badge key={idx} variant="secondary" className="bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer text-xs py-0">
                  {company}
                </Badge>)}
            </div>
          </div>
        </div>
      </>;
  };
  return <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 shadow-card">
          
      <div className="space-y-3">
        <ChainSection node={upstream} label="Upstream" />
        <ChainSection node={midstream} label="Midstream" />
        <ChainSection node={downstream} label="Downstream" />
      </div>
    </Card>;
};