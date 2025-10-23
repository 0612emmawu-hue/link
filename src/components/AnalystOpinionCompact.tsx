import { Card } from "@/components/ui/card";
import { TrendingUp, Minus, TrendingDown } from "lucide-react";

interface AnalystOpinionCompactProps {
  buy: number;
  hold: number;
  sell: number;
}

export const AnalystOpinionCompact = ({ buy, hold, sell }: AnalystOpinionCompactProps) => {
  const total = buy + hold + sell;
  const buyPercent = (buy / total) * 100;
  const holdPercent = (hold / total) * 100;
  const sellPercent = (sell / total) * 100;

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50 shadow-card">
      <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-0.5 h-4 bg-gradient-primary rounded-full"></span>
        Analyst Sentiment
      </h3>
      
      <div className="space-y-3">
        {/* Visual Bar */}
        <div className="h-6 flex rounded-lg overflow-hidden shadow-elevation">
          <div 
            className="bg-gradient-success flex items-center justify-center transition-all duration-500"
            style={{ width: `${buyPercent}%` }}
          >
            {buyPercent > 15 && (
              <span className="text-xs font-semibold text-white">{buyPercent.toFixed(0)}%</span>
            )}
          </div>
          <div 
            className="bg-warning flex items-center justify-center transition-all duration-500"
            style={{ width: `${holdPercent}%` }}
          >
            {holdPercent > 15 && (
              <span className="text-xs font-semibold text-warning-foreground">{holdPercent.toFixed(0)}%</span>
            )}
          </div>
          <div 
            className="bg-gradient-danger flex items-center justify-center transition-all duration-500"
            style={{ width: `${sellPercent}%` }}
          >
            {sellPercent > 15 && (
              <span className="text-xs font-semibold text-white">{sellPercent.toFixed(0)}%</span>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-1.5">
            <div className="p-1.5 rounded-md bg-bullish/10">
              <TrendingUp className="w-3 h-3 text-bullish" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Buy</p>
              <p className="text-sm font-bold text-foreground">{buy}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="p-1.5 rounded-md bg-warning/10">
              <Minus className="w-3 h-3 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hold</p>
              <p className="text-sm font-bold text-foreground">{hold}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="p-1.5 rounded-md bg-bearish/10">
              <TrendingDown className="w-3 h-3 text-bearish" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sell</p>
              <p className="text-sm font-bold text-foreground">{sell}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
