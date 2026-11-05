import React from 'react';
import { Lightbulb, ArrowRight, Zap, TrendingDown, Plane, CheckCircle2 } from 'lucide-react';
import { TRAVEL_HACKS, CURRENCY_RATES, generateBookingLink } from '../data/travelData';

export default function TravelHacks({ currency, originCode }) {
  const curr = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  return (
    <section className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Лайфхаки и связки лоукостеров</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Скрытые стыковки: как улететь в Европу и Азию до 70% дешевле
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Прямые рейсы часто стоят заоблачных денег. Используй составные хабы (Ереван, Кутаиси, Стамбул) с пересадками на европейские и азиатские лоукостеры.
            </p>
          </div>
        </div>

        {/* Hacks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAVEL_HACKS.map((hack) => (
            <div
              key={hack.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-black uppercase tracking-wider">
                    {hack.badge}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>{hack.savings}</span>
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  {hack.title}
                </h3>

                <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-semibold text-sky-300 flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>{hack.route}</span>
                </div>

                <div className="mt-2 text-xs text-slate-400 font-medium">
                  Лоукостеры: <span className="text-slate-200">{hack.airline}</span>
                </div>

                <p className="mt-3 text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                  💡 <span className="text-slate-300">{hack.tip}</span>
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800">
                <a
                  href={generateBookingLink(originCode || hack.origin, hack.destination)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Проверить даты связки</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
