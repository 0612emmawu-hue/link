import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface PriceChartCompactProps {
  symbol: string;
  data: {
    time: string;
    price: number;
  }[];
}

export const PriceChartCompact = ({
  symbol,
  data
}: PriceChartCompactProps) => {
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
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50 shadow-card">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            {symbol} Price Chart
          </h3>
          <span className={`text-xs font-semibold ${isPositive ? 'text-bullish' : 'text-bearish'}`}>
            {isPositive ? '+' : ''}{((data[data.length - 1].price - data[0].price) / data[0].price * 100).toFixed(2)}%
          </span>
        </div>

        <div className="relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="currentColor" strokeWidth="0.5" className="text-border opacity-30" />
            
            {/* Price line */}
            <path
              d={pathD}
              fill="none"
              stroke={isPositive ? 'hsl(var(--bullish))' : 'hsl(var(--bearish))'}
              strokeWidth="2"
              className="transition-all duration-300"
            />

            {/* Area under the line */}
            <path
              d={`${pathD} L ${width},${height} L 0,${height} Z`}
              fill={isPositive ? 'hsl(var(--bullish))' : 'hsl(var(--bearish))'}
              className="opacity-10"
            />
          </svg>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{data[0].time}</span>
          <span>{data[data.length - 1].time}</span>
        </div>
      </div>
    </Card>
  );
};
