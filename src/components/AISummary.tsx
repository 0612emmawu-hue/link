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
  const [selectedLanguage, setSelectedLanguage] = useState("zh-CN");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    // Simulate API call - in real implementation, this would call Lovable AI
    setTimeout(() => {
      const mockSummaries: Record<string, string> = {
        "zh-CN": "美联储维持利率不变，表明通胀压力缓解。这对科技股是重大利好，特别是AI和半导体板块。英伟达等龙头企业受益于持续的数据中心需求，而宽松的货币政策预期进一步提振了市场情绪。投资者应关注相关产业链上下游公司的机会。",
        "zh-TW": "聯準會維持利率不變，顯示通膨壓力緩解。這對科技股是重大利多，特別是AI和半導體板塊。輝達等龍頭企業受惠於持續的數據中心需求，而寬鬆的貨幣政策預期進一步提振了市場情緒。投資人應關注相關產業鏈上下游公司的機會。",
        "en": "The Fed maintains interest rates, signaling easing inflation pressure. This is majorly bullish for tech stocks, especially AI and semiconductor sectors. Leading companies like NVIDIA benefit from sustained data center demand, while expectations of accommodative monetary policy further boost market sentiment. Investors should watch for opportunities across the supply chain.",
        "ja": "FRBが金利を据え置き、インフレ圧力の緩和を示唆。これはテクノロジー株、特にAIと半導体セクターに大きな強気材料です。エヌビディアなどの主要企業は、継続的なデータセンター需要の恩恵を受けており、緩和的な金融政策への期待が市場センチメントをさらに高めています。投資家はサプライチェーン全体の機会に注目すべきです。",
        "ko": "연준이 금리를 동결하여 인플레이션 압력 완화를 시사합니다. 이는 기술주, 특히 AI와 반도체 섹터에 매우 긍정적입니다. 엔비디아와 같은 선도 기업들은 지속적인 데이터센터 수요로 혜택을 받고 있으며, 완화적인 통화 정책 기대감이 시장 심리를 더욱 고양시키고 있습니다. 투자자들은 공급망 전반의 기회에 주목해야 합니다.",
        "es": "La Fed mantiene las tasas de interés, señalando una reducción de la presión inflacionaria. Esto es muy positivo para las acciones tecnológicas, especialmente los sectores de IA y semiconductores. Empresas líderes como NVIDIA se benefician de la demanda sostenida de centros de datos, mientras que las expectativas de una política monetaria acomodaticia impulsan aún más el sentimiento del mercado.",
        "fr": "La Fed maintient les taux d'intérêt, signalant un assouplissement de la pression inflationniste. C'est très positif pour les actions technologiques, en particulier les secteurs de l'IA et des semi-conducteurs. Des entreprises leaders comme NVIDIA bénéficient de la demande soutenue en centres de données, tandis que les attentes d'une politique monétaire accommodante stimulent davantage le sentiment du marché.",
        "de": "Die Fed hält die Zinssätze bei, was auf einen nachlassenden Inflationsdruck hindeutet. Dies ist sehr positiv für Technologieaktien, insbesondere die KI- und Halbleitersektoren. Führende Unternehmen wie NVIDIA profitieren von der anhaltenden Nachfrage nach Rechenzentren, während Erwartungen einer akkommodierenden Geldpolitik die Marktstimmung weiter ankurbeln.",
      };
      setSummary(mockSummaries[selectedLanguage] || mockSummaries["zh-CN"]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/5 backdrop-blur-xl border-primary/30 shadow-glow">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-primary">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            AI 智能解读
          </h3>
          <Languages className="w-4 h-4 text-primary" />
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[140px] h-8 text-xs bg-background/50 border-border/50">
              <SelectValue placeholder="选择语言" />
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
            className="h-8 bg-gradient-primary hover:opacity-90 transition-opacity text-xs"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 mr-1" />
                生成解读
              </>
            )}
          </Button>
        </div>

        {summary && (
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <p className="text-xs text-foreground leading-relaxed">
              {summary}
            </p>
          </div>
        )}

        {!summary && !isLoading && (
          <div className="p-3 rounded-lg bg-background/30 border border-dashed border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              点击"生成解读"获取AI智能分析
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
