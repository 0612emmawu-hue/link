import { StockCardCompact } from "@/components/StockCardCompact";
import { PriceChartCompact } from "@/components/PriceChartCompact";
import { IndustryChainCompact } from "@/components/IndustryChainCompact";
import { AnalystOpinionCompact } from "@/components/AnalystOpinionCompact";
import { AISummary } from "@/components/AISummary";
import { MarketSegmentCompact } from "@/components/MarketSegmentCompact";
import { MarketSentimentCompact } from "@/components/MarketSentimentCompact";
import { FloatingNotes } from "@/components/FloatingNotes";
import { NotesDashboard } from "@/components/NotesDashboard";
import { WatchlistDialog } from "@/components/WatchlistDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sparkles, BookOpen, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "sonner";
interface Note {
  id: string;
  content: string;
  timestamp: string;
  newsUrl: string;
  newsTitle: string;
}
const Index = () => {
  const [showFloatingNotes, setShowFloatingNotes] = useState(false);
  const [showNotesDashboard, setShowNotesDashboard] = useState(false);
  const [showWatchlistDialog, setShowWatchlistDialog] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>(["AMD", "TSM"]); // TODO: Load from local storage
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [marketSentiment, setMarketSentiment] = useState<{
    items: Array<{
      name: string;
      score: number;
      sentiment: "positive" | "neutral" | "negative";
    }>;
    type: "industry" | "company";
  } | null>(null);
  const [sentimentLoading, setSentimentLoading] = useState(true);

  // ========================================
  // 后端接入点 1: 新闻内容获取
  // ========================================
  // 功能说明: 通过 Chrome Extension API 获取当前页面的新闻内容
  // 实现方式: 使用 chrome.tabs API 读取当前标签页内容
  // 返回数据: { title, source, url, summary, timestamp, sentiment }
  // API 路径: /api/news/current-page
  const mockNews = {
    title: "Federal Reserve Maintains Interest Rates, Tech Stocks Surge",
    source: "Bloomberg",
    url: "https://bloomberg.com",
    summary: "The Federal Reserve decided to keep benchmark interest rates unchanged at its latest monetary policy meeting, in line with market expectations. The post-meeting statement indicates easing inflationary pressures and resilient economic growth.",
    timestamp: "2 hours ago",
    sentiment: "positive" as const
  };

  // ========================================
  // 后端接入点 2: 股票实时价格数据
  // ========================================
  // 功能说明: 获取股票的分时价格数据用于绘制价格走势图
  // 实现方式: 调用金融数据 API (例如: Alpha Vantage, Yahoo Finance, FMP)
  // 返回数据: [{ time: "HH:mm", price: number }]
  // API 路径: /api/stocks/intraday/:symbol
  const mockChartData = [{
    time: "9:30",
    price: 851.87
  }, {
    time: "10:00",
    price: 855.23
  }, {
    time: "10:30",
    price: 848.91
  }, {
    time: "11:00",
    price: 862.45
  }, {
    time: "11:30",
    price: 858.76
  }, {
    time: "12:00",
    price: 865.12
  }, {
    time: "12:30",
    price: 869.34
  }, {
    time: "13:00",
    price: 871.89
  }, {
    time: "13:30",
    price: 868.56
  }, {
    time: "14:00",
    price: 875.32
  }];

  // ========================================
  // 后端接入点 3: AI 自动识别股票
  // ========================================
  // 功能说明: 使用 AI 模型从新闻文本中自动识别相关股票
  // 实现方式:
  //   1. 将新闻文本发送到后端
  //   2. 使用 NER (命名实体识别) 或 LLM 提取公司名称和股票代码
  //   3. 通过金融 API 获取这些股票的实时价格和变化数据
  // 返回数据: [{ symbol, company, price, change, changePercent, sector, chartData }]
  // API 路径: /api/news/detect-stocks
  const autoDetectedStocks = [{
    symbol: "NVDA",
    company: "Nvidia",
    price: 875.32,
    change: 23.45,
    changePercent: 2.75,
    sector: "Technology",
    chartData: mockChartData
  }, {
    symbol: "MSFT",
    company: "Microsoft",
    price: 412.67,
    change: 8.92,
    changePercent: 2.21,
    sector: "Technology",
    chartData: mockChartData
  }];

  // ========================================
  // 后端接入点 4: 用户自选股列表
  // ========================================
  // 功能说明: 从本地存储或后端数据库加载用户添加的自选股
  // 实现方式:
  //   选项 1: 使用 localStorage 本地存储 (仅浏览器本地)
  //   选项 2: 使用 Supabase 数据库存储 (支持跨设备同步)
  // 存储结构: { userId: string, watchlist: string[] }
  // API 路径: /api/user/watchlist (如使用后端存储)
  const userSelectedStocks = [{
    symbol: "AMD",
    company: "AMD",
    price: 189.45,
    change: 5.23,
    changePercent: 2.84,
    sector: "Semiconductors",
    chartData: mockChartData
  }, {
    symbol: "TSM",
    company: "TSMC",
    price: 145.78,
    change: 3.12,
    changePercent: 2.19,
    sector: "Semiconductors",
    chartData: mockChartData
  }];

  // ========================================
  // 后端接入点 5: AI 产业链分析
  // ========================================
  // 功能说明: 基于新闻内容自动分析相关的产业链上中下游公司
  // 实现方式:
  //   1. 将新闻文本发送到后端
  //   2. 使用 LLM 识别新闻中提到的产业和公司
  //   3. 根据产业知识图谱自动生成上中下游分类
  // 返回数据: {
  //   upstream: { name, companies[] },
  //   midstream: { name, companies[] },
  //   downstream: { name, companies[] }
  // }
  // API 路径: /api/news/industry-chain
  const mockIndustryChain = {
    upstream: {
      name: "Semiconductor Materials & Equipment",
      companies: ["ASML", "Applied Materials", "Lam Research", "KLA Corp"]
    },
    midstream: {
      name: "Chip Design & Manufacturing",
      companies: ["NVDA", "AMD", "Intel", "TSM", "Qualcomm"]
    },
    downstream: {
      name: "AI Applications & Services",
      companies: ["MSFT", "GOOGL", "META", "AMZN", "ORCL"]
    }
  };

  // ========================================
  // 后端接入点 6: 市场板块分析 (已删除)
  // ========================================
  // 注: 此模块已根据用户要求删除
  const mockMarketSegments = [{
    name: "Technology",
    percentage: 45,
    color: "hsl(var(--primary))"
  }, {
    name: "Semiconductors",
    percentage: 30,
    color: "hsl(142 76% 45%)"
  }, {
    name: "AI & Cloud",
    percentage: 25,
    color: "hsl(221 83% 53%)"
  }];

  // ========================================
  // 后端接入点 7: 市场情绪分析
  // ========================================
  // 功能说明: 根据新闻内容分析市场对产业或公司的情绪倾向
  // 实现方式:
  //   1. 后端根据新闻文本判断是产业级还是公司级分析
  //   2. 产业级: 从新闻中提取产业关键词，调用分析师观点或新闻 API，
  //      使用 LLM 聚合情绪，输出情绪分数 (0-100)
  //   3. 公司级: 使用 NER 检测公司名称，分别分析每家公司的情绪
  // 返回数据: {
  //   type: "industry" | "company",
  //   items: [{ name, score, sentiment: "positive"|"neutral"|"negative" }]
  // }
  // API 路径: /api/news/market-sentiment
  // 加载市场情绪数据
  useEffect(() => {
    const fetchMarketSentiment = async () => {
      setSentimentLoading(true);
      try {
        // TODO: 替换为实际的 API 调用
        // const response = await fetch('/api/news/market-sentiment');
        // const data = await response.json();
        // setMarketSentiment(data);

        // 临时使用 Mock 数据模拟 API 响应
        // 随机返回产业级或公司级情绪分析以演示两种场景
        const mockResponse = Math.random() > 0.5 ? {
          items: [{
            name: "Semiconductor",
            score: 60,
            sentiment: "positive" as const
          }, {
            name: "EV Supply Chain",
            score: 20,
            sentiment: "neutral" as const
          }],
          type: "industry" as const
        } : {
          items: [{
            name: "NVIDIA",
            score: 75,
            sentiment: "positive" as const
          }, {
            name: "TSMC",
            score: 45,
            sentiment: "neutral" as const
          }, {
            name: "Intel",
            score: 25,
            sentiment: "negative" as const
          }],
          type: "company" as const
        };

        // 模拟 API 延迟
        setTimeout(() => {
          setMarketSentiment(mockResponse);
          setSentimentLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch market sentiment:", error);
        setSentimentLoading(false);
      }
    };
    fetchMarketSentiment();
  }, []);
  const handleSaveNote = (noteContent: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: noteContent,
      timestamp: new Date().toLocaleString(),
      newsUrl: mockNews.url,
      newsTitle: mockNews.title
    };
    setNotes([newNote, ...notes]);
    // ========================================
    // 后端接入点 8: 笔记数据持久化
    // ========================================
    // 功能说明: 保存用户的笔记到持久化存储
    // 实现方式:
    //   选项 1: localStorage.setItem('notes', JSON.stringify(notes))
    //   选项 2: 使用 Supabase 数据库存储 (支持跨设备同步)
    // TODO: 实现数据持久化
  };
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    // TODO: 更新持久化存储
  };
  const handleExportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], {
      type: "application/json"
    });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `notes-${Date.now()}.json`;
    link.click();
  };
  const handleAddToWatchlist = (symbol: string) => {
    if (watchlist.length >= 6) {
      toast.error("Watchlist limit reached", {
        description: "You can only track up to 6 stocks in your watchlist."
      });
      return;
    }
    setWatchlist([...watchlist, symbol]);
    toast.success("Stock added to watchlist");
    // ========================================
    // 后端接入点 9: 自选股列表持久化
    // ========================================
    // 功能说明: 保存用户的自选股列表
    // 实现方式: 同后端接入点 4
    // TODO: 保存到 localStorage 或后端数据库
  };
  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(s => s !== symbol));
    // TODO: 更新持久化存储
  };
  const handleStockClick = (symbol: string) => {
    if (selectedStock === symbol) {
      setSelectedStock(null);
    } else {
      setChartLoading(true);
      setSelectedStock(symbol);
      // 模拟加载图表数据
      // 实际应用中应调用: /api/stocks/intraday/:symbol
      setTimeout(() => {
        setChartLoading(false);
      }, 500);
    }
  };
  const getSelectedStockData = () => {
    const allStocks = [...autoDetectedStocks, ...userSelectedStocks];
    return allStocks.find(stock => stock.symbol === selectedStock);
  };
  const selectedStockData = getSelectedStockData();
  return <div className="w-[420px] h-[600px] bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border/50 bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-xl">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-foreground">Market Insight AI</h1>
                <p className="text-xs text-muted-foreground">News • Trends • Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10 relative" onClick={() => setShowNotesDashboard(true)} title="Notes Dashboard">
                <BookOpen className="w-4 h-4" />
                {notes.length > 0 && <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {notes.length}
                  </Badge>}
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10 relative" onClick={() => setShowWatchlistDialog(true)} title="Manage Watchlist">
                <Eye className="w-4 h-4" />
                {watchlist.length > 0 && <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {watchlist.length}
                  </Badge>}
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10" onClick={() => setShowFloatingNotes(true)} title="Quick Notes">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {/* Module 1: News Summary (AI Summary) */}
        <section>
          <AISummary newsTitle={mockNews.title} newsContent={mockNews.summary} />
        </section>

        {/* Module 2: Industry Chain Analysis */}
        <section>
          <h3 className="text-foreground mb-2 uppercase tracking-wider text-base font-bold">INDUSTRY CHAIN</h3>
          <IndustryChainCompact {...mockIndustryChain} />
        </section>

        {/* Module 3: Overall Market Sentiment */}
        <section>
          <h3 className="text-base text-foreground mb-2 uppercase tracking-wider font-bold">
            Overall Market Sentiment
          </h3>

          {sentimentLoading ? <div className="h-20 flex items-center justify-center bg-card/30 rounded-lg border border-border/50">
              <p className="text-xs text-muted-foreground animate-pulse">Loading market sentiment...</p>
            </div> : marketSentiment ? <div className="animate-fade-in">
              {marketSentiment.type === "industry" && <p className="text-[9px] text-muted-foreground mb-2">Industry-level analysis</p>}
              {marketSentiment.type === "company" && <p className="text-muted-foreground mb-2 text-xs font-semibold">Company-level analysis</p>}
              <MarketSentimentCompact {...marketSentiment} />
            </div> : null}
        </section>

        {/* Module 4: Stock Tracker */}
        <section>
          <h2 className="text-base font-bold text-foreground mb-3 uppercase tracking-wider">
            Stock Tracker
          </h2>

          {/* Auto Tracking Section */}
          <div className="mb-3">
            <h3 className="text-[10px] font-semibold text-foreground mb-1.5 flex items-center gap-1">
              <span className="w-0.5 h-2.5 bg-primary rounded-full"></span>
              Auto Tracking
            </h3>
            <p className="text-[9px] text-muted-foreground mb-1.5">Stocks detected from current news</p>
            <div className="grid grid-cols-2 gap-2">
              {autoDetectedStocks.map(stock => <StockCardCompact key={stock.symbol} symbol={stock.symbol} company={stock.company} price={stock.price} change={stock.change} changePercent={stock.changePercent} sector={stock.sector} isSelected={selectedStock === stock.symbol} onCardClick={() => handleStockClick(stock.symbol)} />)}
            </div>
          </div>

          {/* User Watchlist Section */}
          <div className="mb-3">
            <h3 className="text-[10px] font-semibold text-foreground mb-1.5 flex items-center gap-1">
              <span className="w-0.5 h-2.5 bg-primary rounded-full"></span>
              User Watchlist
            </h3>
            <p className="text-[9px] text-muted-foreground mb-1.5">Your manually tracked stocks</p>
            <div className="grid grid-cols-2 gap-2">
              {userSelectedStocks.map(stock => <StockCardCompact key={stock.symbol} symbol={stock.symbol} company={stock.company} price={stock.price} change={stock.change} changePercent={stock.changePercent} sector={stock.sector} isSelected={selectedStock === stock.symbol} onCardClick={() => handleStockClick(stock.symbol)} />)}
            </div>
          </div>

          {/* Price Chart Section */}
          {selectedStock && <div className="animate-slide-in-top mt-2">
              {chartLoading ? <div className="h-40 flex items-center justify-center bg-card/30 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground animate-pulse">Loading chart...</p>
                </div> : selectedStockData?.chartData ? <PriceChartCompact symbol={selectedStock} data={selectedStockData.chartData} /> : null}
            </div>}
        </section>

        {/* Disclaimer */}
        <section>
          <Card className="p-3 bg-warning/5 border-warning/20">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              ⚠️ For informational purposes only, not financial advice.
            </p>
          </Card>
        </section>
      </main>

      {/* Floating Notes Panel */}
      {showFloatingNotes && <FloatingNotes onClose={() => setShowFloatingNotes(false)} onSave={handleSaveNote} />}

      {/* Notes Dashboard */}
      {showNotesDashboard && <NotesDashboard notes={notes} onClose={() => setShowNotesDashboard(false)} onDelete={handleDeleteNote} onExport={handleExportNotes} />}

      {/* Watchlist Dialog */}
      <WatchlistDialog open={showWatchlistDialog} onClose={() => setShowWatchlistDialog(false)} watchlist={watchlist} onAddStock={handleAddToWatchlist} onRemoveStock={handleRemoveFromWatchlist} />
    </div>;
};
export default Index;