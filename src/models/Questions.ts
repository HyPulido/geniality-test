export interface QuestionsResponseModel {
  status: number;
  code: string;
  data: Questions[];
}

export interface Questions {
  id: number;
  question: string;
  created_at: string;
  updated_at: string;
}