import React from 'react';
import { X, Heart, Trash2, ExternalLink } from 'lucide-react';
import { generateBookingLink } from '../data/travelData';

export default function FavoritesModal({
  isOpen,
  onClose,
  favoriteIds,
  allDeals = [],
  onRemoveFavorite,
  onSelectDeal,
  currency,
  currencyRate = 1.0,
  currencySymbol = '$',
  originCode,
}) {
  if (!isOpen) return null;

  const favoriteDeals = allDeals.filter((d) => favoriteIds.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-lg font-black text-white">
              Избранные направления ({favoriteDeals.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {favoriteDeals.length === 0 ? (
            <div className="py-12 text-center">
              <Heart className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-300 font-bold text-sm">В избранном пока пусто</p>
              <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto">
                Нажимай на сердечко на любой карточке, чтобы сохранить билеты.
              </p>
            </div>
          ) : (
            favoriteDeals.map((deal) => {
              const price =
                currency === 'RUB'
                  ? deal.basePriceRub
                  : Math.round(deal.basePriceUsd * currencyRate);
              return (
                <div
                  key={deal.id}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-3 transition-colors"
                >
                  <div
                    className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0"
                    onClick={() => {
                      onSelectDeal(deal);
                      onClose();
                    }}
                  >
                    <img
                      src={deal.image}
                      alt={deal.city}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="truncate">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm font-extrabold text-white truncate">
                          {deal.flag} {deal.city}
                        </span>
                        <span className="text-xs text-sky-400 font-mono">({deal.iata})</span>
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {deal.dates} • {deal.airline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-black text-white">
                        {price.toLocaleString('ru-RU')} {currencySymbol}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-bold">
                        -{deal.discountPercent}%
                      </div>
                    </div>

                    <a
                      href={generateBookingLink(originCode, deal.iata)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white transition-colors"
                      title="Купить билет"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => onRemoveFavorite(deal.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
