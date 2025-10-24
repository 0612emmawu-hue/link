import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Languages, Loader2, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface AISummaryProps {
  newsTitle: string;
  newsContent: string;
  sourceName?: string;
  publishTime?: string;
}

export const AISummary = ({ newsTitle, newsContent, sourceName = "News Source", publishTime = "2 hours ago" }: AISummaryProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);

  const languages = [
    { value: "zh-CN", label: "简体中文" },
    { value: "zh-TW", label: "繁體中文" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
  ];

  // Auto-generate summary on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setShowTranslate(false);
    // TODO: Backend API call - summarization
    // API Input: current webpage content (newsTitle + newsContent)
    // API Output: text summary as bullet points
    setTimeout(() => {
      const summaries: Record<string, string> = {
        en: `• Federal Reserve maintains interest rates unchanged at latest monetary policy meeting\n• Decision aligns with market expectations\n• Post-meeting statement indicates easing inflationary pressures\n• Economic growth remains resilient\n• Tech stocks experience significant gains, especially AI and semiconductor sectors`,
        zh: `• 美联储在最新货币政策会议中维持基准利率不变\n• 决定符合市场预期\n• 会后声明显示通胀压力有所缓解\n• 经济增长保持韧性\n• 科技股大幅上涨，尤其是人工智能和半导体板块`,
        ja: `• 連邦準備制度が最新の金融政策会議で金利を据え置き\n• 決定は市場の予想と一致\n• 会議後の声明でインフレ圧力の緩和を示唆\n• 経済成長は回復力を維持\n• テクノロジー株が大幅上昇、特にAIと半導体セクター`,
        ko: `• 연방준비제도가 최신 통화정책 회의에서 금리 동결\n• 결정은 시장 예상과 일치\n• 회의 후 성명에서 인플레이션 압력 완화 시사\n• 경제 성장은 회복력 유지\n• 기술주가 크게 상승, 특히 AI와 반도체 부문`,
      };
      setSummary(summaries[selectedLanguage] || summaries.en);
      setIsLoading(false);
    }, 1500);
  };

  const handleTranslate = async () => {
    if (!summary) return;
    setIsTranslating(true);
    // TODO: Backend API call - translation
    // API Input: current summary text + target language
    // API Output: translated text
    setTimeout(() => {
      handleGenerate();
      setIsTranslating(false);
    }, 1000);
  };

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50 shadow-card">
      <div className="space-y-3">
        {/* News Title */}
        <div>
          <h2 className="text-base font-bold text-foreground leading-tight">
            {newsTitle}
          </h2>
        </div>

        {/* Source and Time */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-medium">{sourceName}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {publishTime}
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Generating summary...</span>
          </div>
        ) : (
          <>
            <div className="p-3 bg-muted/50 rounded-lg border border-border/50 min-h-[60px] max-h-none overflow-y-auto">
              <div className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                {summary}
              </div>
            </div>
            {!showTranslate ? (
              <Button 
                size="sm" 
                onClick={() => setShowTranslate(true)}
                variant="outline"
                className="h-8 w-full"
              >
                <Languages className="w-3 h-3 mr-1" />
                Translate
              </Button>
            ) : (
              <div className="flex gap-2">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value} className="text-xs">
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  size="sm" 
                  onClick={handleTranslate}
                  disabled={isTranslating}
                  className="h-8 flex-1 bg-gradient-primary hover:opacity-90"
                >
                  {isTranslating ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Languages className="w-3 h-3 mr-1" />
                      Apply Translation
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};
