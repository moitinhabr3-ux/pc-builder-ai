
export type Currency = 'BRL' | 'USD';

export type PerformanceFocus = 'quality' | 'performance' | 'balanced';

export interface PCComponent {
  category: string;
  name: string;
  price: number;
  link: string;
  description: string;
}

export interface PCBuild {
  components: PCComponent[];
  totalCost: number;
  currency: Currency;
  reasoning: string;
  targetGoal: string;
  recommendationType: 'Melhor Custo-Benefício' | 'Focado em Performance' | 'Rei do Orçamento' | 'Premium';
}

export interface BuildRequest {
  budget: number;
  currency: Currency;
  customGoal: string;
  includePeripherals: string[];
  focus: PerformanceFocus;
  aestheticPrefs: string;
}
