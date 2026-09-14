import React from 'react';
import { Newspaper, ExternalLink, Calendar, Tag } from 'lucide-react';

export interface NewsItemProps {
  title: string;
  explanation: string;
  source: string;
  date: string;
  url: string;
  number?: string | number;
}

export const RecentNewsCard: React.FC<NewsItemProps> = ({
  title,
  explanation,
  source,
  date,
  url,
  number,
}) => {
  return (
    <div className="my-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-md group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          {number && (
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold shrink-0 mt-0.5">
              {number}
            </span>
          )}
          <h4 className="font-semibold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors leading-snug">
            {title}
          </h4>
        </div>
        {url && url.startsWith('http') && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 hover:underline shrink-0 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 transition-colors"
          >
            <span>Read</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {explanation && (
        <p className="text-xs text-slate-300 mt-2.5 leading-relaxed pl-8">
          {explanation}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 mt-3.5 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 pl-8">
        {source && (
          <div className="flex items-center gap-1 text-slate-300 font-medium">
            <Tag className="w-3 h-3 text-emerald-400" />
            <span>{source}</span>
          </div>
        )}
        {date && (
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3 h-3 text-slate-500" />
            <span>{date}</span>
          </div>
        )}
      </div>
    </div>
  );
};
