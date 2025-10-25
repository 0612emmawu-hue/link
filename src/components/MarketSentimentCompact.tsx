import { Card } from "@/components/ui/card";

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
        return "from-[#5562FF] to-[#6E77FF]";
      case "negative":
        return "from-[#FF5E5E] to-[#FF5E5E]";
      default:
        return "from-[#9BA3AF] to-[#9BA3AF]";
    }
  };

  const getSentimentTextColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-[#6E77FF]";
      case "negative":
        return "text-[#FF5E5E]";
      default:
        return "text-[#9BA3AF]";
    }
  };

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
        <span className="w-0.5 h-4 bg-gradient-primary rounded-full"></span>
        Market Sentiment
      </h4>
      <div className="space-y-2.5">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">{item.name}</span>
              <span className={`text-[10px] font-semibold ${getSentimentTextColor(item.sentiment)}`}>
                {getSentimentLabel(item.sentiment)} {item.score}%
              </span>
            </div>
            <div className="relative h-[12px] bg-muted/20 rounded-full overflow-hidden">
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
