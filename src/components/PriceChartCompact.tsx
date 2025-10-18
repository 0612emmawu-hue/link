import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface PriceChartCompactProps {
  symbol: string;
  data: { time: string; price: number }[];
}

export const PriceChartCompact = ({ symbol, data }: PriceChartCompactProps) => {
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice;

  // Calculate SVG path
  const width = 350;
  const height = 80;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.price - minPrice) / priceRange) * height;
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(' L ')}`;

  const isPositive = data[data.length - 1].price > data[0].price;

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50 shadow-card overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <span className="w-0.5 h-4 bg-gradient-primary rounded-full"></span>
          {symbol} 趋势
        </h3>
        <div className="flex items-center gap-1 text-xs font-semibold">
          <TrendingUp className={`w-3 h-3 ${isPositive ? 'text-bullish' : 'text-bearish rotate-180'}`} />
          <span className={isPositive ? 'text-bullish' : 'text-bearish'}>
            {isPositive ? '+' : ''}{((data[data.length - 1].price - data[0].price) / data[0].price * 100).toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="relative">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "hsl(142 76% 45%)" : "hsl(0 84% 60%)"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? "hsl(142 76% 45%)" : "hsl(0 84% 60%)"} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          <path
            d={`${pathD} L ${width},${height} L 0,${height} Z`}
            fill={`url(#gradient-${symbol})`}
          />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke={isPositive ? "hsl(142 76% 45%)" : "hsl(0 84% 60%)"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Time labels */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{data[0].time}</span>
          <span>{data[data.length - 1].time}</span>
        </div>
      </div>
    </Card>
  );
};
