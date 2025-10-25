import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

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
  const ChainSection = ({ node, label, showArrowBelow }: { node: ChainNode; label: string; showArrowBelow?: boolean }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedCompanies = isExpanded ? node.companies : node.companies.slice(0, 3);
    const hasMore = node.companies.length > 3;

    return (
      <>
        <div className="space-y-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
            {label}
          </Badge>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-foreground">{node.name}</p>
            <div className="flex flex-wrap gap-1 transition-all duration-250 ease-out">
              {displayedCompanies.map((company, idx) => (
                <Badge 
                  key={idx}
                  variant="secondary"
                  className="bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer text-xs py-0"
                >
                  {company}
                </Badge>
              ))}
              {hasMore && !isExpanded && (
                <Badge 
                  variant="secondary" 
                  className="text-xs py-0 text-muted-foreground"
                >
                  +{node.companies.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
        {showArrowBelow && (
          <div className="flex items-center gap-2 w-full py-2">
            <div className="flex-1 h-px bg-foreground" />
            {hasMore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="cursor-pointer hover:bg-muted/50 rounded-full p-1 transition-all duration-200"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                <ChevronRight 
                  className={`w-3.5 h-3.5 text-foreground transition-all duration-300 ${
                    isExpanded ? 'rotate-[-90deg]' : 'rotate-90'
                  }`}
                />
              </button>
            )}
            <div className="flex-1 h-px bg-foreground" />
          </div>
        )}
      </>
    );
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 shadow-card">
          <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-0.5 h-4 bg-gradient-primary rounded-full"></span>
            Industry Chain
          </h3>
      <div className="space-y-0">
        <ChainSection node={upstream} label="Upstream" showArrowBelow />
        <ChainSection node={midstream} label="Midstream" showArrowBelow />
        <ChainSection node={downstream} label="Downstream" showArrowBelow />
      </div>
    </Card>
  );
};
