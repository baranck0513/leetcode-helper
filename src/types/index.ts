export interface ProblemData {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
  timestamp: number;
}

export interface HintResponse {
  hint: string;
  level: 1 | 2 | 3;
  timestamp: number;
}

export interface StoredHintHistory {
  problemUrl: string;
  hints: HintResponse[];
  currentLevel: 1 | 2 | 3;
}

export enum MessageType {
  GET_PROBLEM = 'GET_PROBLEM'
}

export interface ChromeMessage {
  type: MessageType;
  payload?: any;
}