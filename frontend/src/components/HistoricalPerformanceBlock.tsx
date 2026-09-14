import React from 'react';
import { TrendingUp, TrendingDown, Calendar, ArrowRightLeft } from 'lucide-react';

export interface HistoricalPerformanceProps {
  period?: string;
  startingPrice?: string;
  endingPrice?: string;
  returnPercent?: string;
  dateRange?: string;
}

export const HistoricalPerformanceBlock: React.FC<HistoricalPerformanceProps> = ({
  period,
  startingPrice,
  endingPrice,
  returnPercent,
  dateRange,
}) => {
  const isPositive = returnPercent ? !returnPercent.includes('-') : true;

  return (
    <div className="my-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <ArrowRightLeft className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 text-xs uppercase tracking-wider">
              Historical Return Summary
            </h4>
            {period && (
              <span className="text-[11px] text-slate-400 font-normal">
                Timeframe: {period}
              </span>
            )}
          </div>
        </div>

        {returnPercent && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{returnPercent}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {startingPrice && (
          <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">
              Start Price
            </span>
            <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
              {startingPrice.startsWith('₹') ? startingPrice : `₹${startingPrice}`}
            </span>
          </div>
        )}

        {endingPrice && (
          <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">
              End Price
            </span>
            <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
              {endingPrice.startsWith('₹') ? endingPrice : `₹${endingPrice}`}
            </span>
          </div>
        )}

        {dateRange && (
          <div className="col-span-2 sm:col-span-1 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">
              Date Span
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-300 mt-0.5">
              <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{dateRange}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
