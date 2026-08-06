import React from 'react';

export default function VinylPlayer({ onReviewClick }) {
  return (
    <div className="bg-header-gradient p-2 rounded-lg border border-sz-blue shadow-lg relative overflow-hidden flex flex-col items-center justify-center py-10 group">
      <div className="absolute inset-0 bg-glass-gradient opacity-30 pointer-events-none z-0"></div>
      <h2 
        className="relative z-10 text-2xl md:text-3xl font-extrabold text-sz-yellow mb-6 tracking-wider text-center" 
        style={{ textShadow: '2px 2px 0px black' }}
      >
        O que você está ouvindo?
      </h2>

      <div className="relative z-10 w-64 h-64 bg-gradient-to-b from-sz-dark to-gray-500 rounded-xl border-4 border-sz-yellow shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.9)] p-3 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-[0_15px_30px_rgba(255,190,11,0.5)]">
        <div className="relative shrink-0 w-40 h-40 bg-[#1a1a1a] rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.2)] border-4 border-[#333] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out mt-1">
          <div className="absolute inset-1 bg-gradient-to-br from-[#4a4a4a] to-[#111] rounded-full shadow-inner"></div>
          <div className="absolute inset-[10px] bg-[radial-gradient(circle_at_center,#999_0%,#444_50%,#111_100%)] rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
            <div className="absolute w-28 h-28 rounded-full border border-black/20"></div>
            <div className="absolute w-20 h-20 rounded-full border border-black/30"></div>
            <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#666] to-[#111] rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.8),inset_0_1px_3px_rgba(255,255,255,0.3)] border border-[#222]"></div>
          </div>
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#888] rounded-full shadow-sm"></div>
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#888] rounded-full shadow-sm"></div>
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#888] rounded-full shadow-sm"></div>
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#888] rounded-full shadow-sm"></div>
        </div>

        <button 
          onClick={onReviewClick}
          className="metro-button w-full py-2 text-sm flex items-center justify-center gap-2 transform active:scale-95 tracking-widest mb-1"
        >
          <i className="fas fa-plus-circle text-lg"></i>
          ESCREVER REVIEW
        </button>
        
        <div className="absolute -top-3 -right-3 bg-sz-yellow text-sz-dark text-xs font-bold px-3 py-1 rounded shadow-md border border-yellow-600 z-10 rotate-12">
          SOMZERA!!
        </div>
      </div>
    </div>
  );
}