import React from 'react';
import { 
  Sparkles, 
  BarChart2, 
  Newspaper, 
  Search, 
  History, 
  Building2, 
  ShieldAlert, 
  X,
  ExternalLink
} from 'lucide-react';
import { ExamplePrompt } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (promptText: string) => void;
}

const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    id: '1',
    title: 'Reliance Stock Price',
    prompt: "What's the current price of Reliance?",
    category: 'Price',
  },
  {
    id: '2',
    title: 'TCS vs Infosys',
    prompt: 'Compare TCS and Infosys fundamentals',
    category: 'Comparison',
  },
  {
    id: '3',
    title: 'HDFC Bank 1Y Return',
    prompt: 'How has HDFC Bank performed over the last year?',
    category: 'Returns',
  },
  {
    id: '4',
    title: 'Adani News & Updates',
    prompt: 'Latest news on Adani Enterprises',
    category: 'News',
  },
  {
    id: '5',
    title: 'Tata Motors Performance',
    prompt: 'Show Tata Motors historical performance for the last 6 months',
    category: 'Returns',
  },
  {
    id: '6',
    title: 'L&T Fundamentals',
    prompt: 'Get stock fundamentals and P/E ratio for Larsen & Toubro',
    category: 'Price',
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-80 bg-slate-900 border-r border-slate-800 flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
          <span className="font-semibold text-sm text-slate-200">Menu</span>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Section: Example Prompts */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Suggested Prompts
            </div>

            <div className="space-y-2">
              {EXAMPLE_PROMPTS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectPrompt(item.prompt);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/40 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-medium text-slate-200 group-hover:text-emerald-300">
                    <span>{item.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/80 text-slate-400">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    "{item.prompt}"
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Tool Capabilities */}
          <div className="pt-2 border-t border-slate-800">
            <div className="px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Real-time Capabilities
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>NSE Market Data:</strong> Real-time price, high/low, and volume for Indian stocks.</span>
              </li>
              <li className="flex items-start gap-2">
                <History className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span><strong>Historical Returns:</strong> 1mo, 3mo, 6mo, 1y, 2y, 5y CAGR analysis.</span>
              </li>
              <li className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Fundamentals:</strong> P/E, Market Cap, 52W range, Dividend Yield & Margins.</span>
              </li>
              <li className="flex items-start gap-2">
                <Newspaper className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Live News Search:</strong> Real-time financial web search with source links.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500/80 shrink-0 mt-0.5" />
          <span>
            For research & educational purposes only. Does not constitute financial advice or stock recommendations.
          </span>
        </div>
      </aside>
    </>
  );
};
