import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import DealCard from './components/DealCard';
import DealDetailModal from './components/DealDetailModal';
import TravelHacks from './components/TravelHacks';
import FavoritesModal from './components/FavoritesModal';
import PriceAlertBanner from './components/PriceAlertBanner';
import Footer from './components/Footer';
import { DESTINATIONS, POPULAR_ORIGINS, CURRENCY_RATES } from './data/travelData';
import { ArrowDownUp, Filter, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // State
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('tr_currency') || 'RUB';
  });
  const [origin, setOrigin] = useState('MOW');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxBudgetUsd, setMaxBudgetUsd] = useState(250);
  const [directOnly, setDirectOnly] = useState(false);
  const [sortBy, setSortBy] = useState('price-asc'); // 'price-asc', 'discount-desc'

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('tr_favorites');
      return saved ? JSON.parse(saved) : ['sochi', 'yerevan'];
    } catch {
      return ['sochi', 'yerevan'];
    }
  });

  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('tr_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('tr_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter & Sort Logic
  const filteredDeals = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (!item.category.includes(selectedCategory)) return false;
      }

      // Budget filter
      if (item.basePriceUsd > maxBudgetUsd) return false;

      // Direct only filter
      if (directOnly && !item.direct) return false;

      // Search query filter (city, country, IATA)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchCity = item.city.toLowerCase().includes(query);
        const matchCityEn = item.cityEn.toLowerCase().includes(query);
        const matchCountry = item.country.toLowerCase().includes(query);
        const matchIata = item.iata.toLowerCase().includes(query);
        if (!matchCity && !matchCityEn && !matchCountry && !matchIata) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePriceUsd - b.basePriceUsd;
      if (sortBy === 'discount-desc') return b.discountPercent - a.discountPercent;
      return 0;
    });
  }, [selectedCategory, maxBudgetUsd, directOnly, searchQuery, sortBy]);

  const activeOriginObj = POPULAR_ORIGINS.find((o) => o.code === origin) || POPULAR_ORIGINS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Hero with Search Controls */}
      <HeroSearch
        origin={origin}
        setOrigin={setOrigin}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        maxBudgetUsd={maxBudgetUsd}
        setMaxBudgetUsd={setMaxBudgetUsd}
        currency={currency}
        directOnly={directOnly}
        setDirectOnly={setDirectOnly}
      />

      {/* Deals Listing Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <span>Горящие направления из г. {activeOriginObj.name}</span>
              <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {filteredDeals.length} найдено
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Цены обновлены и проверены лоукост-сканером на ближайшие даты
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2">
            <ArrowDownUp className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            >
              <option value="price-asc">Сначала самые дешёвые</option>
              <option value="discount-desc">По размеру скидки (-%)</option>
            </select>
          </div>
        </div>

        {/* Deals Cards Grid */}
        {filteredDeals.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                currency={currency}
                isFavorite={favorites.includes(deal.id)}
                onToggleFavorite={toggleFavorite}
                onSelectDeal={(d) => setSelectedDeal(d)}
                originCode={origin}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 py-16 text-center bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <AlertCircle className="w-12 h-12 text-sky-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white">В этот бюджет направлений пока нет</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
              Попробуйте увеличить ползунок бюджета или сбросить фильтры категорий.
            </p>
            <button
              onClick={() => {
                setMaxBudgetUsd(350);
                setSelectedCategory('all');
                setSearchQuery('');
                setDirectOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition-colors"
            >
              Сбросить все фильтры
            </button>
          </div>
        )}
      </main>

      {/* Low-cost Routing Hacks Section */}
      <TravelHacks currency={currency} originCode={origin} />

      {/* Subscription Alert Banner */}
      <PriceAlertBanner />

      {/* Modals */}
      <DealDetailModal
        deal={selectedDeal}
        onClose={() => setSelectedDeal(null)}
        currency={currency}
        isFavorite={selectedDeal ? favorites.includes(selectedDeal.id) : false}
        onToggleFavorite={toggleFavorite}
        originCode={origin}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteIds={favorites}
        onRemoveFavorite={toggleFavorite}
        onSelectDeal={(d) => setSelectedDeal(d)}
        currency={currency}
        originCode={origin}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
