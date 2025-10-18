import { TrendingUp, TrendingDown, Newspaper, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsAnalysisProps {
  title: string;
  source: string;
  url: string;
  summary: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
}

export const NewsAnalysis = ({ title, source, url, summary, timestamp, sentiment }: NewsAnalysisProps) => {
  const getSentimentColor = () => {
    switch (sentiment) {
      case "positive":
        return "bg-bullish/10 text-bullish border-bullish/20";
      case "negative":
        return "bg-bearish/10 text-bearish border-bearish/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getSentimentIcon = () => {
    if (sentiment === "positive") return <TrendingUp className="w-3 h-3" />;
    if (sentiment === "negative") return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-gradient-primary">
          <Newspaper className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
              >
                {title}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-muted-foreground">{source}</span>
                <span className="text-xs text-muted-foreground">{timestamp}</span>
                <Badge className={`${getSentimentColor()} flex items-center gap-1`}>
                  {getSentimentIcon()}
                  {sentiment}
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summary}
          </p>
        </div>
      </div>
    </Card>
  );
};
