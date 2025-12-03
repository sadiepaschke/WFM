import { ConditionKey, Initiative, AnalysisResult } from "../types";
import { CONDITIONS } from "../constants";

/**
 * Generates specific initiative suggestions for WFM based on a condition.
 */
export const generateSuggestions = async (conditionKey: ConditionKey): Promise<string[]> => {
  // Return static suggestions based on condition
  const suggestions: Record<ConditionKey, string[]> = {
    policies: ["Gender equity legislation advocacy", "Equal pay policy development", "Women's health policy initiatives"],
    practices: ["Leadership development programs", "Grantmaking to women-led organizations", "Community partnership practices"],
    resources: ["Funding for women entrepreneurs", "Resource allocation for underserved communities", "Investment in women's education"],
    relationships: ["Coalition building across sectors", "Community stakeholder engagement", "Partnership with women's organizations"],
    power: ["Advocacy for women in leadership", "Power-sharing governance models", "Community organizing for systemic change"],
    mental: ["Challenging gender stereotypes", "Cultural narrative change campaigns", "Shifting mindsets on women's roles"]
  };

  return suggestions[conditionKey] || ["Add your own initiatives"];
};

/**
 * Analyzes the current map of initiatives to find gaps and provide a "score".
 */
export const analyzeSystemsMap = async (initiatives: Initiative[]): Promise<AnalysisResult> => {
  if (initiatives.length < 3) {
    return {
      score: 0,
      level: "Getting Started",
      gapAnalysis: "You need at least 3 initiatives to generate a meaningful analysis. Keep mapping your work across the six conditions!",
      recommendations: ["Add more initiatives across different conditions", "Focus on balancing explicit and implicit work", "Consider power dynamics and mental models"]
    };
  }

  // Count initiatives by level
  const explicit = initiatives.filter(i => ['policies', 'practices', 'resources'].includes(i.condition)).length;
  const semiExplicit = initiatives.filter(i => ['relationships', 'power'].includes(i.condition)).length;
  const implicit = initiatives.filter(i => i.condition === 'mental').length;

  const total = initiatives.length;
  const explicitPct = (explicit / total) * 100;
  const semiExplicitPct = (semiExplicit / total) * 100;
  const implicitPct = (implicit / total) * 100;

  // Calculate score based on balance
  const balance = Math.min(explicitPct, semiExplicitPct, implicitPct);
  const score = Math.round(30 + (balance * 2)); // 30-100 range

  // Determine level
  let level = "Surface Swimmer";
  if (implicitPct > 20 && semiExplicitPct > 20) {
    level = "System Changer";
  } else if (semiExplicitPct > 15 || implicitPct > 10) {
    level = "Deep Diver";
  }

  // Generate gap analysis
  const gaps = [];
  if (explicitPct < 30) gaps.push("structural policies and practices");
  if (semiExplicitPct < 25) gaps.push("relationships and power dynamics");
  if (implicitPct < 15) gaps.push("mental models and cultural narratives");

  const gapAnalysis = gaps.length > 0
    ? `Your portfolio shows ${total} initiatives. To achieve deeper systems change, consider strengthening work in: ${gaps.join(", ")}. ${level === "System Changer" ? "You're doing excellent work across all three levels!" : "Focus on balancing across all three levels for maximum impact."}`
    : `Excellent! Your ${total} initiatives show strong balance across explicit, semi-explicit, and implicit conditions. This comprehensive approach positions you well for deep systems change.`;

  // Generate recommendations
  const recommendations = [];
  if (implicit < 2) {
    recommendations.push("Add initiatives focused on shifting mental models and cultural narratives");
  }
  if (semiExplicit < 2) {
    recommendations.push("Invest in relationship building and addressing power dynamics");
  }
  if (explicit < 3) {
    recommendations.push("Strengthen structural work through policies, practices, and resource allocation");
  }
  if (recommendations.length === 0) {
    recommendations.push("Continue balanced work across all six conditions", "Document and share your systems change approach", "Build on existing strengths while maintaining balance");
  }

  return {
    score,
    level,
    gapAnalysis,
    recommendations: recommendations.slice(0, 3)
  };
};