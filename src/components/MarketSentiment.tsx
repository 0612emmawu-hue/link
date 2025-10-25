import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SentimentItem {
  name: string;
  score: number; // 0-100
  sentiment: "positive" | "neutral" | "negative";
}

interface MarketSentimentProps {
  items: SentimentItem[];
  type: "industry" | "company";
}

export const MarketSentiment = ({ items, type }: MarketSentimentProps) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-bullish" />;
      case "negative":
        return <TrendingDown className="w-4 h-4 text-bearish" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
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

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-bullish/20";
      case "negative":
        return "bg-bearish/20";
      default:
        return "bg-muted/20";
    }
  };

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "Positive";
      case "negative":
        return "Negative";
      default:
        return "Neutral";
    }
  };

  const renderBar = (score: number, sentiment: string) => {
    const filled = Math.round(score / 20);
    const empty = 5 - filled;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(filled)].map((_, i) => (
          <div
            key={`filled-${i}`}
            className={`w-2 h-2 rounded-full ${
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
            className="w-2 h-2 rounded-full bg-muted/30"
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 shadow-card">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
        Overall Market Sentiment
      </h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/30 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2 min-w-[140px]">
                {getSentimentIcon(item.sentiment)}
                <span className="font-medium text-foreground">{item.name}</span>
              </div>
              {renderBar(item.score, item.sentiment)}
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className={`${getSentimentBg(item.sentiment)} ${getSentimentColor(
                  item.sentiment
                )} border-0`}
              >
                {getSentimentLabel(item.sentiment)} {item.score}%
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
