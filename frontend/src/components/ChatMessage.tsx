import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  TrendingUp, 
  User, 
  Newspaper, 
  BarChart3, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { Message } from '../types';
import { RecentNewsCard } from './RecentNewsCard';
import { HistoricalPerformanceBlock } from './HistoricalPerformanceBlock';

interface ChatMessageProps {
  message: Message;
}

/**
 * Helper to check if a content block represents a Recent News item or section
 */
function parseNewsBlocks(content: string) {
  // Regex match for news item patterns
  const newsItemRegex = /\*\*\d+\.\s*([^\n]+)\*\*\n[\s\S]*?- (?:Source|Date|URL|Brief)[^\n]*/gi;
  // We can also parse structured news text if matched
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div
      className={`flex gap-3 sm:gap-4 p-4 sm:p-5 transition-colors ${
        isUser ? 'bg-slate-900/40 justify-end' : 'bg-slate-900/90 border-y border-slate-800/60'
      }`}
    >
      <div className={`flex gap-3 max-w-4xl w-full ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shadow-sm">
              <User className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`space-y-2 overflow-hidden flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-300">
              {isUser ? 'You' : 'India Equity AI'}
            </span>
            <span className="text-[10px] text-slate-500">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          {message.isError ? (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">Response Error</p>
                <p className="text-slate-300">{message.content}</p>
              </div>
            </div>
          ) : isUser ? (
            <div className="inline-block text-left p-3.5 rounded-2xl bg-emerald-600 text-slate-50 font-medium text-sm leading-relaxed shadow-md max-w-2xl">
              {message.content}
            </div>
          ) : (
            <div className="prose prose-invert prose-slate max-w-none text-sm text-slate-200 leading-relaxed font-normal">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Heading Customization
                  h3({ children }) {
                    const titleText = String(children);
                    if (titleText.includes('Recent News')) {
                      return (
                        <div className="flex items-center gap-2 mt-6 mb-3 pb-2 border-b border-slate-800 text-emerald-400 font-semibold text-base">
                          <Newspaper className="w-4 h-4 text-emerald-400" />
                          <span>{children}</span>
                        </div>
                      );
                    }
                    if (titleText.includes('Historical Performance')) {
                      return (
                        <div className="flex items-center gap-2 mt-6 mb-3 pb-2 border-b border-slate-800 text-teal-400 font-semibold text-base">
                          <BarChart3 className="w-4 h-4 text-teal-400" />
                          <span>{children}</span>
                        </div>
                      );
                    }
                    return (
                      <h3 className="text-base font-semibold text-slate-100 mt-5 mb-2 border-b border-slate-800 pb-1">
                        {children}
                      </h3>
                    );
                  },
                  // Styled Tables
                  table({ children }) {
                    return (
                      <div className="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
                        <table className="w-full text-left text-xs text-slate-200 border-collapse">
                          {children}
                        </table>
                      </div>
                    );
                  },
                  thead({ children }) {
                    return <thead className="bg-slate-800/80 text-slate-100 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-700">{children}</thead>;
                  },
                  th({ children }) {
                    return <th className="p-3 border-r border-slate-700/60 last:border-r-0">{children}</th>;
                  },
                  tr({ children }) {
                    return <tr className="border-b border-slate-800/80 hover:bg-slate-800/40 transition-colors">{children}</tr>;
                  },
                  td({ children }) {
                    return <td className="p-3 border-r border-slate-800/60 last:border-r-0 text-slate-300 font-normal">{children}</td>;
                  },
                  // Styled Links
                  a({ href, children }) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-emerald-400 hover:text-emerald-300 underline underline-offset-2 font-medium"
                      >
                        {children}
                        <ExternalLink className="w-3 h-3 inline ml-0.5" />
                      </a>
                    );
                  },
                  // Styled Unordered Lists
                  ul({ children }) {
                    return <ul className="my-2 space-y-1.5 list-disc list-inside text-slate-300">{children}</ul>;
                  },
                  // Styled Ordered Lists
                  ol({ children }) {
                    return <ol className="my-2 space-y-2 list-decimal list-inside text-slate-300">{children}</ol>;
                  },
                  // Styled Code Blocks / Inline Code
                  code({ className, children, ...props }) {
                    return (
                      <code
                        className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono text-xs border border-slate-700/60"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
