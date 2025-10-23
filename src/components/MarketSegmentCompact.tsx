import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart } from "lucide-react";

interface MarketSegmentCompactProps {
  segments: { name: string; percentage: number; color: string }[];
}

export const MarketSegmentCompact = ({ segments }: MarketSegmentCompactProps) => {
  const total = segments.reduce((sum, seg) => sum + seg.percentage, 0);
  let accumulatedAngle = 0;

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50 shadow-card">
      <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-0.5 h-4 bg-gradient-primary rounded-full"></span>
        Market Segment Statistics
      </h3>

      <div className="flex items-center gap-4">
        {/* Pie Chart */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {segments.map((segment, index) => {
              const percentage = (segment.percentage / total) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = accumulatedAngle;
              accumulatedAngle += angle;

              // Calculate pie slice path
              const startX = 50 + 45 * Math.cos((Math.PI * startAngle) / 180);
              const startY = 50 + 45 * Math.sin((Math.PI * startAngle) / 180);
              const endX = 50 + 45 * Math.cos((Math.PI * (startAngle + angle)) / 180);
              const endY = 50 + 45 * Math.sin((Math.PI * (startAngle + angle)) / 180);
              const largeArc = angle > 180 ? 1 : 0;

              return (
                <path
                  key={index}
                  d={`M 50 50 L ${startX} ${startY} A 45 45 0 ${largeArc} 1 ${endX} ${endY} Z`}
                  fill={segment.color}
                  className="transition-all duration-300 hover:opacity-80"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <PieChart className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div 
                  className="w-2 h-2 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-xs text-muted-foreground truncate">
                  {segment.name}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                {segment.percentage}%
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};