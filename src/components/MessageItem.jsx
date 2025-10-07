import { useState } from 'react'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Mail, Trash2, Reply, Clock, User, Send, X } from 'lucide-react'

export function MessageItem({ message, onDelete, onReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(message, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const handleCancelReply = () => {
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <Card className="p-3 sm:p-4 border-l-4 border-bow-indigo">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <User className="text-gray-500 w-4 h-4 flex-shrink-0" />
            <span className="font-semibold text-gray-800 text-sm sm:text-base truncate">
              {message.studentName}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded">
              {message.studentId}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {new Date(message.timestamp).toLocaleDateString()}
            </div>
          </div>
          <h3 className="font-semibold text-bow-indigo text-base sm:text-lg leading-tight">
            {message.subject}
          </h3>
        </div>
        
        {/* Action Buttons - Mobile Friendly */}
        <div className="flex justify-end gap-1 sm:gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsReplying(!isReplying)}
            className="p-1.5 sm:p-2"
            aria-label="Reply"
          >
            <Reply className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(message.id)}
            className="p-1.5 sm:p-2 text-red-500 hover:text-red-700"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Message Content */}
      <div className="mb-3">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
          {message.message}
        </p>
      </div>

      {/* Reply Section - Mobile Optimized */}
      {isReplying && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="text-bow-indigo w-4 h-4" />
            <span className="font-semibold text-bow-indigo text-sm">
              Reply to {message.studentName}
            </span>
          </div>
          
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply message here..."
            rows="3"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-bow-indigo focus:border-bow-indigo resize-none"
          />
          
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Button 
              onClick={handleReply} 
              size="sm" 
              className="flex-1 justify-center sm:flex-none"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Reply
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancelReply} 
              size="sm"
              className="flex-1 justify-center sm:flex-none"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}