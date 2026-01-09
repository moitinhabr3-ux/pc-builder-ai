
import React from 'react';
import { PCBuild } from '../types';
import { ICONS } from '../constants';
import ComponentCard from './ComponentCard';

interface BuildDisplayProps {
  build: PCBuild;
}

const BuildDisplay: React.FC<BuildDisplayProps> = ({ build }) => {
  const formatter = new Intl.NumberFormat(build.currency === 'BRL' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: build.currency,
  });

  const getBadgeStyles = () => {
    const type = build.recommendationType.toLowerCase();
    if (type.includes('custo')) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
    if (type.includes('performance') || type.includes('premium')) return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
    return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-800/50 rounded-3xl p-6 md:p-8 border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ICONS.Cpu className="w-40 h-40" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${getBadgeStyles()}`}>
              {build.recommendationType}
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold border border-slate-600 bg-slate-700/50 text-slate-300 flex items-center gap-1 uppercase">
              <ICONS.Check className="w-3 h-3 text-emerald-400" /> 100% Compatível
            </span>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Configuração Ideal para Seu Objetivo</h2>
          <p className="text-slate-400 leading-relaxed max-w-2xl mb-6 italic">
            "{build.reasoning}"
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-slate-900/80 rounded-2xl border border-slate-700/50 shadow-inner">
            <div className="flex-1">
              <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Investimento Total</span>
              <div className="text-4xl font-extrabold text-white">
                {formatter.format(build.totalCost)}
              </div>
            </div>
            <div className="h-px md:h-12 w-full md:w-px bg-slate-800"></div>
            <div className="flex-1">
              <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Total de Itens</span>
              <div className="text-4xl font-extrabold text-emerald-500">{build.components.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {build.components.map((component, idx) => (
          <ComponentCard key={idx} component={component} currency={build.currency} />
        ))}
      </div>
      
      <div className="bg-amber-900/10 border border-amber-900/30 p-4 rounded-xl flex gap-3 items-start">
        <div className="text-amber-500 mt-0.5">💡</div>
        <p className="text-xs text-amber-200/70">
          Os preços são estimativas em tempo real. A disponibilidade pode variar por região e estoque das lojas. 
          Sempre verifique o valor do frete e a versão da BIOS da placa-mãe para CPUs muito recentes.
        </p>
      </div>
    </div>
  );
};

export default BuildDisplay;
