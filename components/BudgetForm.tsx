
import React, { useState } from 'react';
import { Currency, PerformanceFocus, BuildRequest } from '../types';
import { ICONS } from '../constants';

interface BudgetFormProps {
  onSubmit: (data: BuildRequest) => void;
  loading: boolean;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit, loading }) => {
  const [budget, setBudget] = useState<string>('5000');
  const [currency, setCurrency] = useState<Currency>('BRL');
  const [customGoal, setCustomGoal] = useState<string>('Jogar jogos atuais em 1080p no alto');
  const [focus, setFocus] = useState<PerformanceFocus>('balanced');
  const [aestheticPrefs, setAestheticPrefs] = useState<string>('Gabinete com fans inclusas');
  const [peripherals, setPeripherals] = useState<string[]>([]);

  const peripheralOptions = [
    { id: 'monitor', label: 'Monitor' },
    { id: 'teclado', label: 'Teclado' },
    { id: 'mouse', label: 'Mouse' },
    { id: 'headset', label: 'Headset' },
  ];

  const handlePeripheralToggle = (id: string) => {
    setPeripherals(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericBudget = parseFloat(budget);
    if (isNaN(numericBudget) || numericBudget <= 0) return;
    onSubmit({ 
      budget: numericBudget, 
      currency, 
      customGoal, 
      focus, 
      includePeripherals: peripherals,
      aestheticPrefs
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-6">
      <div className="space-y-4">
        <label className="block">
          <span className="text-slate-300 text-sm font-semibold mb-2 block uppercase tracking-wider">Orçamento Máximo</span>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-slate-500 font-bold">{currency === 'BRL' ? 'R$' : '$'}</span>
              </div>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-xl font-bold focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                required
              />
            </div>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 font-bold text-sm outline-none"
            >
              <option value="BRL">BRL</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-slate-300 text-sm font-semibold uppercase tracking-wider">O que você quer fazer?</label>
        <textarea
          value={customGoal}
          onChange={(e) => setCustomGoal(e.target.value)}
          placeholder="Ex: Jogar Warzone a 144fps, Editar vídeos 4K, Trabalho de escritório..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm min-h-[80px] focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-300 text-sm font-semibold uppercase tracking-wider">Foco da Build</label>
        <div className="grid grid-cols-3 gap-2">
          {(['performance', 'balanced', 'quality'] as PerformanceFocus[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFocus(f)}
              className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-all ${
                focus === f 
                  ? 'bg-emerald-600 border-emerald-500 text-white' 
                  : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'
              }`}
            >
              {f === 'performance' ? 'DESEMPENHO' : f === 'quality' ? 'QUALIDADE' : 'EQUILÍBRIO'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-slate-300 text-sm font-semibold uppercase tracking-wider">Incluir Periféricos?</label>
        <div className="grid grid-cols-2 gap-2">
          {peripheralOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handlePeripheralToggle(opt.id)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                peripherals.includes(opt.id)
                  ? 'bg-cyan-600/20 border-cyan-500 text-cyan-100'
                  : 'bg-slate-900 border-slate-700 text-slate-500'
              }`}
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${peripherals.includes(opt.id) ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'}`}>
                {peripherals.includes(opt.id) && <ICONS.Check className="w-3 h-3 text-white" />}
              </div>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-slate-300 text-sm font-semibold uppercase tracking-wider">Preferências Extras</label>
        <input
          type="text"
          value={aestheticPrefs}
          onChange={(e) => setAestheticPrefs(e.target.value)}
          placeholder="Ex: Muito RGB, Branco, Silencioso..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Montar PC Agora'}
      </button>
    </form>
  );
};

export default BudgetForm;
