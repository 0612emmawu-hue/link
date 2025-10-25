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
import { useState } from "react";
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

  // Mock data - TODO: Replace with chrome.tabs API call to get current page content
  const mockNews = {
    title: "Federal Reserve Maintains Interest Rates, Tech Stocks Surge",
    source: "Bloomberg",
    url: "https://bloomberg.com",
    summary: "The Federal Reserve decided to keep benchmark interest rates unchanged at its latest monetary policy meeting, in line with market expectations. The post-meeting statement indicates easing inflationary pressures and resilient economic growth.",
    timestamp: "2 hours ago",
    sentiment: "positive" as const
  };

  // TODO: Backend API - Fetch real-time stock price data
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

  // TODO: Backend API - Auto-detect stocks from news content using RAG
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

  // TODO: User-selected stocks stored in local storage
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

  // TODO: Backend API - Auto-analyze industry chain from news content
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

  // TODO: Backend API - Analyze market segments from news content
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

  // TODO: Backend API - Analyze overall market sentiment from news and industry data
  // Scenario 1: Industry-level sentiment (when no specific companies mentioned)
  const mockMarketSentimentIndustry = {
    items: [
      { name: "Semiconductor", score: 60, sentiment: "positive" as const },
      { name: "EV Supply Chain", score: 20, sentiment: "neutral" as const }
    ],
    type: "industry" as const
  };

  // Scenario 2: Company-level sentiment (when specific companies mentioned)
  const mockMarketSentimentCompany = {
    items: [
      { name: "NVIDIA", score: 75, sentiment: "positive" as const },
      { name: "TSMC", score: 45, sentiment: "neutral" as const },
      { name: "Intel", score: 25, sentiment: "negative" as const }
    ],
    type: "company" as const
  };
  const handleSaveNote = (noteContent: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: noteContent,
      timestamp: new Date().toLocaleString(),
      newsUrl: mockNews.url,
      newsTitle: mockNews.title
    };
    setNotes([newNote, ...notes]);
    // TODO: Save to local storage
  };
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    // TODO: Update local storage
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
    setWatchlist([...watchlist, symbol]);
    // TODO: Save to local storage
  };
  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(s => s !== symbol));
    // TODO: Update local storage
  };

  const handleStockClick = (symbol: string) => {
    if (selectedStock === symbol) {
      setSelectedStock(null);
    } else {
      setChartLoading(true);
      setSelectedStock(symbol);
      // Simulate chart data loading
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
          <h3 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
            Industry Chain Analysis
          </h3>
          <IndustryChainCompact {...mockIndustryChain} />
        </section>

        {/* Module 3: Overall Market Sentiment */}
        <section className="space-y-3">
          {/* Scenario 1: Industry-level sentiment */}
          <div>
            <h3 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
              Market Sentiment (Industry)
            </h3>
            <p className="text-[9px] text-muted-foreground mb-2">When news doesn't mention specific companies</p>
            <MarketSentimentCompact {...mockMarketSentimentIndustry} />
          </div>

          {/* Scenario 2: Company-level sentiment */}
          <div>
            <h3 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
              Market Sentiment (Company)
            </h3>
            <p className="text-[9px] text-muted-foreground mb-2">When news mentions specific companies</p>
            <MarketSentimentCompact {...mockMarketSentimentCompany} />
          </div>
        </section>


        {/* Module 4: Stock Tracker */}
        <section>
          <h2 className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
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
              {autoDetectedStocks.map(stock => (
                <StockCardCompact 
                  key={stock.symbol}
                  symbol={stock.symbol}
                  company={stock.company}
                  price={stock.price}
                  change={stock.change}
                  changePercent={stock.changePercent}
                  sector={stock.sector}
                  isSelected={selectedStock === stock.symbol}
                  onCardClick={() => handleStockClick(stock.symbol)}
                />
              ))}
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
              {userSelectedStocks.map(stock => (
                <StockCardCompact 
                  key={stock.symbol}
                  symbol={stock.symbol}
                  company={stock.company}
                  price={stock.price}
                  change={stock.change}
                  changePercent={stock.changePercent}
                  sector={stock.sector}
                  isSelected={selectedStock === stock.symbol}
                  onCardClick={() => handleStockClick(stock.symbol)}
                />
              ))}
            </div>
          </div>

          {/* Price Chart Section */}
          {selectedStock && (
            <div className="animate-slide-in-top mt-2">
              {chartLoading ? (
                <div className="h-40 flex items-center justify-center bg-card/30 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground animate-pulse">Loading chart...</p>
                </div>
              ) : selectedStockData?.chartData ? (
                <PriceChartCompact 
                  symbol={selectedStock} 
                  data={selectedStockData.chartData} 
                />
              ) : null}
            </div>
          )}
        </section>


        {/* Disclaimer */}
        <section>
          <Card className="p-3 bg-warning/5 border-warning/20">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">⚠️ This extension provides information only, 
not investment advice</p>
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