import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StockCardProps {
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
}

export const StockCard = ({ symbol, company, price, change, changePercent, volume }: StockCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {symbol}
            </h3>
            <p className="text-xs text-muted-foreground truncate max-w-[120px]">
              {company}
            </p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
            isPositive ? 'bg-bullish/10 text-bullish' : 'bg-bearish/10 text-bearish'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-xs font-semibold">
              {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ${price.toFixed(2)}
            </span>
            <span className={`text-sm font-medium ${
              isPositive ? 'text-bullish' : 'text-bearish'
            }`}>
              {change > 0 ? '+' : ''}{change.toFixed(2)}
            </span>
          </div>
          {volume && (
            <p className="text-xs text-muted-foreground">
              Vol: {volume}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
