import React from 'react';
import { Search, MapPin, PlaneTakeoff, SlidersHorizontal, Sparkles, ShieldCheck, Sun, Building2, Mountain, Flame, ArrowRight } from 'lucide-react';
import { POPULAR_ORIGINS, CURRENCY_RATES } from '../data/travelData';

export default function HeroSearch({
  origin,
  setOrigin,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxBudgetUsd,
  setMaxBudgetUsd,
  currency,
  directOnly,
  setDirectOnly,
}) {
  const currentCurrency = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const budgetInCurrentCurrency = Math.round(maxBudgetUsd * currentCurrency.rate);

  const categories = [
    { id: 'all', label: 'Все предложения', icon: Sparkles },
    { id: 'novisa', label: 'Без визы', icon: ShieldCheck },
    { id: 'beach', label: 'Пляж и море', icon: Sun },
    { id: 'city', label: 'Сити-брейк', icon: Building2 },
    { id: 'mountains', label: 'Горы и природа', icon: Mountain },
    { id: 'budget', label: 'Супер-эконом', icon: Flame },
  ];

  return (
    <div className="relative pt-8 pb-10 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs sm:text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
          <span>Умный сканер дешёвых авиабилетов и лоукостеров</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Куда улететь дешевле всего? <br />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
            Лоукост-радар низких цен
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal">
          Мгновенный поиск выгодных рейсов, безвизовых стран и скрытых связок лоукостеров по ценам ниже чашки кофе.
        </p>

        {/* Main Search Panel */}
        <div className="mt-8 max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-sky-950/40 text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Origin Departure Selector */}
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center space-x-1.5">
                <PlaneTakeoff className="w-3.5 h-3.5 text-sky-400" />
                <span>Город вылета</span>
              </label>
              <div className="relative">
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700 text-slate-100 font-semibold text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-colors cursor-pointer"
                >
                  {POPULAR_ORIGINS.map((item) => (
                    <option key={item.code} value={item.code} className="bg-slate-900">
                      {item.flag} {item.name} ({item.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination Search / Anywhere */}
            <div className="md:col-span-5">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Куда летим</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Куда угодно (или город/страна)..."
                  className="w-full bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm font-semibold rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-xs text-slate-500 hover:text-slate-300"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Direct Flight Filter Checkbox */}
            <div className="md:col-span-3 flex md:flex-col justify-between items-start md:items-end pt-1">
              <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center space-x-1 cursor-pointer">
                <span>Только прямые</span>
              </label>
              <button
                type="button"
                onClick={() => setDirectOnly(!directOnly)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                  directOnly
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{directOnly ? '✅ Только прямые' : 'Все рейсы (с 1 пересадкой)'}</span>
              </button>
            </div>
          </div>

          {/* Quick Origin Presets */}
          <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium mr-1">Популярные вылеты:</span>
            {POPULAR_ORIGINS.slice(0, 6).map((city) => (
              <button
                key={city.code}
                onClick={() => setOrigin(city.code)}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  origin === city.code
                    ? 'bg-sky-500 text-white font-bold'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {city.flag} {city.name}
              </button>
            ))}
          </div>

          {/* Budget Range Slider */}
          <div className="mt-4 pt-3.5 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
              <span className="text-slate-400 flex items-center space-x-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
                <span>Максимальный бюджет на билет:</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20 font-bold">
                до {budgetInCurrentCurrency.toLocaleString('ru-RU')} {currentCurrency.symbol}
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="350"
              step="10"
              value={maxBudgetUsd}
              onChange={(e) => setMaxBudgetUsd(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400 transition-all"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
              <span>Эконом ($30)</span>
              <span>Средний ($150)</span>
              <span>Без ограничений ($350+)</span>
            </div>
          </div>
        </div>

        {/* Category Filters Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-400 shadow-lg shadow-sky-500/25 scale-105'
                    : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
