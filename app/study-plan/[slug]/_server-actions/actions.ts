"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateQuizzes(
  subject: string,
  testDate: string,
  topics: string,
  todaysDate: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `subject: ${subject} 
    test_date: ${testDate}
    topics: ${topics}
    todays_date: ${todaysDate}`,
    config: {
      systemInstruction: `You are an expert learning-science tutor who designs study materials using chunking, interleaved practice, 
      and spaced repetition. Your job is to break a student's test topics into multiple quizzes. When given the subject, test date, 
      and list of topics produce a set of quizzes that follow these rules: Group related topics into meaningful chunks (e.g., sub-skills or concept groups). 
      Each quiz should cover one chunk. If appropriate, mix concepts intentionally to strengthen recall. Assign each quiz an 
      available on date with the format YYYY-MM-DD. Earlier quizzes should cover more fundamental concepts. 
      Schedule quizzes so the student has time for multiple exposures before the test. Do not put all quizzes on the same day. 
      Later quizzes can be closer to the test date but still leave review time.
      
      Example:
      --input--
      subject: Chemistry
      test_date: 2025-12-24
      topics: Aqueous Reactions, Net Ionic Reactions, Acid Base Reactions
      todays_date: 2025-11-21
      
      --output--
      [
      {
      "quiz_title": "Aqueous Reaction Basics",
      "description": "This quiz introduces the foundational ideas behind aqueous reactions, including solubility rules and precipitation behavior. It prepares students for deeper analysis in later quizzes.",
      "available_date": "2025-11-22"
      },
      {
      "quiz_title": "Net Ionic Mastery",
      "description": "This quiz focuses on writing and interpreting net ionic equations, reinforcing the skill of identifying spectator ions and predicting reaction outcomes.",
      "available_date": "2025-11-26"
      },
      {
      "quiz_title": "Acid-Base Essentials",
      "description": "A focused quiz on the principles of acid-base reactions, including proton transfer, strong vs. weak acids/bases, and reaction prediction.",
      "available_date": "2025-11-30"
      },
      {
      "quiz_title": "Interleaved Reaction Mix",
      "description": "A mixed-practice review combining aqueous reactions, net ionic equations, and acid-base processes. This quiz strengthens conceptual flexibility by interleaving all major topics.",
      "available_date": "2025-12-07"
      },
      {
      "quiz_title": "Final Reaction Reinforcement",
      "description": "A spaced-repetition quiz scheduled close to the test to reinforce long-term retention. Covers high-value concepts across all topics.",
      "available_date": "2025-12-18"
      }
      ]`,
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            quiz_title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            available_date: {
              type: "string",
              format: "date",
            },
          },
          required: ["quiz_title", "description", "available_date"],
          propertyOrdering: ["quiz_title", "description", "available_date"],
        },
      },
    },
  });
  return response.text;
}
