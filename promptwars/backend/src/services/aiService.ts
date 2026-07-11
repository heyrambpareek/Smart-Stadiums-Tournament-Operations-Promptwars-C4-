// @ts-nocheck
import OpenAI from 'openai';
import { getLiveData } from './simulationService';

let openai: OpenAI | null = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
} catch (e) {
  console.warn("OpenAI API key not configured or invalid.");
}

export const generateAssistantResponse = async (message: string) => {
  const data = getLiveData();
  const context = `You are the StadiumMind AI Assistant for the FIFA World Cup 2026.
Current stadium status:
- Crowd Density: ${data.crowdDensity.toFixed(1)}%
- Gate A Wait: ${data.queues.gateA} mins, Gate B Wait: ${data.queues.gateB} mins, Gate C Wait: ${data.queues.gateC} mins.
- Active Emergencies: ${data.activeEmergencies}
- Traffic: ${data.traffic}
Help the fan with their inquiry politely and concisely.

User says: "${message}"`;

  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: context }],
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error);
    }
  }

  // Mock Fallback
  return generateMockAssistantResponse(message, data);
};

export const generateOperationalSummary = async () => {
  const data = getLiveData();
  const context = `You are the StadiumMind AI Decision Engine for the FIFA World Cup 2026.
Analyze the following live data and provide 3-5 operational recommendations for the stadium organizers.
Data: ${JSON.stringify(data)}
Keep recommendations brief and actionable, like "Gate B is expected to become overcrowded within 12 minutes."`;

  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: context }],
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error);
    }
  }

  // Mock Fallback
  return generateMockOperationalSummary(data);
};

function generateMockAssistantResponse(message: string, data: any) {
  const m = message.toLowerCase();
  if (m.includes("gate")) return `Gate C currently has a ${data.queues.gateC} minute wait. Gate B is faster at ${data.queues.gateB} minutes.`;
  if (m.includes("restroom")) return `The North Restroom has the shortest queue right now (${data.queues.restroomNorth} minutes).`;
  if (m.includes("food") || m.includes("vegetarian")) return "Food Court 1 has great vegetarian options and an estimated wait of 8 minutes. Shall I guide you there?";
  if (m.includes("child") || m.includes("lost")) return "I am alerting the nearest volunteer immediately. Please stay where you are and look for staff in yellow vests.";
  if (m.includes("impaired") || m.includes("wheelchair")) return "I have enabled accessibility mode. I will prioritize routes with ramps and elevators.";
  if (m.includes("exit")) return "Based on current crowd flow, Gate A is the fastest exit route from your location.";
  return "I'm your StadiumMind AI assistant! How can I help you enjoy the match today?";
}

function generateMockOperationalSummary(data: any) {
  const recommendations = [];
  if (data.queues.gateC > 15) recommendations.push("Redirect 20% of spectators toward Gate B to ease Gate C congestion.");
  if (data.crowdDensity > 70) recommendations.push("Deploy 5 additional volunteers near Section 112.");
  if (data.traffic === 'Heavy') recommendations.push("Increase shuttle buses after the match to alleviate heavy traffic.");
  if (data.queues.foodCourt1 > 10) recommendations.push("Consider opening Food Court 3 to reduce wait times.");
  
  if (recommendations.length === 0) {
    recommendations.push("Operations are running smoothly. No immediate action required.");
    recommendations.push("Continue monitoring Gate A for potential influx.");
  }
  
  return recommendations.map(r => `• ${r}`).join('\\n');
}
