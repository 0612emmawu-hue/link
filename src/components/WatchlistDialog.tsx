import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useState } from "react";

interface WatchlistDialogProps {
  open: boolean;
  onClose: () => void;
  watchlist: string[];
  onAddStock: (symbol: string) => void;
  onRemoveStock: (symbol: string) => void;
}

export const WatchlistDialog = ({ 
  open, 
  onClose, 
  watchlist, 
  onAddStock, 
  onRemoveStock 
}: WatchlistDialogProps) => {
  const [stockInput, setStockInput] = useState("");

  const handleAddStock = () => {
    const symbol = stockInput.trim().toUpperCase();
    if (symbol && !watchlist.includes(symbol)) {
      onAddStock(symbol);
      setStockInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddStock();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-primary/50">
        <DialogHeader>
          <DialogTitle className="text-foreground">Manage Watchlist</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Add Stock Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter stock symbol (e.g., AAPL)"
              value={stockInput}
              onChange={(e) => setStockInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
            />
            <Button 
              onClick={handleAddStock}
              size="sm"
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {/* Watchlist Items */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">
              Your Watchlist ({watchlist.length})
            </p>
            
            {watchlist.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                No stocks in watchlist. Add some to track them!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {watchlist.map((symbol) => (
                  <Badge 
                    key={symbol}
                    variant="secondary"
                    className="text-sm py-1 px-3 flex items-center gap-2 group hover:bg-destructive/10 transition-colors"
                  >
                    {symbol}
                    <button
                      onClick={() => onRemoveStock(symbol)}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                      title="Remove from watchlist"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
