import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PriceChartCompact } from "./PriceChartCompact";
import { useState } from "react";

interface StockCardCompactProps {
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
  sector?: string;
  chartData?: { time: string; price: number }[];
  onClick?: () => void;
}

export const StockCardCompact = ({ symbol, company, price, change, changePercent, sector, chartData, onClick }: StockCardCompactProps) => {
  const isPositive = change >= 0;
  const [showChart, setShowChart] = useState(false);

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      // Default: open Yahoo Finance page for the stock
      window.open(`https://finance.yahoo.com/quote/${symbol}`, '_blank');
    }
  };

  const handleSectorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (chartData) {
      setShowChart(!showChart);
    }
  };

  return (
    <Card className="p-3 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-300 [box-shadow:var(--shadow-neumorphic-sm)] hover:[box-shadow:var(--shadow-glow)]">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0 flex-1">
            <h3 
              onClick={handleTitleClick}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors truncate cursor-pointer"
            >
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

        {sector && (
          <div 
            onClick={handleSectorClick}
            className={`flex items-center justify-between text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium ${
              chartData ? 'cursor-pointer hover:bg-primary/20' : ''
            } transition-colors`}
          >
            <span>{sector}</span>
            {chartData && (
              showChart ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
            )}
          </div>
        )}

        {showChart && chartData && (
          <div className="animate-slide-in-top">
            <PriceChartCompact symbol={symbol} data={chartData} />
          </div>
        )}
      </div>
    </Card>
  );
};
