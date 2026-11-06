import React from 'react';
import { Heart, Plane, Calendar, Clock, ExternalLink, ShieldCheck, Building } from 'lucide-react';
import { generateBookingLink } from '../data/travelData';
import confetti from 'canvas-confetti';

export default function DealCard({
  deal,
  currency,
  currencyRate = 1.0,
  currencySymbol = '$',
  isFavorite,
  onToggleFavorite,
  onSelectDeal,
  originCode,
}) {
  // If RUB, use exact price from Travelpayouts. Otherwise convert from USD base
  const price = currency === 'RUB' ? deal.basePriceRub : Math.round(deal.basePriceUsd * currencyRate);
  const usualPrice = currency === 'RUB' ? deal.usualPriceRub : Math.round(deal.usualPriceUsd * currencyRate);
  const hotelPrice = Math.round((deal.hotelEstimatePerNightUsd || 30) * currencyRate);

  const handleBookClick = (e) => {
    e.stopPropagation();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
    });
    const link = generateBookingLink(originCode, deal.iata);
    window.open(link, '_blank');
  };

  return (
    <div
      onClick={() => onSelectDeal(deal)}
      className="group relative bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1.5 flex flex-col cursor-pointer"
    >
      {/* Header Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={deal.image}
          alt={deal.city}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs font-bold text-white shadow-sm flex items-center space-x-1">
              <span>{deal.flag}</span>
              <span>{deal.city}</span>
              <span className="text-[10px] text-sky-400 font-mono">({deal.iata})</span>
            </span>
            {deal.discountPercent && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-[11px] font-extrabold text-white shadow-sm animate-pulse">
                -{deal.discountPercent}%
              </span>
            )}
          </div>

          {/* Favorite Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(deal.id);
            }}
            className="w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:scale-110 transition-transform"
            title="Добавить в избранное"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-300'
              }`}
            />
          </button>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
          <span className="text-slate-300 font-medium drop-shadow-sm flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            <span>{deal.dates}</span>
          </span>
          <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md border border-emerald-500/30 text-[11px]">
            {deal.tag}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Flight Details */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-1.5 truncate pr-2">
              <Plane className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <span className="font-medium text-slate-300 truncate">{deal.airline}</span>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <span className={deal.direct ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                {deal.direct ? 'Прямой' : 'Пересадка'}
              </span>
            </div>
          </div>

          {/* Visa Status */}
          <div className="mt-3 flex items-center space-x-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">{deal.visa}</span>
          </div>

          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Рейс #{deal.flightNumber || 'Direct'}</span>
            <span className="text-[11px] text-sky-400/80 font-medium">Travelpayouts live</span>
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {price.toLocaleString('ru-RU')} {currencySymbol}
              </span>
              <span className="text-xs line-through text-slate-500 font-medium">
                {usualPrice.toLocaleString('ru-RU')} {currencySymbol}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center space-x-1">
              <Building className="w-3 h-3 text-slate-500" />
              <span>отель от {hotelPrice} {currencySymbol}/ночь</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleBookClick}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs flex items-center space-x-1 shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
              title="Перейти к покупке билета"
            >
              <span>Билет</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
