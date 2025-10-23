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
    const x = i / (data.length - 1) * width;
    const y = height - (d.price - minPrice) / priceRange * height;
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(' L ')}`;
  const isPositive = data[data.length - 1].price > data[0].price;
  return;
};