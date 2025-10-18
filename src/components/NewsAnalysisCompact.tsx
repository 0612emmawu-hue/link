import { TrendingUp, TrendingDown, Newspaper, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsAnalysisCompactProps {
  title: string;
  source: string;
  url: string;
  summary: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
}

export const NewsAnalysisCompact = ({ title, source, url, summary, timestamp, sentiment }: NewsAnalysisCompactProps) => {
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
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary flex-shrink-0">
            <Newspaper className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
            >
              <span className="line-clamp-2">{title}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">{source}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          <Badge className={`${getSentimentColor()} flex items-center gap-1 text-xs`}>
            {getSentimentIcon()}
            {sentiment}
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {summary}
        </p>
      </div>
    </Card>
  );
};
