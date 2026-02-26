import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getFlowBotResponse(prompt: string, context: any) {
  const model = "gemini-3-flash-preview";
  const systemInstruction = `
    You are FlowBot, a smart financial advisor for the "Cash Flow" platform.
    Your goal is to help users manage their money, prevent overspending, and forecast future outcomes.
    
    User Context:
    - Role: ${context.role}
    - Total Income: ${context.totalIncome}
    - Total Expenses: ${context.totalExpenses}
    - Recent Transactions: ${JSON.stringify(context.recentTransactions)}
    
    Provide actionable, professional, and encouraging advice. Use markdown for formatting.
    If the user asks about business, provide scaling and profit margin insights.
    If the user is a student, focus on saving and education costs.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction },
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm sorry, I'm having trouble analyzing your data right now. Please try again later.";
  }
}
