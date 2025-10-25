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
    label,
    colorClass
  }: {
    node: ChainNode;
    label: string;
    colorClass: string;
  }) => {
    return <>
        <div className="space-y-2">
          <Badge variant="outline" className={`${colorClass} text-xs`}>
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
        <ChainSection node={upstream} label="Upstream" colorClass="bg-blue-500/10 text-blue-500 border-blue-500/30" />
        <ChainSection node={midstream} label="Midstream" colorClass="bg-purple-500/10 text-purple-500 border-purple-500/30" />
        <ChainSection node={downstream} label="Downstream" colorClass="bg-green-500/10 text-green-500 border-green-500/30" />
      </div>
    </Card>;
};