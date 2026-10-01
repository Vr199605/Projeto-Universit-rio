import React, { useState } from 'react';
import {
  ListFilter,
  Sparkles,
  Eye,
  EyeOff,
  Send,
  CheckSquare,
  Printer,
  GraduationCap
} from 'lucide-react';
import type { Discipline } from '../types';
import type { UniversityProfile } from '../types/university';
import { MathRenderer } from './MathRenderer';
import { LIST_GENERATOR_SUBJECTS } from '../data/mockData';

interface ListGeneratorTabProps {
  currentUniversity: UniversityProfile;
  onOpenUniversityModal: () => void;
  onSendToSolver: (text: string) => void;
}

interface GeneratedExercise {
  id: string;
  number: number;
  discipline: Discipline;
  topic: string;
  statement: string;
  solutionStep: string;
  finalAnswer: string;
  revealed: boolean;
}

export const ListGeneratorTab: React.FC<ListGeneratorTabProps> = ({
  currentUniversity,
  onOpenUniversityModal,
  onSendToSolver,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>('Cálculo II');
  const [selectedTopic, setSelectedTopic] = useState<string>('Teorema de Stokes & Gauss');
  const [difficulty, setDifficulty] = useState<string>(`Padrão ${currentUniversity.shortName}`);
  const [questionCount, setQuestionCount] = useState<number>(4);
  const [includeAnswerKey, setIncludeAnswerKey] = useState<boolean>(true);
  const [isDiscursive, setIsDiscursive] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // List starts clean and empty until the user requests generation
  const [exercises, setExercises] = useState<GeneratedExercise[]>([]);

  const toggleReveal = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, revealed: !ex.revealed } : ex))
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Generate dynamically tailored exercises based on discipline
      const generated: GeneratedExercise[] = Array.from({ length: questionCount }).map((_, i) => ({
        id: `gen-${Date.now()}-${i}`,
        number: i + 1,
        discipline: selectedDiscipline,
        topic: selectedTopic || 'Geral',
        statement: `Questão ${i + 1} (${difficulty}): Analise o sistema da disciplina ${selectedDiscipline}, considerando o tópico "${selectedTopic}". Calcule a grandeza solicitada e demonstre a conservação ou o valor extremo.`,
        solutionStep: `1. Identificação das condições de contorno e leis fundamentais de ${selectedDiscipline}.\n2. Substituição algébrica nos operadores correspondentes.\n3. Demonstração de convergência e cálculo exato.`,
        finalAnswer: `\\text{Resultado da Q}${i + 1}`,
        revealed: false,
      }));
      setExercises(generated);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* HEADER BANNER */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        {/* University Calibration Banner */}
        <div className="mb-4 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Lista Calibrada pela Banca: {currentUniversity.name}
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white">
                  {currentUniversity.rigorScore}% Rigor
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Questões geradas no padrão de cobrança da {currentUniversity.shortName} com gabarito passo a passo.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenUniversityModal}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0 cursor-pointer"
          >
            Trocar Faculdade →
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ListFilter className="w-5 h-5 text-blue-500" />
              Gerador de Listas e Simulados de Engenharia
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Monte listas personalizadas calibradas pela banca da {currentUniversity.shortName} ({currentUniversity.rigorCategory})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir Lista A4
            </button>
          </div>
        </div>

        {/* CONFIGURATION GRID */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Discipline Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Disciplina do Ciclo Básico:
            </label>
            <select
              value={selectedDiscipline}
              onChange={(e) => {
                const disc = e.target.value as Discipline;
                setSelectedDiscipline(disc);
                const topics = LIST_GENERATOR_SUBJECTS[disc] || [];
                if (topics.length > 0) setSelectedTopic(topics[0]);
              }}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(LIST_GENERATOR_SUBJECTS).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Tópico Específico:
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
            >
              {(LIST_GENERATOR_SUBJECTS[selectedDiscipline] || []).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Nível de Rigor / Dificuldade:
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
            >
              <option value={`Padrão ${currentUniversity.shortName}`}>
                ⭐ Padrão Oficial {currentUniversity.shortName} ({currentUniversity.rigorScore}%)
              </option>
              <option value="Fácil">Fácil (Fixação Direta de Fórmulas)</option>
              <option value="Médio">Médio (Padrão Semestral)</option>
              <option value="Prova UFRJ/USP/Unicamp">Prova UFRJ / USP / Unicamp</option>
              <option value="Desafio">Desafio Olímpico / ITA</option>
            </select>
          </div>

          {/* Quantity Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Quantidade de Questões:
              </label>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                {questionCount} questões
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={10}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>3</span>
              <span>5</span>
              <span>7</span>
              <span>10</span>
            </div>
          </div>
        </div>

        {/* Checkbox Options + Generate Button */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAnswerKey}
                onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Incluir Gabarito Detalhado</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isDiscursive}
                onChange={(e) => setIsDiscursive(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Modo Discursivo (com justificativa de passos)</span>
            </label>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Gerando Lista...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gerar Lista Customizada</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* EXERCISE LIST DISPLAY OR CLEAN EMPTY STATE */}
      {exercises.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Lista de Exercícios: <span className="font-semibold text-slate-900 dark:text-white">{selectedDiscipline}</span> — {selectedTopic} ({exercises.length} questões)
            </div>
            <button
              type="button"
              onClick={() => {
                const allRevealed = exercises.every((e) => e.revealed);
                setExercises((prev) => prev.map((e) => ({ ...e, revealed: !allRevealed })));
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
            >
              {exercises.every((e) => e.revealed) ? 'Ocultar Todos os Gabaritos' : 'Revelar Todos os Gabaritos'}
            </button>
          </div>

          {exercises.map((ex) => (
            <div
              key={ex.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4"
            >
              {/* Header: Number + Tags + Solver Button */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs flex items-center justify-center">
                    #{ex.number}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {ex.discipline} • {ex.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Send to Solver */}
                  <button
                    type="button"
                    onClick={() => onSendToSolver(ex.statement)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200/80 dark:border-blue-800/80 transition cursor-pointer"
                    title="Abrir e resolver detalhadamente no Solucionador Passo a Passo"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Resolver no Solucionador</span>
                  </button>

                  {/* Toggle Gabarito */}
                  <button
                    type="button"
                    onClick={() => toggleReveal(ex.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                      ex.revealed
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {ex.revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{ex.revealed ? 'Ocultar Resposta' : 'Revelar Gabarito'}</span>
                  </button>
                </div>
              </div>

              {/* Enunciado */}
              <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
                <MathRenderer content={ex.statement} />
              </div>

              {/* Revealed Solution Box */}
              {ex.revealed && (
                <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-3">
                  <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5" />
                    Gabarito e Passos Essenciais:
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                    <MathRenderer content={ex.solutionStep} />
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">Resposta Final:</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-900 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                      <MathRenderer content={`$${ex.finalAnswer}$`} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 p-8 sm:p-12 text-center">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <ListFilter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Nenhuma Lista Gerada no Momento
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Configure a disciplina, o tópico e a quantidade de questões acima e clique em <strong>"Gerar Lista Customizada"</strong> para que a IA monte exercícios inéditos calibrados para a banca da {currentUniversity.shortName} ({currentUniversity.rigorScore}% de Rigor).
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gerar Lista Agora</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
