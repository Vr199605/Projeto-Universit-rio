export type RigorCategory = 
  | 'Extremo / Nível Olímpico' 
  | 'Muito Alto (Padrão USP/Unicamp/UFRJ)' 
  | 'Alto (Padrão Federal)' 
  | 'Médio-Alto (Excelência Privada)' 
  | 'Didático / Aplicado';

export interface UniversityProfile {
  id: string;
  name: string;
  shortName: string;
  state: string;
  type: 'Federal' | 'Estadual' | 'Militar' | 'Privada' | 'Personalizada';
  rigorScore: number; // 0 to 100
  rigorCategory: RigorCategory;
  examStyle: string; // Description of exams
  examDurationMinutes: number; // Standard exam duration
  allowFormulaSheet: boolean;
  typicalTopicsWeight: { [key: string]: number }; // percentage weight
  strategicAdvice: string; // Specific advice for passing in this institution
  aiPromptDirective: string; // Instructions for AI solving style
}
