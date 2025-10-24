import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StockCardCompactProps {
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
  sector?: string;
  isSelected?: boolean;
  onCardClick?: () => void;
  onTitleClick?: () => void;
}

export const StockCardCompact = ({ 
  symbol, 
  company, 
  price, 
  change, 
  changePercent, 
  sector, 
  isSelected = false,
  onCardClick,
  onTitleClick 
}: StockCardCompactProps) => {
  const isPositive = change >= 0;

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTitleClick) {
      onTitleClick();
    } else {
      window.open(`https://finance.yahoo.com/quote/${symbol}`, '_blank');
    }
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  return (
    <Card 
      onClick={handleCardClick}
      className={`p-2 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer ${
        isSelected 
          ? '[box-shadow:var(--shadow-glow)] border-primary/80' 
          : '[box-shadow:var(--shadow-neumorphic-sm)] hover:[box-shadow:var(--shadow-glow)]'
      }`}
    >
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0 flex-1">
            <h3 
              onClick={handleTitleClick}
              className="text-xs font-bold text-foreground hover:text-primary transition-colors truncate cursor-pointer leading-tight"
            >
              {symbol}
            </h3>
            <p className="text-[10px] text-muted-foreground truncate leading-tight">
              {company}
            </p>
          </div>
          <div className={`flex items-center gap-0.5 px-1 py-0.5 rounded text-[10px] font-semibold flex-shrink-0 ${
            isPositive ? 'bg-bullish/10 text-bullish' : 'bg-bearish/10 text-bearish'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-2.5 h-2.5" />
            ) : (
              <TrendingDown className="w-2.5 h-2.5" />
            )}
            <span>
              {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="flex items-baseline justify-between">
          <span className="text-base font-bold text-foreground leading-tight">
            ${price.toFixed(2)}
          </span>
          <span className={`text-[10px] font-medium ${
            isPositive ? 'text-bullish' : 'text-bearish'
          }`}>
            {change > 0 ? '+' : ''}{change.toFixed(2)}
          </span>
        </div>

        {sector && (
          <div 
            className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium transition-colors"
          >
            <span>{sector}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
