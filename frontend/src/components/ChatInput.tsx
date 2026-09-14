import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
}

const QUICK_CHIPS = [
  "Reliance stock price",
  "Compare TCS & Infosys",
  "HDFC Bank 1Y return",
  "Latest news on Adani"
];

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  error,
  onClearError,
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [text]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800 z-10 sticky bottom-0 backdrop-blur-md">
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Error Toast/Banner */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={onClearError}
              className="text-xs font-semibold text-rose-400 hover:text-rose-200 underline ml-3"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Quick Chip Shortcuts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Quick Try:
          </span>
          {QUICK_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => onSendMessage(chip)}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-emerald-300 transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={
              isLoading
                ? "Agent is running tools & analyzing data..."
                : "Ask about Indian stocks, prices, historical performance, fundamentals, or news..."
            }
            className="w-full py-3 pl-4 pr-12 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 text-slate-100 placeholder-slate-500 text-xs sm:text-sm resize-none transition-all disabled:opacity-60 disabled:cursor-not-allowed outline-none shadow-inner"
          />

          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className="absolute right-2.5 p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-950 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-md"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-500">
          Uses Yahoo Finance & DuckDuckGo Search API for live Indian stock data. Press Enter to send, Shift+Enter for new line.
        </p>
      </div>
    </div>
  );
};
