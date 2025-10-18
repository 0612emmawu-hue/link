import { NewsAnalysis } from "@/components/NewsAnalysis";
import { StockCard } from "@/components/StockCard";
import { IndustryChain } from "@/components/IndustryChain";
import { AnalystOpinion } from "@/components/AnalystOpinion";
import { PriceChart } from "@/components/PriceChart";
import { Sparkles, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const Index = () => {
  const [note, setNote] = useState("");

  // Mock data
  const mockNews = {
    title: "美联储宣布维持利率不变，科技股全线上涨",
    source: "Bloomberg",
    url: "https://bloomberg.com",
    summary: "美联储在最新的货币政策会议中决定维持基准利率不变，符合市场预期。会后声明显示通胀压力有所缓解，经济增长保持韧性。此消息推动科技股大幅上涨，特别是人工智能和半导体相关板块表现突出。",
    timestamp: "2小时前",
    sentiment: "positive" as const,
  };

  const mockStocks = [
    { symbol: "NVDA", company: "英伟达", price: 875.32, change: 23.45, changePercent: 2.75, volume: "45.2M" },
    { symbol: "MSFT", company: "微软", price: 412.67, change: 8.92, changePercent: 2.21, volume: "28.7M" },
    { symbol: "AMD", company: "AMD", price: 189.45, change: 5.23, changePercent: 2.84, volume: "52.1M" },
    { symbol: "TSM", company: "台积电", price: 145.78, change: 3.12, changePercent: 2.19, volume: "15.6M" },
  ];

  const mockIndustryChain = {
    upstream: {
      name: "半导体材料与设备",
      companies: ["ASML", "Applied Materials", "Lam Research", "KLA Corp"],
    },
    midstream: {
      name: "芯片设计与制造",
      companies: ["NVDA", "AMD", "Intel", "TSM", "Qualcomm"],
    },
    downstream: {
      name: "AI应用与服务",
      companies: ["MSFT", "GOOGL", "META", "AMZN", "ORCL"],
    },
  };

  const mockChartData = [
    { time: "9:30", price: 851.87 },
    { time: "10:00", price: 855.23 },
    { time: "10:30", price: 848.91 },
    { time: "11:00", price: 862.45 },
    { time: "11:30", price: 858.76 },
    { time: "12:00", price: 865.12 },
    { time: "12:30", price: 869.34 },
    { time: "13:00", price: 871.89 },
    { time: "13:30", price: 868.56 },
    { time: "14:00", price: 875.32 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">财经新闻智能分析</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Financial News Analysis</p>
              </div>
            </div>
            <Button variant="outline" className="border-border/50 hover:border-primary/50 hover:bg-primary/10">
              <StickyNote className="w-4 h-4 mr-2" />
              我的笔记
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-6">
        {/* News Analysis Section */}
        <section>
          <NewsAnalysis {...mockNews} />
        </section>

        {/* Related Stocks Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-primary rounded-full"></span>
            相关股票
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockStocks.map((stock) => (
              <StockCard key={stock.symbol} {...stock} />
            ))}
          </div>
        </section>

        {/* Price Chart */}
        <section>
          <PriceChart symbol="NVDA" data={mockChartData} />
        </section>

        {/* Industry Chain */}
        <section>
          <IndustryChain {...mockIndustryChain} />
        </section>

        {/* Analyst Opinion */}
        <section>
          <AnalystOpinion buy={18} hold={5} sell={2} />
        </section>

        {/* Notes Section */}
        <section>
          <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 shadow-card">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
              我的交易笔记
            </h3>
            <Textarea
              placeholder="记录您对这条新闻的思考和交易策略..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50 resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-muted-foreground">
                笔记仅保存在本地，不会上传到云端
              </p>
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                保存笔记
              </Button>
            </div>
          </Card>
        </section>

        {/* Disclaimer */}
        <section className="mt-8">
          <Card className="p-4 bg-warning/5 border-warning/20">
            <p className="text-xs text-muted-foreground text-center">
              ⚠️ 本插件仅提供信息展示，不构成任何投资建议。投资有风险，决策需谨慎。
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
