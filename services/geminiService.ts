import { GoogleGenAI, Type } from "@google/genai";
import { ConditionKey, Initiative, AnalysisResult } from "../types";
import { CONDITIONS } from "../constants";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash";

/**
 * Generates specific initiative suggestions for WFM based on a condition.
 */
export const generateSuggestions = async (conditionKey: ConditionKey): Promise<string[]> => {
  const condition = CONDITIONS[conditionKey];
  
  const prompt = `
    You are an expert in social systems change and the Women's Foundation of Minnesota (WFM).
    
    The user is mapping WFM's work using the "Six Conditions of Systems Change" framework.
    Please generate 3 specific, realistic, and distinct examples of initiatives or strategies WFM might undertake (or has undertaken) that fall under the category of **${condition.label}**.
    
    Context for ${condition.label}: ${condition.description}
    
    Focus on themes like gender equity, economic justice, safety, and leadership.
    Keep descriptions concise (under 15 words).
    Return the response as a JSON array of strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return ["Grantmaking for women-led businesses", "Lobbying for equal pay legislation", "Research report on the status of women"];
  }
};

/**
 * Analyzes the current map of initiatives to find gaps and provide a "score".
 */
export const analyzeSystemsMap = async (initiatives: Initiative[]): Promise<AnalysisResult> => {
  const initiativesList = initiatives.map(i => `- [${CONDITIONS[i.condition].label}]: ${i.text}`).join('\n');
  
  const prompt = `
    Analyze the following list of initiatives mapped to the "Six Conditions of Systems Change" for the Women's Foundation of Minnesota.
    
    Initiatives:
    ${initiativesList}
    
    Your task:
    1. Determine a "Systems Change Readiness Score" (0-100) based on how balanced the portfolio is across Explicit, Semi-Explicit, and Implicit levels.
    2. Assign a "Level" title: "Surface Swimmer" (mostly explicit), "Deep Diver" (mixed), or "System Changer" (balanced across all 3).
    3. Write a short "Gap Analysis" paragraph explaining what is missing or well-covered.
    4. Provide 3 specific recommendations for the next strategic steps to deepen impact.

    Return valid JSON matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            level: { type: Type.STRING },
            gapAnalysis: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "level", "gapAnalysis", "recommendations"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing map:", error);
    return {
      score: 0,
      level: "Unknown",
      gapAnalysis: "Unable to analyze at this time. Please ensure you have added initiatives.",
      recommendations: ["Add more initiatives to get a proper analysis."]
    };
  }
};