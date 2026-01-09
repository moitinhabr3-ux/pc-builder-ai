
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">PC Master AI</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Seu parceiro inteligente para montar o PC perfeito. 
              Usamos IA avançada para simplificar o complexo mundo do hardware.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Guia de Componentes</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ de Compatibilidade</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Benchmarks de GPU</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Recursos</h4>
            <p className="text-slate-400 text-sm mb-4">
              Montando um PC pela primeira vez? Veja nosso guia para iniciantes.
            </p>
            <button className="text-emerald-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
              Ler Guia <span>&rarr;</span>
            </button>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} PC Master AI. Desenvolvido com Gemini 3 Flash.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacidade</a>
            <a href="#" className="hover:text-slate-300">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
