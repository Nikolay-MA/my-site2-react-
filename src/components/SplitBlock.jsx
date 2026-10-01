import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * SplitBlock Component
 * Designed exclusively for desktop screens.
 * Divides the viewport into two equal halves with interactive side arrows.
 */
export default function SplitBlock() {
  return (
    <div className="hidden md:flex relative w-full h-screen bg-slate-900 text-white overflow-hidden font-sans">
      
      {/* Левая стрелка / Left Arrow */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 group focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
      </button>

      {/* ЛЕВАЯ ПОЛОВИНА / LEFT HALF */}
      <div className="w-1/2 h-full flex flex-col justify-center items-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 border-r border-slate-700/50">
        <div className="max-w-md text-center">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full">
            Левая панель
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Первая половина</h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Этот блок отображается только на экранах компьютеров и разделен ровно пополам. Вы можете разместить здесь любой контент.
          </p>
        </div>
      </div>

      {/* ПРАВАЯ ПОЛОВИНА / RIGHT HALF */}
      <div className="w-1/2 h-full flex flex-col justify-center items-center p-8 bg-gradient-to-bl from-slate-900 to-slate-800">
        <div className="max-w-md text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full">
            Правая панель
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Вторая половина</h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Адаптивный класс md:flex скрывает этот компонент на мобильных устройствах, делая его доступным исключительно для десктопов.
          </p>
        </div>
      </div>

      {/* Правая стрелка / Right Arrow */}
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 group focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
      </button>

    </div>
  );
}
