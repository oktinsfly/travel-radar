import React, { useState } from 'react';
import { X, Plane, Calendar, Building, Utensils, ShieldCheck, Heart, Sparkles, ExternalLink, Users, Clock, Info } from 'lucide-react';
import { CURRENCY_RATES, generateCalendarPrices, generateBookingLink } from '../data/travelData';
import confetti from 'canvas-confetti';

export default function DealDetailModal({
  deal,
  onClose,
  currency,
  isFavorite,
  onToggleFavorite,
  originCode,
}) {
  if (!deal) return null;

  const curr = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  // State for Trip Budget Calculator
  const [nights, setNights] = useState(4);
  const [travelers, setTravelers] = useState(1);
  const [hotelType, setHotelType] = useState('comfort'); // 'budget', 'comfort', 'luxury'

  const hotelMultiplier = {
    budget: 0.65,
    comfort: 1.0,
    luxury: 2.2,
  }[hotelType];

  const flightPrice = Math.round(deal.basePriceUsd * curr.rate) * travelers;
  const hotelPerNight = Math.round(deal.hotelEstimatePerNightUsd * curr.rate * hotelMultiplier);
  const totalHotel = hotelPerNight * nights;
  const totalExpenses = Math.round(deal.dailyExpenseUsd * curr.rate * nights * travelers);
  const grandTotal = flightPrice + totalHotel + totalExpenses;

  // Generate calendar days
  const calendarDays = generateCalendarPrices(deal.basePriceUsd);

  const handleBookNow = () => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });
    const link = generateBookingLink(originCode, deal.iata);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Hero Image */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
          <img src={deal.image} alt={deal.city} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-white flex items-center space-x-1.5">
              <span>{deal.flag}</span>
              <span>{deal.country}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-xs font-bold text-white">
              Скидка -{deal.discountPercent}%
            </span>
          </div>

          {/* Bottom Title Area */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {deal.city}
                </h2>
                <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  {deal.iata}
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                {deal.description}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleFavorite(deal.id)}
                className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white hover:bg-slate-700 transition-colors"
                title="В избранное"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
              </button>
              <button
                onClick={handleBookNow}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-sm flex items-center space-x-2 shadow-xl shadow-sky-500/30 transition-all hover:scale-105"
              >
                <span>Купить за {Math.round(deal.basePriceUsd * curr.rate).toLocaleString('ru-RU')} {curr.symbol}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Авиакомпания</span>
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Plane className="w-3.5 h-3.5 text-sky-400" />
                <span className="truncate">{deal.airline}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Время в полете</span>
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{deal.flightTime} ({deal.direct ? 'Прямой' : '1 пересадка'})</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Визовый режим</span>
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">{deal.visa}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Даты суперцены</span>
              <div className="text-xs font-bold text-sky-300 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span className="truncate">{deal.dates}</span>
              </div>
            </div>
          </div>

          {/* Section: Interactive 28-Day Price Calendar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">
                  Календарь низких цен на 4 недели вперед
                </h3>
              </div>
              <div className="flex items-center space-x-3 text-[11px]">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-emerald-400 font-medium">Суперцена</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block" />
                  <span className="text-slate-400">Обычно</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                  <span className="text-rose-400">Пик</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarDays.map((item, idx) => {
                const dayPrice = Math.round(item.priceUsd * curr.rate);
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      item.status === 'super-cheap'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold'
                        : item.status === 'expensive'
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 flex justify-between">
                      <span>{item.dayOfWeek}</span>
                      <span>{item.dayNumber}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold mt-1">
                      {dayPrice} {curr.symbol}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Trip Total Cost Calculator */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white">
                Калькулятор полной стоимости поездки под ключ
              </h3>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-800">
              {/* Nights selector */}
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1.5">
                  Длительность поездки:
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {[2, 4, 7, 10].map((n) => (
                    <button
                      key={n}
                      onClick={() => setNights(n)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        nights === n
                          ? 'bg-sky-500 text-white border-sky-400'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {n} {n === 2 ? 'ночи' : 'ночей'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1.5">
                  Количество человек:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[1, 2].map((num) => (
                    <button
                      key={num}
                      onClick={() => setTravelers(num)}
                      className={`py-1.5 text-xs font-bold rounded-lg border flex items-center justify-center space-x-1.5 transition-all ${
                        travelers === num
                          ? 'bg-sky-500 text-white border-sky-400'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{num === 1 ? '1 путник' : '2 человека'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hotel comfort */}
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1.5">
                  Уровень жилья:
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'budget', label: 'Хостел' },
                    { id: 'comfort', label: 'Отель 3★' },
                    { id: 'luxury', label: 'Люкс 5★' },
                  ].map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setHotelType(h.id)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        hotelType === h.id
                          ? 'bg-sky-500 text-white border-sky-400'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Budget Breakdown */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-center sm:text-left">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 flex items-center space-x-1 mb-1">
                  <Plane className="w-3 h-3 text-sky-400" />
                  <span>Перелет ({travelers} чел)</span>
                </span>
                <span className="text-base font-bold text-white">
                  {flightPrice.toLocaleString('ru-RU')} {curr.symbol}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 flex items-center space-x-1 mb-1">
                  <Building className="w-3 h-3 text-indigo-400" />
                  <span>Отель ({nights} ноч.)</span>
                </span>
                <span className="text-base font-bold text-white">
                  {totalHotel.toLocaleString('ru-RU')} {curr.symbol}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 flex items-center space-x-1 mb-1">
                  <Utensils className="w-3 h-3 text-amber-400" />
                  <span>Еда + транспорт</span>
                </span>
                <span className="text-base font-bold text-white">
                  {totalExpenses.toLocaleString('ru-RU')} {curr.symbol}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-500/40">
                <span className="text-[11px] text-sky-300 font-bold block mb-1">
                  ИТОГО ПОЕЗДКА:
                </span>
                <span className="text-lg sm:text-xl font-black text-sky-200">
                  {grandTotal.toLocaleString('ru-RU')} {curr.symbol}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
