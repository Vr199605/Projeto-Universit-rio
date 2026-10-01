export type Discipline = 
  | 'Cálculo I'
  | 'Cálculo II'
  | 'Cálculo III'
  | 'Cálculo IV'
  | 'Física I'
  | 'Física II'
  | 'Física III'
  | 'Álgebra Linear'
  | 'Química Geral'
  | 'Mecânica dos Sólidos';

export type DetailMode = 'didatico' | 'rapido' | 'conceitual' | 'prova';

export interface StepItem {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  badge?: string;
  content: string; // KaTeX + text
  diagramSvg?: string; // Optional SVG code or type
  notes?: string;
  keyConcept?: string;
  isCollapsible?: boolean;
}

export interface ProblemSolution {
  id: string;
  title: string;
  originalText: string;
  discipline: Discipline | string;
  topic: string;
  difficulty?: 'Fácil' | 'Média' | 'Difícil' | 'Desafio';
  difficultyTag?: string; // e.g., "P3 Politécnica / UFRJ"
  estimatedTime?: string;
  detailMode: DetailMode;
  prerequisites?: string[];
  steps: StepItem[];
  finalResult: {
    value?: string;
    unit?: string;
    latexDisplay: string;
    summaryText?: string;
    insight?: string;
    conceptualMeaning?: string;
  };
  similarQuestionPrompt?: string;
  commonTraps?: string[];
  similarQuestionsAvailable?: boolean;
}

export interface ExamQuestion {
  id: string;
  number: number;
  discipline: Discipline;
  topic: string;
  difficulty: string;
  statement: string;
  type: 'discursiva' | 'multipla_escolha';
  options?: { id: string; text: string; isCorrect: boolean }[];
  modelAnswer: string;
  scoringGuide: string;
  userAnswer?: string;
  userPhotoUrl?: string;
  flaggedForReview?: boolean;
  scoreAwarded?: number;
  feedback?: string;
}

export interface ExamSession {
  id: string;
  title: string;
  totalTimeSeconds: number;
  timeRemainingSeconds: number;
  isFinished: boolean;
  questions: ExamQuestion[];
  score?: number;
  maxScore: number;
  aiDiagnostic?: {
    strengths: string[];
    weaknesses: string[];
    algebraicErrors: string[];
    conceptualGaps: string[];
    recommendation: string;
  };
}

export interface ErrorNotebookItem {
  id: string;
  problemTitle: string;
  discipline: Discipline;
  topic: string;
  dateAdded: string;
  errorTag: 'Erro de Sinal' | 'Esqueceu Jacobiano' | 'Vetor Normal Invertido' | 'Falta de Hipótese' | 'Derivada Implícita' | 'Cálculo de Limite';
  statement: string;
  myMistakeNotes: string;
  correctKeyStep: string;
  masteryStatus: 'Precisa Praticar' | 'Em Revisão' | 'Dominado';
}
