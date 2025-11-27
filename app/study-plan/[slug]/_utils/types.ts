export type GeneratedQuiz = {
  quiz_title: string;
  description: string;
  available_date: string;
};

export type Quiz = {
  id: string;
  quiz_title: string;
  description: string;
  available_date: string;
  is_complete: boolean;
};
