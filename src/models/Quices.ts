export interface QuicesResponseModel {
  status: number;
  code: string;
  data: Quices[];
}

export interface Quices {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface QuizModel {
  status: number;
  code: string;
  data: { id: number };
}

export interface ExistsQuizModel {
  status: number;
  code: string;
  data: { exists: boolean };
}