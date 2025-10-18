import { Card } from "@/components/ui/card";
import { TrendingUp, Minus, TrendingDown } from "lucide-react";

interface AnalystOpinionProps {
  buy: number;
  hold: number;
  sell: number;
}

export const AnalystOpinion = ({ buy, hold, sell }: AnalystOpinionProps) => {
  const total = buy + hold + sell;
  const buyPercent = (buy / total) * 100;
  const holdPercent = (hold / total) * 100;
  const sellPercent = (sell / total) * 100;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 shadow-card">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
        分析师观点分布
      </h3>
      
      <div className="space-y-4">
        {/* Visual Bar */}
        <div className="h-8 flex rounded-lg overflow-hidden shadow-elevation">
          <div 
            className="bg-gradient-success flex items-center justify-center transition-all duration-500"
            style={{ width: `${buyPercent}%` }}
          >
            {buyPercent > 10 && (
              <span className="text-xs font-semibold text-white">{buyPercent.toFixed(0)}%</span>
            )}
          </div>
          <div 
            className="bg-warning flex items-center justify-center transition-all duration-500"
            style={{ width: `${holdPercent}%` }}
          >
            {holdPercent > 10 && (
              <span className="text-xs font-semibold text-warning-foreground">{holdPercent.toFixed(0)}%</span>
            )}
          </div>
          <div 
            className="bg-gradient-danger flex items-center justify-center transition-all duration-500"
            style={{ width: `${sellPercent}%` }}
          >
            {sellPercent > 10 && (
              <span className="text-xs font-semibold text-white">{sellPercent.toFixed(0)}%</span>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-bullish/10">
              <TrendingUp className="w-4 h-4 text-bullish" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">买入</p>
              <p className="text-lg font-bold text-foreground">{buy}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <Minus className="w-4 h-4 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">持有</p>
              <p className="text-lg font-bold text-foreground">{hold}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-bearish/10">
              <TrendingDown className="w-4 h-4 text-bearish" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">卖出</p>
              <p className="text-lg font-bold text-foreground">{sell}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
