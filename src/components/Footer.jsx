import React from 'react';
import { Compass, Heart, Shield, Sparkles } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white">TravelRadar</span>
              <p className="text-xs text-slate-500">
                Автономный продукт для поиска самых дешёвых путешествий
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center space-x-1.5">
              <span>Сделано с</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
              <span>на React, Vite & Tailwind CSS</span>
            </span>
            <span>•</span>
            <a
              href="https://github.com/oktinsfly/travel-radar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-900 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} TravelRadar. Опубликовано на GitHub Pages. Все данные о билетах и стыковках обновляются динамически.
        </div>
      </div>
    </footer>
  );
}
