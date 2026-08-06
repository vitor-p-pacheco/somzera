import React from 'react';

export default function Header() {
  return (
    <header className="bg-sz-dark text-sz-light h-16 flex items-center justify-between px-6 shadow-md border-b-4 border-sz-yellow relative z-20">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-inner border-sz-yellow overflow-auto">
          <img src="/logo.png" alt="Logo Somzera" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold tracking-widest text-sz-yellow italic">SOMZERA</h1>
        <span className="text-xs ml-2 text-sz-yellow align-bottom mt-2 font-bold bg-sz-blue px-1 rounded shadow-sm">
          SALVE BONECOS E BONECAS
        </span>
      </div>
    </header>
  );
}