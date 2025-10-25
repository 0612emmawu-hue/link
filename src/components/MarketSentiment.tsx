import { Card } from "@/components/ui/card";

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

  const getSentimentBarColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "from-bullish to-bullish";
      case "negative":
        return "from-bearish to-bearish";
      default:
        return "from-warning to-warning";
    }
  };

  const getSentimentTextColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-bullish";
      case "negative":
        return "text-bearish";
      default:
        return "text-warning";
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 shadow-card">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
        Overall Market Sentiment
      </h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{item.name}</span>
              <span className={`text-sm font-semibold ${getSentimentTextColor(item.sentiment)}`}>
                {getSentimentLabel(item.sentiment)} {item.score}%
              </span>
            </div>
            <div className="relative h-3 bg-muted/20 rounded-full overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full bg-gradient-to-r ${getSentimentBarColor(
                  item.sentiment
                )} rounded-full transition-all duration-[400ms] ease-out`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
