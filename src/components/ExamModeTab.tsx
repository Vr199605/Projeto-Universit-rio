import React, { useState, useEffect } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Upload,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft,
  FileImage,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_EXAM_QUESTIONS } from '../data/mockData';
import type { ExamQuestion } from '../types';
import type { UniversityProfile } from '../types/university';
import { MathRenderer } from './MathRenderer';

interface ExamModeTabProps {
  currentUniversity: UniversityProfile;
  onOpenUniversityModal: () => void;
  onAddErrorsFromExam?: (questions: ExamQuestion[]) => void;
  onSendToSolver?: (statement: string) => void;
}

export const ExamModeTab: React.FC<ExamModeTabProps> = ({
  currentUniversity,
  onOpenUniversityModal,
  onSendToSolver,
}) => {
  // Timer state based on active university's exam duration
  const TOTAL_SECONDS = (currentUniversity.examDurationMinutes || 90) * 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isExamFinished, setIsExamFinished] = useState<boolean>(false);

  // Questions and responses state
  const questions = MOCK_EXAM_QUESTIONS;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [id: string]: string }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [id: string]: boolean }>({});
  const [uploadedPhotos, setUploadedPhotos] = useState<{ [id: string]: string }>({});

  // Finalize exam and generate AI correction
  const handleFinishExam = () => {
    setIsRunning(false);
    setIsExamFinished(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if canvas not available
    }
  };

  // Countdown effect
  useEffect(() => {
    if (!isRunning || isExamFinished) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isExamFinished]);

  // Format seconds into HH:MM:SS
  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k] && userAnswers[k].trim().length > 0
  ).length;

  const currentQuestion = questions[currentQuestionIndex];


  const handleRestartExam = () => {
    setIsExamFinished(false);
    setSecondsLeft(TOTAL_SECONDS);
    setIsRunning(true);
    setCurrentQuestionIndex(0);
  };

  const handleMockUploadPhoto = (qId: string) => {
    setUploadedPhotos((prev) => ({
      ...prev,
      [qId]: 'resolucao_manuscrita_folha1.jpg (Verificado via OCR)',
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* EXAM STATUS & COUNTDOWN BAR */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Simulado Oficial: Padrão {currentUniversity.shortName}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  {currentUniversity.rigorScore}% Rigor ({currentUniversity.rigorCategory})
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-semibold">
                  Modo Prova Ativo
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Critério de correção alinhado à banca da {currentUniversity.name} • Duração oficial: {currentUniversity.examDurationMinutes} min • Formulário: {currentUniversity.allowFormulaSheet ? 'Permitido' : 'Proibido'}
              </p>
            </div>
          </div>

          {/* Countdown Display & Controls */}
          <div className="flex items-center gap-3 self-start md:self-center flex-wrap">
            <button
              type="button"
              onClick={onOpenUniversityModal}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition cursor-pointer"
            >
              Trocar Banca ({currentUniversity.shortName})
            </button>

            <div
              className={`px-4 py-2 rounded-xl font-mono text-lg sm:text-xl font-bold border flex items-center gap-2 ${
                secondsLeft < 600
                  ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/60 dark:border-rose-800 dark:text-rose-300 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
              }`}
            >
              <Timer className="w-4 h-4 text-rose-500" />
              <span>{formatTime(secondsLeft)}</span>
            </div>

            {!isExamFinished && (
              <button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                title={isRunning ? 'Pausar simulado' : 'Continuar simulado'}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            )}

            {!isExamFinished ? (
              <button
                type="button"
                onClick={handleFinishExam}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition cursor-pointer"
              >
                Finalizar e Corrigir Prova
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRestartExam}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar Simulado
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1.5">
            <span>
              Progresso: {answeredCount} de {questions.length} questões respondidas
            </span>
            <span>{Math.round((answeredCount / questions.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* IF EXAM IS FINISHED: DISPLAY AI CORRECTION REPORT */}
      {isExamFinished ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-medium">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Simulado Concluído e Corrigido por IA
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Desempenho Estimado: 8.5 / 10.0
                </h2>
                <p className="text-sm text-slate-300 max-w-xl">
                  Parabéns! Você demonstrou forte domínio dos teoremas de campo e conservação mecânica. Identificamos 1 ponto crítico de revisão em Álgebra Linear.
                </p>
              </div>

              {/* Score Breakdown pill */}
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[180px]">
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                  85%
                </div>
                <div className="text-xs text-slate-300 mt-1">Aproveitamento Global</div>
                <div className="text-[11px] font-mono text-emerald-300 mt-0.5 font-semibold">
                  Aprovado com folga
                </div>
              </div>
            </div>

            {/* Diagnostic Report Cards */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/40 border border-white/10 space-y-1">
                <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Pontos Fortes
                </div>
                <p className="text-xs text-slate-300">
                  Uso perfeito do Teorema de Gauss (Q1) e conservação conjugada de energia e momento linear (Q2).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-white/10 space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Gargalo Conceitual na Banca
                </div>
                <p className="text-xs text-slate-300">
                  Na Q3, a banca da {currentUniversity.shortName} exigiria a ortogonalidade da base antes da resposta final.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-white/10 space-y-1">
                <div className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Dica de Prova ({currentUniversity.shortName})
                </div>
                <p className="text-xs text-slate-300">
                  {currentUniversity.strategicAdvice}
                </p>
              </div>
            </div>
          </div>

          {/* Model Answers Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Gabarito Comparativo Questão a Questão:
            </h3>

            {questions.map((q) => (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Questão {q.number}: {q.discipline} — {q.topic}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSendToSolver && onSendToSolver(q.statement)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Ver Demonstração Completa no Solucionador →
                  </button>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <MathRenderer content={q.statement} />
                </div>

                {/* User answer vs model */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] font-mono font-semibold text-slate-500 block mb-1">
                      Sua Resposta Submetida:
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-mono whitespace-pre-line">
                      {userAnswers[q.id] || '(Nenhuma resposta redigida)'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60">
                    <span className="text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                      Gabarito Oficial Esperado:
                    </span>
                    <div className="text-xs text-slate-800 dark:text-slate-200">
                      <MathRenderer content={q.modelAnswer} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ACTIVE EXAM INTERACTION INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Navigator Sidebar (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                Navegação da Prova
              </h3>

              <div className="grid grid-cols-4 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = currentQuestionIndex === idx;
                  const isAnswered = !!userAnswers[q.id]?.trim();
                  const isFlagged = !!flaggedQuestions[q.id];

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`relative p-2.5 rounded-xl font-mono text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-600 text-white ring-2 ring-blue-500/50'
                          : isAnswered
                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <span>Q{q.number}</span>
                      {isFlagged && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-emerald-500"></span>
                  <span>Respondida</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-amber-500"></span>
                  <span>Marcada para revisar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-700"></span>
                  <span>Em branco</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Question Workspace (9 cols) */}
          <div className="lg:col-span-9 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
                    Questão {currentQuestion.number} de {questions.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {currentQuestion.discipline} • {currentQuestion.topic}
                  </span>
                </div>

                {/* Flag toggle */}
                <button
                  type="button"
                  onClick={() =>
                    setFlaggedQuestions((prev) => ({
                      ...prev,
                      [currentQuestion.id]: !prev[currentQuestion.id],
                    }))
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                    flaggedQuestions[currentQuestion.id]
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {flaggedQuestions[currentQuestion.id]
                      ? 'Marcada para Revisar'
                      : 'Marcar para Revisar'}
                  </span>
                </button>
              </div>

              {/* Statement */}
              <div className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-sans py-2">
                <MathRenderer content={currentQuestion.statement} />
              </div>

              {/* Student Drafting Area */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Sua Resolução / Rascunho de Cálculos:
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Suporta LaTeX e texto livre
                  </span>
                </div>

                <textarea
                  rows={6}
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value,
                    }))
                  }
                  placeholder="Escreva aqui os passos da sua resolução, equações utilizadas e conclusão final..."
                  className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Photo Upload Simulation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileImage className="w-4 h-4 text-blue-500" />
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                      Prefere resolver no papel?
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Tire uma foto e anexe aqui para correção por visão computacional
                    </span>
                  </div>
                </div>

                {uploadedPhotos[currentQuestion.id] ? (
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ {uploadedPhotos[currentQuestion.id]}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMockUploadPhoto(currentQuestion.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Anexar Foto da Resolução</span>
                  </button>
                )}
              </div>

              {/* Prev / Next Question Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>

                <button
                  type="button"
                  disabled={currentQuestionIndex === questions.length - 1}
                  onClick={() =>
                    setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))
                  }
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 disabled:opacity-30 cursor-pointer"
                >
                  Próxima
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
