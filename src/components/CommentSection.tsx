
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  date: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
}

export function CommentSection({ comments = [], onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login terlebih dahulu untuk menambahkan komentar.",
        variant: "destructive",
      });
      return;
    }
    
    onAddComment?.(newComment);
    setNewComment("");
    
    toast({
      title: "Komentar terkirim",
      description: "Komentar Anda telah berhasil ditambahkan."
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Komentar ({comments.length})</h3>
        
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4 border-b border-white/10 pb-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={comment.user.avatar || "/placeholder.svg"}
                    alt={comment.user.username}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{comment.user.username}</h4>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-sm text-left">{comment.content}</p>
              </div>
            </div>
          ))}
          
          {comments.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              Belum ada komentar. Jadilah yang pertama berkomentar!
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tambahkan Komentar</h3>
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src={user?.avatar || "/placeholder.svg"}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Tulis komentar Anda di sini..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-20 resize-none"
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmitComment} 
                className="space-x-2"
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
                <span>Kirim</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
