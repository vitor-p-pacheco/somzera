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
    <div className="w-full md:w-1/3 p-4 flex flex-col gap-6 bg-gray-200 shadow-[inset_2px_0_5px_rgba(0,0,0,0.05)] border-l border-white">
      <div className="bg-white w-full border-2 border-dotted border-sz-light shadow-sm rounded-md overflow-hidden">
        <div className="bg-gradient-to-r from-sz-blue to-sz-purple text-white text-xs font-bold p-2 border-b border-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
          Browse Genres
        </div>
        <ul className="text-xs p-2 flex flex-col gap-1 text-sz-dark bg-white bg-opacity-70">
          {genres.map((genre, index) => (
            <li 
              key={index}
              className="hover:bg-sz-yellow hover:text-sz-dark p-1.5 rounded cursor-pointer flex items-center gap-2 transition-colors border-b border-gray-100"
            >
              <i className={`fas ${genre.icon} ${genre.color}`}></i> {genre.name}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-sz-dark text-sz-light p-4 rounded-md border-2 border-sz-yellow shadow-lg flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-glass-gradient opacity-20"></div>
        <div className="relative z-10 flex items-center gap-2 mb-1 border-b border-gray-600 pb-2">
          <i className="fas fa-share-alt text-sz-yellow drop-shadow-md text-lg"></i>
          <span className="font-bold text-sm text-sz-yellow">somzera.links</span>
        </div>
        <p className="relative z-10 text-xs text-gray-200 mt-1">Compartilhe suas reviews em qualquer lugar da web com SomzeraLinks.</p>
        <ul className="relative z-10 text-[10px] text-gray-400 mt-1 list-disc pl-4">
          <li>Blogs</li>
          <li>Fóruns VBulletin</li>
          <li>MSN Messenger</li>
        </ul>
        <button className="relative z-10 bg-sz-blue hover:bg-sz-purple text-white text-xs py-2 px-2 mt-2 rounded border border-sz-light shadow-sm transition-colors font-bold flex justify-between items-center">
          Gerar Link <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}