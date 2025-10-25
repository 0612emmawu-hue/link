import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SentimentItem {
  name: string;
  score: number; // 0-100
  sentiment: "positive" | "neutral" | "negative";
}

interface MarketSentimentCompactProps {
  items: SentimentItem[];
  type: "industry" | "company";
}

export const MarketSentimentCompact = ({ items, type }: MarketSentimentCompactProps) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-3.5 h-3.5 text-bullish" />;
      case "negative":
        return <TrendingDown className="w-3.5 h-3.5 text-bearish" />;
      default:
        return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-bullish";
      case "negative":
        return "text-bearish";
      default:
        return "text-muted-foreground";
    }
  };

  const renderBar = (score: number, sentiment: string) => {
    const filled = Math.round(score / 20);
    const empty = 5 - filled;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(filled)].map((_, i) => (
          <div
            key={`filled-${i}`}
            className={`w-1.5 h-1.5 rounded-full ${
              sentiment === "positive"
                ? "bg-bullish"
                : sentiment === "negative"
                ? "bg-bearish"
                : "bg-muted-foreground"
            }`}
          />
        ))}
        {[...Array(empty)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-muted/30"
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
        <span className="w-0.5 h-4 bg-gradient-primary rounded-full"></span>
        Market Sentiment
      </h4>
      <div className="space-y-2.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-md bg-card/30 border border-border/20"
          >
            <div className="flex items-center gap-2.5 flex-1">
              <div className="flex items-center gap-1.5 min-w-[100px]">
                {getSentimentIcon(item.sentiment)}
                <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
              </div>
              {renderBar(item.score, item.sentiment)}
            </div>
            <span className={`text-xs font-semibold ${getSentimentColor(item.sentiment)} ml-2`}>
              {item.score}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
