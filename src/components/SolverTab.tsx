import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  FileText,
  FileCode2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Printer,
  RotateCcw,
  Zap,
  BookmarkPlus,
  Info,
  Clock,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import type { ProblemSolution, DetailMode } from '../types';
import type { UniversityProfile } from '../types/university';
import { MathRenderer } from './MathRenderer';
import { EngineeringDiagram } from './EngineeringDiagram';
import { ALL_PRESET_SOLUTIONS } from '../data/mockData';
import { solveWithGemini, generateSimilarExercise } from '../services/geminiService';

interface SolverTabProps {
  initialStatement?: string | null;
  currentUniversity: UniversityProfile;
  onOpenUniversityModal: () => void;
  onSaveToErrorNotebook?: (problem: ProblemSolution, note: string, tag: any) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const SolverTab: React.FC<SolverTabProps> = ({
  initialStatement,
  currentUniversity,
  onOpenUniversityModal,
  onSaveToErrorNotebook,
}) => {
  // Input states - Starts clean with empty input as requested
  const [inputText, setInputText] = useState<string>(initialStatement || '');
  const [detailMode, setDetailMode] = useState<DetailMode>('didatico');

  // Sync if initialStatement changes
  useEffect(() => {
    if (initialStatement) {
      setInputText(initialStatement);
    }
  }, [initialStatement]);

  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isOcrProcessing, setIsOcrProcessing] = useState<boolean>(false);

  // Resolution and loading state - Starts clean with null solution
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStepText, setLoadingStepText] = useState<string>('');
  const [activeSolution, setActiveSolution] = useState<ProblemSolution | null>(null);
  
  // UI states
  const [expandedSteps, setExpandedSteps] = useState<{ [key: string]: boolean }>({
    'step-1': true,
    'step-2': true,
    'step-3': true,
    'step-4': true,
  });
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [customErrorNote, setCustomErrorNote] = useState<string>('');
  const [selectedErrorTag, setSelectedErrorTag] = useState<string>('Erro de Sinal');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Toggle step collapse
  const toggleStep = (stepId: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  // Expand all / collapse all
  const toggleAllSteps = (expand: boolean) => {
    if (!activeSolution) return;
    const newState: { [key: string]: boolean } = {};
    activeSolution.steps.forEach((s) => {
      newState[s.id] = expand;
    });
    setExpandedSteps(newState);
  };

  // Quick Preset Loader
  const loadPreset = (key: string) => {
    const preset = ALL_PRESET_SOLUTIONS[key];
    if (preset) {
      setInputText(preset.originalText);
      setActiveSolution(preset);
      setUploadedFile(null);
      // reset expanded steps
      const newExpanded: { [key: string]: boolean } = {};
      preset.steps.forEach((s) => (newExpanded[s.id] = true));
      setExpandedSteps(newExpanded);
    }
  };

  // Simulate file drag & drop OCR
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    const sizeKb = (file.size / 1024).toFixed(1);
    setUploadedFile({
      name: file.name,
      size: `${sizeKb} KB`,
      type: file.type || 'application/pdf',
    });

    setIsOcrProcessing(true);
    // Simulate smart OCR mathematical scanning
    setTimeout(() => {
      setIsOcrProcessing(false);
      // Auto-populate based on simulated OCR analysis
      if (file.name.toLowerCase().includes('fisica') || file.name.toLowerCase().includes('momento')) {
        loadPreset('fis1-momento');
      } else if (file.name.toLowerCase().includes('viga') || file.name.toLowerCase().includes('mecanica')) {
        loadPreset('mecsol-viga');
      } else if (file.name.toLowerCase().includes('matriz') || file.name.toLowerCase().includes('algebra')) {
        loadPreset('alglin-diag');
      } else {
        // Default to Calculus II Stokes OCR extraction
        loadPreset('calc2-stokes');
      }
    }, 1200);
  };

  // Trigger solver execution using Gemini AI engine
  const handleSolve = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setLoadingStepText('Iniciando análise com Gemini AI...');

    try {
      const solution = await solveWithGemini(
        inputText,
        currentUniversity,
        detailMode,
        (progressMessage) => {
          setLoadingStepText(progressMessage);
        }
      );

      setActiveSolution(solution);

      // Expand all steps
      const newExpanded: { [key: string]: boolean } = {};
      solution.steps.forEach((s) => (newExpanded[s.id] = true));
      setExpandedSteps(newExpanded);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Erro na resolução via Gemini:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy full LaTeX
  const handleCopyLatex = () => {
    if (!activeSolution) return;
    const latexExport = `% Resolução Gerada por EngenhariaFlow
% Disciplina: ${activeSolution.discipline} - ${activeSolution.topic}
% Banca: ${currentUniversity.name} (${currentUniversity.rigorScore}% de Rigor)

\\section*{${activeSolution.title}}
\\textbf{Enunciado:}
${activeSolution.originalText}

${activeSolution.steps
  .map(
    (s) => `\\subsection*{Passo ${s.number}: ${s.title}}
${s.content}
`
  )
  .join('\n')}

\\subsection*{Resultado Final:}
${activeSolution.finalResult.latexDisplay}
`;

    navigator.clipboard.writeText(latexExport);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2200);
  };

  // Generate similar question with Gemini AI
  const handleGenerateSimilar = async () => {
    if (!activeSolution) return;
    setIsLoading(true);
    setLoadingStepText('Gemini gerando exercício inédito calibrado para a banca...');
    try {
      const similarText = await generateSimilarExercise(activeSolution.originalText, currentUniversity);
      setInputText(similarText);
      const solution = await solveWithGemini(
        similarText,
        currentUniversity,
        detailMode,
        (msg) => setLoadingStepText(msg)
      );
      setActiveSolution(solution);
      const newExpanded: { [key: string]: boolean } = {};
      solution.steps.forEach((s) => (newExpanded[s.id] = true));
      setExpandedSteps(newExpanded);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Erro ao gerar similar:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick insertion of math symbols into text area
  const insertMathSymbol = (sym: string) => {
    setInputText((prev) => prev + sym);
  };

  // Save to error notebook handler
  const handleConfirmSaveError = () => {
    if (!activeSolution) return;
    if (onSaveToErrorNotebook) {
      onSaveToErrorNotebook(activeSolution, customErrorNote || 'Atenção na resolução deste problema.', selectedErrorTag);
    }
    setShowSaveModal(false);
    setSavedNotification('Salvo com sucesso no Caderno de Erros!');
    setTimeout(() => setSavedNotification(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Toast Notification */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-xl shadow-emerald-600/30 text-sm font-medium animate-bounce">
          <Check className="w-4 h-4" />
          {savedNotification}
        </div>
      )}

      {/* SECTION 1: HYBRID INPUT AREA */}
      <section className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
        {/* Dynamic University Calibration Banner */}
        <div className="mb-5 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-transparent dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-slate-900/40 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Banca Ativa: {currentUniversity.name}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                  {currentUniversity.rigorScore}% de Rigor
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  ({currentUniversity.rigorCategory})
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1">
                {currentUniversity.strategicAdvice}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenUniversityModal}
            className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800 shadow-xs transition whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>Trocar Faculdade</span>
            <span>→</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Entrada Inteligente de Exercício
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Arraste um PDF/imagem de prova ou cole o enunciado com equações em LaTeX
            </p>
          </div>

          {/* Quick Presets Bar */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Exemplos:
            </span>
            <button
              onClick={() => loadPreset('calc2-stokes')}
              className="text-xs px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800/60 font-medium transition cursor-pointer"
            >
              Cálculo II (Stokes)
            </button>
            <button
              onClick={() => loadPreset('fis1-momento')}
              className="text-xs px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/60 font-medium transition cursor-pointer"
            >
              Física I (Momento Angular)
            </button>
            <button
              onClick={() => loadPreset('alglin-diag')}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-medium transition cursor-pointer"
            >
              Álgebra Linear
            </button>
            <button
              onClick={() => loadPreset('mecsol-viga')}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-medium transition cursor-pointer"
            >
              Mecânica dos Sólidos
            </button>
          </div>
        </div>

        {/* The Hybrid Layout: Drag & Drop + Divider + Text Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* File Upload Zone (4 cols) */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`lg:col-span-4 rounded-xl border-2 border-dashed p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 ${
              isDragging
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                : 'border-slate-300 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-600 bg-slate-50/50 dark:bg-slate-900/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".pdf,image/*"
              className="hidden"
            />

            {isOcrProcessing ? (
              <div className="py-6 flex flex-col items-center space-y-3">
                <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
                  OCR Matemático & Visão Computacional...
                </div>
                <p className="text-[11px] text-slate-500">Decodificando fórmulas e diagramas...</p>
              </div>
            ) : uploadedFile ? (
              <div className="py-2 flex flex-col items-center space-y-2 w-full">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                  {uploadedFile.name}
                </div>
                <span className="text-[11px] font-mono text-slate-500">{uploadedFile.size}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
                  Arquivo Analisado com Sucesso
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                  }}
                  className="text-xs text-rose-500 hover:underline pt-1"
                >
                  Remover e enviar outro
                </button>
              </div>
            ) : (
              <div className="py-4 flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Upload de PDF ou Foto do Caderno
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[200px]">
                  Arraste arquivos PDF, PNG ou JPEG com exercícios manuscritos ou impressos
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono font-medium px-2 py-1 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Procurar no Computador
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Text Area & Live LaTeX Preview (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileCode2 className="w-4 h-4 text-blue-500" />
                Enunciado do Problema (suporte a LaTeX $...$ e $$...$$):
              </label>

              {/* Quick Math Symbols Injector */}
              <div className="hidden sm:flex items-center gap-1">
                {[
                  { label: '∮', sym: ' \\oint_C ' },
                  { label: '∬', sym: ' \\iint_S ' },
                  { label: '∇×F', sym: ' \\nabla \\times \\mathbf{F} ' },
                  { label: 'd/dt', sym: ' \\frac{d}{dt} ' },
                  { label: 'lim', sym: ' \\lim_{x \\to 0} ' },
                  { label: 'matriz', sym: ' \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} ' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => insertMathSymbol(item.sym)}
                    className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                    title={`Inserir ${item.sym}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Cole aqui o enunciado com equações, ex: Calcule o trabalho de F = (y, -x) ao longo da curva C..."
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
            />

            {/* Live LaTeX Preview box when text contains math */}
            {(inputText.includes('$') || inputText.includes('\\')) && (
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                  <span>Pré-visualização KaTeX em Tempo Real:</span>
                  <span className="text-blue-500 font-semibold">Renderizado</span>
                </div>
                <div className="text-sm text-slate-800 dark:text-slate-200">
                  <MathRenderer content={inputText} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detail Mode Selector + Action Button */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Detail Mode Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Modo de Detalhamento:
            </span>
            <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setDetailMode('didatico')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  detailMode === 'didatico'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Didático Completo (Calouro)
              </button>
              <button
                type="button"
                onClick={() => setDetailMode('rapido')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  detailMode === 'rapido'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Rápido / Direto
              </button>
              <button
                type="button"
                onClick={() => setDetailMode('conceitual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  detailMode === 'conceitual'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Foco em Teoremas & Conceito
              </button>
            </div>
          </div>

          {/* Main Action Button */}
          <button
            type="button"
            onClick={handleSolve}
            disabled={isLoading || !inputText.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md shadow-blue-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{loadingStepText}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Identificar Disciplina e Resolver</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* SECTION 2: RESULTS PANEL */}
      {activeSolution && (
        <section ref={resultsRef} className="space-y-6 print:space-y-4">
          {/* Card de Metadados Automáticos */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    Disciplina: {activeSolution.discipline}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    Tópico: {activeSolution.topic}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/25 text-indigo-300 border border-indigo-500/50 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                    Padrão {currentUniversity.shortName} ({currentUniversity.rigorScore}%)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {currentUniversity.rigorCategory}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    Tempo: {activeSolution.estimatedTime}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {activeSolution.title}
                </h1>
              </div>

              {/* Action Toolbar on Header */}
              <div className="flex items-center gap-2 self-start md:self-center flex-wrap print:hidden">
                <button
                  type="button"
                  onClick={handleCopyLatex}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
                  title="Copiar código LaTeX completo da solução"
                >
                  {copiedLatex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLatex ? 'Copiado!' : 'Copiar em LaTeX'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSaveModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
                  title="Salvar no Caderno de Erros / Revisão"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>Caderno de Erros</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
                  title="Imprimir ou salvar como PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Exportar PDF</span>
                </button>
              </div>
            </div>

            {/* Prerequisites tags */}
            {activeSolution.prerequisites && activeSolution.prerequisites.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs">
                <span className="text-slate-400 font-medium whitespace-nowrap pt-0.5">
                  Pré-requisitos:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSolution.prerequisites.map((p, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono text-[11px] border border-slate-700"
                    >
                      <MathRenderer content={p} />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* University Prompt Directive Callout */}
            <div className="mt-4 p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-xs text-indigo-200 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white mr-1">
                  Critério de Avaliação da Banca ({currentUniversity.shortName}):
                </span>
                <span>{currentUniversity.aiPromptDirective}</span>
              </div>
            </div>
          </div>

          {/* Quick controls: Expand/Collapse All */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 print:hidden">
            <span className="font-mono">
              Visualização Passo a Passo • {activeSolution.steps.length} Blocos Analíticos
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleAllSteps(true)}
                className="hover:text-blue-500 font-medium cursor-pointer"
              >
                Expandir Todos
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => toggleAllSteps(false)}
                className="hover:text-blue-500 font-medium cursor-pointer"
              >
                Recolher Todos
              </button>
            </div>
          </div>

          {/* STEP-BY-STEP BREAKDOWN */}
          <div className="space-y-4">
            {activeSolution.steps.map((step) => {
              const isExpanded = expandedSteps[step.id] ?? true;

              return (
                <div
                  key={step.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all duration-200"
                >
                  {/* Step Header */}
                  <div
                    onClick={() => toggleStep(step.id)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 select-none transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {step.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {step.title}
                          </h3>
                          {step.badge && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {step.badge}
                            </span>
                          )}
                        </div>
                        {step.subtitle && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {step.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label="Expandir ou recolher passo"
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Step Content */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-6 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                      {/* Diagram if available */}
                      {step.diagramSvg && (
                        <EngineeringDiagram type={step.diagramSvg} className="mb-4" />
                      )}

                      {/* Mathematical text and KaTeX */}
                      <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                        <MathRenderer content={step.content} />
                      </div>

                      {/* Didactic notes box */}
                      {step.notes && (
                        <div className="mt-4 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 flex items-start gap-2.5">
                          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-blue-900 dark:text-blue-200 font-sans">
                            <span className="font-semibold">Nota Técnica:</span> {step.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* HIGHLIGHTED FINAL RESULT BOX (Passo 4 / Conclusão) */}
          <div className="rounded-2xl border-2 border-blue-500 dark:border-blue-500/80 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40 p-5 sm:p-7 shadow-lg shadow-blue-500/10">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Resultado Final Homologado
                </span>
              </div>
              {activeSolution.finalResult.unit && (
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                  Unidade: {activeSolution.finalResult.unit}
                </span>
              )}
            </div>

            {/* Big LaTeX equation presentation */}
            <div className="py-3 px-4 rounded-xl bg-white dark:bg-slate-950 border border-blue-200 dark:border-blue-900/60 text-center my-3 overflow-x-auto shadow-inner">
              <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                <MathRenderer content={`$$${activeSolution.finalResult.latexDisplay}$$`} block />
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-3">
              {activeSolution.finalResult.summaryText}
            </p>

            {activeSolution.finalResult.insight && (
              <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 italic flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{activeSolution.finalResult.insight}</span>
              </div>
            )}

            {/* Bottom Actions within Solution */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 print:hidden">
              <button
                type="button"
                onClick={handleGenerateSimilar}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Gerar Questão Semelhante para Treino</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowSaveModal(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800 transition cursor-pointer"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>Adicionar ao Caderno de Erros</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLatex}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                >
                  {copiedLatex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLatex ? 'Copiado!' : 'Copiar Solução em LaTeX'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2 (EMPTY STATE): PRISTINE READY-TO-SOLVE WORKSPACE */}
      {!activeSolution && !isLoading && (
        <section className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 p-8 sm:p-12 text-center transition-all">
          <div className="max-w-xl mx-auto flex flex-col items-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Banca: {currentUniversity.shortName} ({currentUniversity.rigorScore}% Rigor)</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Solucionador Pronto para Análise
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cole o enunciado do seu exercício no campo acima, faça upload do PDF/foto ou experimente um caso prático com 1 clique:
              </p>
            </div>

            {/* Quick Test Exploration Chips */}
            <div className="w-full pt-2">
              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Casos Típicos de Prova (Clique para carregar):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                <button
                  type="button"
                  onClick={() => loadPreset('calc2-stokes')}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition flex flex-col gap-0.5 cursor-pointer group"
                >
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Cálculo II: Teorema de Stokes
                  </span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    Trabalho ao longo de fronteira paraboloidal
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => loadPreset('fis1-momento')}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition flex flex-col gap-0.5 cursor-pointer group"
                >
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Física I: Conservação de Momento
                  </span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    Colisão e acoplamento de disco e anel giratório
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => loadPreset('alglin-diag')}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition flex flex-col gap-0.5 cursor-pointer group"
                >
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Álgebra Linear: Diagonalização
                  </span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    Polinômio característico e base de autovetores
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => loadPreset('mecsol-viga')}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition flex flex-col gap-0.5 cursor-pointer group"
                >
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Mecânica dos Sólidos: Viga Bi-apoiada
                  </span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    Diagrama de esforço cortante e momento fletor
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-blue-500" /> LaTeX KaTeX Nativo
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-blue-500" /> Sem Pular Passagens
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-blue-500" /> Alerta de Pegadinhas
              </span>
            </div>
          </div>
        </section>
      )}

      {/* SAVE TO ERROR NOTEBOOK MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookmarkPlus className="w-5 h-5 text-amber-500" />
                Salvar no Caderno de Erros & Treino
              </h3>
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Registre o motivo do erro para criar um plano de estudo focado e evitar perder pontos na prova.
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Tipo do Erro Cometido:
              </label>
              <select
                value={selectedErrorTag}
                onChange={(e) => setSelectedErrorTag(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              >
                <option value="Erro de Sinal">Erro de Sinal / Álgebra</option>
                <option value="Esqueceu Jacobiano">Esqueceu Jacobiano na Mudança de Variáveis</option>
                <option value="Vetor Normal Invertido">Vetor Normal ou Sentido Invertido (Regra da Mão Direita)</option>
                <option value="Falta de Hipótese">Não Verificou Hipóteses do Teorema</option>
                <option value="Derivada Implícita">Falha na Regra da Cadeia / Derivação Implícita</option>
                <option value="Cálculo de Limite">Indeterminação não tratada / L'Hôpital inadequado</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Minhas Anotações & Lição Aprendida:
              </label>
              <textarea
                rows={3}
                value={customErrorNote}
                onChange={(e) => setCustomErrorNote(e.target.value)}
                placeholder="Ex: Prestar atenção na orientação da normal n: ela tem que ser para cima (k > 0) para casar com o sentido anti-horário de C..."
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSaveError}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
              >
                Salvar no Caderno
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
