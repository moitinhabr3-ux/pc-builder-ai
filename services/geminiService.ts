
import { GoogleGenAI, Type } from "@google/genai";
import { BuildRequest, PCBuild } from "../types";

export const generatePCBuild = async (request: BuildRequest): Promise<PCBuild> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    Você é um arquiteto de hardware de PC especialista. Sua tarefa é gerar um build de PC completo e compatível.
    
    REGRAS CRÍTICAS:
    1. ORÇAMENTO RIGOROSO: O custo total NÃO DEVE exceder ${request.budget} ${request.currency}. Isso inclui todos os componentes e periféricos solicitados.
    2. IDIOMA: Responda inteiramente em PORTUGUÊS (Brasil).
    3. COMPATIBILIDADE: Garanta que todas as peças sejam compatíveis (Socket, RAM, TDP, Fonte, Espaço no Gabinete).
    4. PESQUISA REAL: Use a ferramenta Google Search para verificar preços atuais no mercado ${request.currency === 'BRL' ? 'Brasileiro (Kabum, Pichau, Terabyte, Amazon BR)' : 'Americano (Amazon, Newegg)'}.
    5. PERIFÉRICOS: Se solicitado, inclua Monitor, Mouse, Teclado ou Headset dentro do orçamento.
    6. FOCO DE DESEMPENHO: Se o foco for 'performance', priorize CPU/GPU mais fortes. Se for 'quality', priorize estética, marcas premium e resoluções maiores.
    7. LINKS: Forneça links reais de lojas para cada componente.
    
    FORMATO DE SAÍDA: JSON válido conforme o schema solicitado.
  `;

  const prompt = `Monte um PC com estas especificações:
    - Orçamento: ${request.budget} ${request.currency}
    - Objetivo: ${request.customGoal}
    - Incluir Periféricos: ${request.includePeripherals.join(', ')}
    - Foco: ${request.focus === 'performance' ? 'Desempenho (FPS)' : request.focus === 'quality' ? 'Qualidade Visual/Premium' : 'Equilíbrio'}
    - Preferências Estéticas: ${request.aestheticPrefs}
    - Moeda: ${request.currency}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            components: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  name: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                  link: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["category", "name", "price", "link", "description"]
              }
            },
            totalCost: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            recommendationType: { type: Type.STRING },
          },
          required: ["components", "totalCost", "reasoning", "recommendationType"]
        }
      }
    });

    const buildData = JSON.parse(response.text || '{}');
    
    return {
      ...buildData,
      currency: request.currency,
      targetGoal: request.customGoal,
    };
  } catch (error) {
    console.error("Erro ao gerar build:", error);
    throw new Error("Não foi possível gerar a build agora. Verifique sua conexão ou tente novamente.");
  }
};
