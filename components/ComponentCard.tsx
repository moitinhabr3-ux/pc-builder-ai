
import React from 'react';
import { PCComponent, Currency } from '../types';
import { ICONS } from '../constants';

interface ComponentCardProps {
  component: PCComponent;
  currency: Currency;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component, currency }) => {
  const formatter = new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: currency,
  });

  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('cpu') && !c.includes('cooler')) return <ICONS.Cpu className="w-5 h-5" />;
    if (c.includes('gpu') || c.includes('vídeo') || c.includes('video')) return <ICONS.Gpu className="w-5 h-5" />;
    if (c.includes('ram') || c.includes('memória')) return <ICONS.Memory className="w-5 h-5" />;
    if (c.includes('monitor')) return <ICONS.Monitor className="w-5 h-5" />;
    return <ICONS.Cpu className="w-5 h-5 opacity-50" />;
  };

  return (
    <div className="group bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 hover:bg-slate-800/50 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-900 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">
              {getCategoryIcon(component.category)}
            </div>
            <span className="text-[9px] uppercase tracking-tighter font-black text-slate-500">
              {component.category}
            </span>
          </div>
          <div className="text-lg font-bold text-white">
            {formatter.format(component.price)}
          </div>
        </div>
        
        <h4 className="font-bold text-slate-100 mb-2 leading-tight group-hover:text-emerald-400 transition-colors">
          {component.name}
        </h4>
        <p className="text-xs text-slate-400 mb-4 line-clamp-3 leading-relaxed">
          {component.description}
        </p>
      </div>

      <a
        href={component.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-all group/btn"
      >
        Ver na Loja
        <ICONS.ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
};

export default ComponentCard;
