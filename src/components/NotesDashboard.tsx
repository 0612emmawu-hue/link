import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, Trash2, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Note {
  id: string;
  content: string;
  timestamp: string;
  newsUrl: string;
  newsTitle: string;
}

interface NotesDashboardProps {
  notes: Note[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onExport: () => void;
}

export const NotesDashboard = ({ notes, onClose, onDelete, onExport }: NotesDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.newsTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Notes Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onExport}
              className="h-9"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={onClose}
              className="h-9 w-9 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? "No notes found matching your search." : "No notes yet. Start taking notes!"}
              </p>
            </Card>
          ) : (
            filteredNotes.map((note) => (
              <Card key={note.id} className="p-4 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                      </div>
                      <a 
                        href={note.newsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1 group"
                      >
                        {note.newsTitle}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(note.id)}
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};