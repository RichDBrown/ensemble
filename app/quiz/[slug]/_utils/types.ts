export type GeneratedQuestion = {
  question: string;
  options: string[];
  correct_answer: number;
};

export type Question = {
  question: string;
  options: string[];
  correct_answer: number;
  answeredCorrectly: boolean;
};
