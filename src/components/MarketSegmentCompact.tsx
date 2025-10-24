import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MarketSegmentCompactProps {
  segments: { name: string; percentage: number; color: string }[];
}

export const MarketSegmentCompact = ({ segments }: MarketSegmentCompactProps) => {
  const total = segments.reduce((sum, seg) => sum + seg.percentage, 0);

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50 shadow-card">
      <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-0.5 h-4 bg-gradient-primary rounded-full"></span>
        Market Segment Statistics
      </h3>

      <div className="space-y-3">
        {segments.map((segment, index) => {
          const percentage = (segment.percentage / total) * 100;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-xs font-medium text-foreground truncate">
                    {segment.name}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {segment.percentage}%
                </Badge>
              </div>
              
              {/* Horizontal Bar */}
              <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: segment.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};