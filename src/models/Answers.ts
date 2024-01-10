export interface AnswerModel {
  status: number;
  code: string;
  data: [number]
}

export interface AnswersGetModel {
  status: number;
  code: string;
  data: AnswersGetDataModel;
}

export interface AnswersGetDataModel {
  total_points: number;
  correct_answers: number;
  wrong_answers: number;
  answers: Answers[];
}

export interface Answers {
  id: number;
  answer: number;
  question_id: number;
  question: string;
  correct_answer: number;
  quiz_id: number;
  user_id: number;
  points: number;
}

