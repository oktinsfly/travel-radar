import React from 'react';
import { Compass, Heart, Sparkles, Activity } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { INITIAL_CURRENCY_RATES } from '../data/travelData';

export default function Navbar({
  currency,
  setCurrency,
  currencyRates = INITIAL_CURRENCY_RATES,
  favoritesCount,
  onOpenFavorites,
}) {
  const currentRates = currencyRates || INITIAL_CURRENCY_RATES;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
            <Compass className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent">
                TravelRadar
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>LIVE API</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Travelpayouts Flight Radar
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Currency Switcher */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none bg-slate-900 border border-slate-700/80 text-xs sm:text-sm font-semibold text-slate-200 rounded-lg pl-3 pr-8 py-1.5 hover:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer transition-colors"
            >
              {Object.entries(currentRates).map(([key, item]) => (
                <option key={key} value={key} className="bg-slate-900 text-slate-200">
                  {item.symbol} {key}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <span className="text-[10px]">▼</span>
            </div>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
            title="Избранные направления"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/oktinsfly/travel-radar"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
