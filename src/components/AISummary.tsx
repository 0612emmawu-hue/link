import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Languages, Loader2 } from "lucide-react";
import { useState } from "react";

interface AISummaryProps {
  newsTitle: string;
  newsContent: string;
}

export const AISummary = ({ newsTitle, newsContent }: AISummaryProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

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

  const handleGenerate = async () => {
    setIsLoading(true);
    // TODO: Backend API call - summarization
    // API Input: current webpage content (newsTitle + newsContent)
    // API Output: text summary in selected language
    setTimeout(() => {
      const summaries: Record<string, string> = {
        en: `The Federal Reserve announced maintaining interest rates unchanged at its latest monetary policy meeting, in line with market expectations. The post-meeting statement shows easing inflationary pressures and resilient economic growth. This news drove significant gains in tech stocks, particularly in AI and semiconductor-related sectors.`,
        zh: `美联储在最新的货币政策会议中决定维持基准利率不变，符合市场预期。会后声明显示通胀压力有所缓解，经济增长保持韧性。此消息推动科技股大幅上涨，特别是人工智能和半导体相关板块表现突出。`,
        ja: `連邦準備制度は最新の金融政策会議で金利を据え置くことを発表し、市場の予想と一致しました。会議後の声明では、インフレ圧力の緩和と経済成長の回復力が示されています。`,
        ko: `연방준비제도는 최신 통화정책 회의에서 금리를 동결하기로 발표했으며, 이는 시장 예상과 일치합니다. 회의 후 성명은 인플레이션 압력 완화와 경제 성장의 회복력을 보여줍니다.`,
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
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Summary
          </h3>
        </div>

        {!summary ? (
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
              onClick={handleGenerate}
              disabled={isLoading}
              className="h-8 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 mr-1" />
                  Generate Summary
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            <div className="p-3 bg-muted/50 rounded-lg border border-border/50 min-h-[60px] max-h-[200px] overflow-y-auto">
              <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                {summary}
              </p>
            </div>
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
                variant="outline"
                className="h-8 flex-1"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Languages className="w-3 h-3 mr-1" />
                    Translate
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
