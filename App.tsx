
import React, { useState } from 'react';
import { PCBuild, BuildRequest } from './types';
import { ICONS } from './constants';
import { generatePCBuild } from './services/geminiService';
import BudgetForm from './components/BudgetForm';
import BuildDisplay from './components/BuildDisplay';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [build, setBuild] = useState<PCBuild | null>(null);

  const handleGenerateBuild = async (data: BuildRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generatePCBuild(data);
      setBuild(result);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Monte Seu PC dos Sonhos
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Diga seu orçamento e objetivo. Nossa IA cuida da compatibilidade, 
            preços de mercado e encontra as melhores peças para você.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 sticky top-8">
            <BudgetForm onSubmit={handleGenerateBuild} loading={loading} />
            
            {error && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 flex items-start gap-3">
                <div className="mt-1">⚠️</div>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full py-20 space-y-6">
                <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-emerald-400 animate-pulse">Analisando Mercado em Tempo Real...</h3>
                  <p className="text-slate-500 mt-1">Verificando compatibilidade e disponibilidade nas lojas</p>
                </div>
              </div>
            ) : build ? (
              <BuildDisplay build={build} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 bg-slate-800/20 border-2 border-dashed border-slate-700 rounded-3xl text-slate-500">
                <ICONS.Cpu className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">Nenhuma build gerada. Preencha o formulário para começar!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
