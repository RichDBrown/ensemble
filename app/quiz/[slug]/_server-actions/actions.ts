"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateQuestions(title: string, description: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `title: ${title} 
    description: ${description}`,
    config: {
      systemInstruction: `You are an AI quiz generator. Given the title and description of a quiz, 
      generate at least 10 multiple-choice questions. Each question must include at least 2 options. 
      Each question must also include a correct answer field represented as the index number of the correct option 
      (starting at 0). Questions should be clear, factually accurate, and aligned with the provided title and description.

      Example:
      --input--
      title: Photosynthesis Fundamentals
      description: This quiz covers the basic concepts of photosynthesis, including light-dependent and 
      light-independent reactions, and the overall equation. This forms the foundation for understanding energy 
      in biological systems.

      --output--
      [
      {
      "question": "What is the primary purpose of photosynthesis?",
      "options": ["To convert light energy into chemical energy", "To break down glucose for energy"],
      "correct_answer": 0
      },
      {
      "question": "Where do the light-dependent reactions of photosynthesis occur?",
      "options": ["Stroma", "Thylakoid membranes"],
      "correct_answer": 1
      },
      {
      "question": "Which molecule produced in the light-dependent reactions acts as an energy carrier?",
      "options": ["ATP", "Lactic acid"],
      "correct_answer": 0
      },
      {
      "question": "Which gas is required for photosynthesis?",
      "options": ["Oxygen", "Carbon dioxide"],
      "correct_answer": 1
      },
      {
      "question": "What is the main product of the Calvin cycle?",
      "options": ["Glucose", "Oxygen"],
      "correct_answer": 0
      },
      {
      "question": "Which pigment is responsible for absorbing most of the light used in photosynthesis?",
      "options": ["Chlorophyll", "Melanin"],
      "correct_answer": 0
      },
      {
      "question": "What is released as a byproduct of the light-dependent reactions?",
      "options": ["Oxygen", "Carbon dioxide"],
      "correct_answer": 0
      },
      {
      "question": "Which equation represents the overall process of photosynthesis?",
      "options": ["CO₂ + H₂O → C₆H₁₂O₆ + O₂", "C₆H₁₂O₆ + O₂ → CO₂ + H₂O"],
      "correct_answer": 0
      },
      {
      "question": "Which factor does NOT affect the rate of photosynthesis?",
      "options": ["Light intensity", "Earth's rotation"],
      "correct_answer": 1
      },
      {
      "question": "Where is chlorophyll located inside the chloroplast?",
      "options": ["Thylakoid", "Mitochondrion"],
      "correct_answer": 0
      }
      ]`,
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: {
              type: "string",
            },
            options: {
              type: "array",
              items: {
                type: "string",
              },
            },
            correct_answer: {
              type: "number",
            },
          },
          required: ["question", "options", "correct_answer"],
          propertyOrdering: ["question", "options", "correct_answer"],
        },
      },
    },
  });
  return response.text;
}
