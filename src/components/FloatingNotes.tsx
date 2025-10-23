import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Save, GripVertical } from "lucide-react";
import { useState } from "react";

interface FloatingNotesProps {
  onClose: () => void;
  onSave: (note: string) => void;
}

export const FloatingNotes = ({ onClose, onSave }: FloatingNotesProps) => {
  const [note, setNote] = useState("");
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useState(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  });

  const handleSave = () => {
    if (note.trim()) {
      onSave(note);
      setNote("");
      onClose();
    }
  };

  return (
    <div
      className="fixed z-50 w-[340px]"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <Card className="bg-card/95 backdrop-blur-xl border-primary/50 shadow-glow">
        <div 
          className="flex items-center justify-between p-3 border-b border-border/50 cursor-move"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-bold text-foreground">Quick Notes</h3>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-6 w-6 p-0" 
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-4 space-y-3">
          <Textarea
            placeholder="Record your trading thoughts..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50 resize-none text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onClose}
              className="h-8"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              disabled={!note.trim()}
              className="h-8 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
            >
              <Save className="w-3 h-3 mr-1" />
              Save Note
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};