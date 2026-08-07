import React from 'react';

export default function Sidebar() {
  const genres = [
    { name: 'Alternative', icon: 'fa-compact-disc', color: 'text-sz-blue' },
    { name: 'Electronic', icon: 'fa-compact-disc', color: 'text-sz-purple' },
    { name: 'Hip Hop', icon: 'fa-compact-disc', color: 'text-sz-blue' },
    { name: 'Indie Rock', icon: 'fa-compact-disc', color: 'text-sz-dark' },
    { name: 'Pop', icon: 'fa-compact-disc', color: 'text-sz-light' },
    { name: 'R&B', icon: 'fa-compact-disc', color: 'text-sz-purple' },
  ];

  return (
    <div className="w-full md:w-1/3 p-4 flex flex-col gap-6 bg-gray-200 shadow-[inset_2px_0_5px_rgba(0,0,0,0.05)] border-l border-white overflow-y-auto">
      {/* Painel de gêneros */}
      <div className="aero-panel bg-sz-green w-full border-5 border-dotted border-sz-dark/10 shadow-retro-panel rounded-md overflow-hidden">
        {/* Cabeçalho */}
        <div className="aero-header bg-sz-purple text-white text-xs font-bold p-2.5 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sz-blue/10 via-transparent to-sz-purple/45 pointer-events-none"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-white/30 border border-white/50 shadow-inner flex items-center justify-center">
                <i className="fas fa-compact-disc text-sz-yellow drop-shadow-md"></i>
              </span>
              <span className="tracking-wide drop-shadow-sm">
                Browse Genres
              </span>
            </div>
            <i className="fas fa-music text-sz-yellow drop-shadow-md"></i>
          </div>
        </div>
        {/* Lista de gêneros */}
        <ul className="text-xs p-2.5 flex flex-col gap-1.5 text-sz-dark bg-white/25 backdrop-blur-sm">
          {genres.map((genre, index) => (
            <li
              key={index}
              className="group hover:bg-sz-yellow/70 hover:text-sz-dark p-2 rounded-md cursor-pointer flex items-center gap-2.5 transition-all dur
               ation-150 border border-transparent border-b-white/40 hover:border-sz-yellow/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_2px_5px_rgba(2
                7,38,59,0.12)]"
            >
              <span className="w-7 h-7 shrink-0 rounded-full bg-white/55 border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_1p
              x_3px_rgba(27,38,59,0.16)] flex items-center justify-center">
                <i
                  className={`fas ${genre.icon} ${genre.color} text-sm drop-shadow-[0_1px_1px_rgba(27,38,59,0.3)] transition-transform duration-20
                  0 group-hover:rotate-12 group-hover:scale-110`}
                ></i>
              </span>
              <span className="flex-1 font-bold tracking-wide">
                {genre.name}
              </span>
              <i className="fas fa-chevron-right text-[8px] text-sz-purple/60 transition-all duration-150 group-hover:text-sz-dark group-hover:tra
              nslate-x-0.5"></i>
            </li>
          ))}
        </ul>
      </div>
      {/* Painel Somzera Links */}
      <div className="aero-panel bg-sz-dark/85 text-sz-light p-4 rounded-md border-2 border-sz-yellow/80 shadow-[0_8px_20px_rgba(27,38,59,0.3),0_0
_12px_rgba(4,178,217,0.15)] flex flex-col gap-3 relative overflow-hidden">
        {/* Camadas decorativas */}
        <div className="absolute inset-0 bg-glass-gradient opacity-20 pointer-events-none"></div>
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-sz-blue/25 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-sz-purple/25 blur-2xl pointer-events-none"></div>
        <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-white/60 shadow-[0_0_7px_rgba(255,255,255,0.8)] pointer-events-none"></div>
        {/* Título */}
        <div className="relative z-10 flex items-center gap-2.5 border-b border-white/20 pb-2.5">
          <span className="w-9 h-9 shrink-0 rounded-full bg-sz-yellow/90 text-sz-dark border border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,
255,0.8),0_0_8px_rgba(255,190,11,0.35)] flex items-center justify-center">
            <i className="fas fa-share-alt text-base"></i>
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-sz-yellow tracking-wide drop-shadow-md">
              somzera.links
            </span>
            <span className="text-[9px] text-sz-blue uppercase tracking-widest">
              Compartilhe sua música
            </span>
          </div>
        </div>
      </div>
      {/* Descrição */}
      <p className="relative z-10 text-xs text-white/85 leading-relaxed">
        Compartilhe suas reviews em qualquer lugar da web com SomzeraLinks.
      </p>
      {/* Opções */}
      <ul className="relative z-10 text-[10px] text-white/65 flex flex-wrap gap-1.5">
        <li className="bg-sz-blue/20 border border-sz-blue/35 rounded-full px-2 py-1 flex items-center gap-1">
          <i className="fas fa-blog text-sz-blue"></i>
          Blogs
        </li>
        <li className="bg-sz-purple/25 border border-sz-purple/40 rounded-full px-2 py-1 flex items-center gap-1">
          <i className="fas fa-comments text-sz-purple"></i>
          Fóruns
        </li>
        <li className="bg-sz-light/20 border border-sz-light/35 rounded-full px-2 py-1 flex items-center gap-1">
          <i className="fas fa-comment-dots text-sz-light"></i>
          MSN
        </li>
      </ul>
      {/* Botão */}
      <button className="aero-header relative z-10 bg-sz-blue/80 hover:bg-sz-purple/80 text-white text-xs py-2.5 px-3 mt-1 rounded-md border bor
der-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_3px_7px_rgba(27,38,59,0.25)] transition-all duration-150 font-bold flex justify-between
 items-center group">
        <span className="flex items-center gap-2">
          <i className="fas fa-link text-sz-yellow drop-shadow-md"></i>
          Gerar Link
        </span>
        <i className="fas fa-arrow-right transition-transform duration-150 group-hover:translate-x-1"></i>
      </button>
    </div>
  );
}