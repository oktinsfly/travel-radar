import React, { useState, useEffect } from 'react';
import { Bell, Check, Send, Sparkles, SendHorizontal } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PriceAlertBanner() {
  const [contact, setContact] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [savedAlerts, setSavedAlerts] = useState(() => {
    try {
      const s = localStorage.getItem('tr_price_alerts');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.trim()) return;

    const newAlert = {
      contact: contact.trim(),
      date: new Date().toISOString(),
      active: true,
    };

    const updated = [newAlert, ...savedAlerts];
    setSavedAlerts(updated);
    localStorage.setItem('tr_price_alerts', JSON.stringify(updated));

    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
    });
  };

  return (
    <div className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 p-6 sm:p-10 shadow-2xl shadow-sky-500/20">
        {/* Glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold mb-3">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>Радар горящих тарифов 24/7 (Travelpayouts)</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Не упусти билет за копейки! Подпишись на радар низких цен
          </h3>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            Лоукостеры выбрасывают промо-билеты ночью или по вторникам. Мы сканируем базы и присылаем уведомление сразу, как только цена падает более чем на 40%.
          </p>

          {subscribed ? (
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="inline-flex items-center space-x-2 px-4 py-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm">
                <Check className="w-5 h-5 text-emerald-300" />
                <span>Контакт {contact} сохранен в радаре оповещений!</span>
              </div>
              <button
                onClick={() => setSubscribed(false)}
                className="text-xs text-white/70 hover:text-white underline"
              >
                Добавить еще один контакт
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Telegram @username или Email..."
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <span>Подписаться</span>
                <SendHorizontal className="w-4 h-4 text-sky-600" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
