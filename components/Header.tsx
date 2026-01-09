
import React from 'react';
import { ICONS } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
            <ICONS.Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            PC MASTER AI
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">Preços</a>
          <a href="#" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">Hardware News</a>
          <a href="#" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105">
            Compartilhar Build
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
