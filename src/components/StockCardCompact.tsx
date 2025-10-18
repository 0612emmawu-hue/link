import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StockCardCompactProps {
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
}

export const StockCardCompact = ({ symbol, company, price, change, changePercent }: StockCardCompactProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-3 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
              {symbol}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {company}
            </p>
          </div>
          <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${
            isPositive ? 'bg-bullish/10 text-bullish' : 'bg-bearish/10 text-bearish'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>
              {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-foreground">
            ${price.toFixed(2)}
          </span>
          <span className={`text-xs font-medium ${
            isPositive ? 'text-bullish' : 'text-bearish'
          }`}>
            {change > 0 ? '+' : ''}{change.toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
};
