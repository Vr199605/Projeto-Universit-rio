import React, { useState } from 'react';
import {
  BookMarked,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Trash2
} from 'lucide-react';
import type { ErrorNotebookItem } from '../types';
import { MathRenderer } from './MathRenderer';

interface ErrorNotebookTabProps {
  errorItems: ErrorNotebookItem[];
  onSolveAgain: (statement: string) => void;
  onUpdateStatus: (id: string, newStatus: ErrorNotebookItem['masteryStatus']) => void;
  onDeleteItem: (id: string) => void;
}

export const ErrorNotebookTab: React.FC<ErrorNotebookTabProps> = ({
  errorItems,
  onSolveAgain,
  onUpdateStatus,
  onDeleteItem,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter items
  const filteredItems = errorItems.filter((item) => {
    if (selectedDiscipline !== 'all' && item.discipline !== selectedDiscipline) return false;
    if (selectedTag !== 'all' && item.errorTag !== selectedTag) return false;
    if (selectedStatus !== 'all' && item.masteryStatus !== selectedStatus) return false;
    return true;
  });

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Erro de Sinal':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      case 'Esqueceu Jacobiano':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'Vetor Normal Invertido':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Cálculo de Limite':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  const getStatusBadge = (status: ErrorNotebookItem['masteryStatus']) => {
    switch (status) {
      case 'Dominado':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
      case 'Em Revisão':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
      case 'Precisa Praticar':
      default:
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* HEADER & ANALYTICS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-amber-500" />
              Caderno de Erros & Estratégia de Revisão
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              O segredo para gabaritar o ciclo básico: mapeie exatamente onde você tropeçou na álgebra ou no conceito
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
              <span className="text-xs text-slate-500 block">Total Catalogado</span>
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                {errorItems.length} questões
              </span>
            </div>
            <div className="text-center px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 block">Dominados</span>
              <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-300">
                {errorItems.filter((i) => i.masteryStatus === 'Dominado').length}
              </span>
            </div>
          </div>
        </div>

        {/* FILTERS BAR */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
          {/* Discipline filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Disciplina:
            </span>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium"
            >
              <option value="all">Todas as Disciplinas</option>
              <option value="Cálculo I">Cálculo I</option>
              <option value="Cálculo II">Cálculo II</option>
              <option value="Física I">Física I</option>
              <option value="Física III">Física III</option>
              <option value="Álgebra Linear">Álgebra Linear</option>
              <option value="Mecânica dos Sólidos">Mecânica dos Sólidos</option>
            </select>
          </div>

          {/* Error Tag filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Tipo de Erro:
            </span>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium"
            >
              <option value="all">Todos os Tipos</option>
              <option value="Erro de Sinal">Erro de Sinal</option>
              <option value="Esqueceu Jacobiano">Esqueceu Jacobiano</option>
              <option value="Vetor Normal Invertido">Vetor Normal Invertido</option>
              <option value="Cálculo de Limite">Cálculo de Limite</option>
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Status:
            </span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium"
            >
              <option value="all">Todos os Status</option>
              <option value="Precisa Praticar">Precisa Praticar</option>
              <option value="Em Revisão">Em Revisão</option>
              <option value="Dominado">Dominado</option>
            </select>
          </div>
        </div>
      </div>

      {/* ERROR ITEMS LIST */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Nenhuma questão pendente neste filtro
            </h3>
            <p className="text-xs text-slate-500">
              Você pode adicionar questões com dúvidas diretamente no Solucionador Passo a Passo!
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4"
            >
              {/* Top Bar: Title, Discipline, Tag, Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.problemTitle}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.discipline}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${getTagColor(
                      item.errorTag
                    )}`}
                  >
                    {item.errorTag}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.dateAdded}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status Toggle */}
                  <select
                    value={item.masteryStatus}
                    onChange={(e) =>
                      onUpdateStatus(item.id, e.target.value as ErrorNotebookItem['masteryStatus'])
                    }
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border-0 cursor-pointer ${getStatusBadge(
                      item.masteryStatus
                    )}`}
                  >
                    <option value="Precisa Praticar">Precisa Praticar</option>
                    <option value="Em Revisão">Em Revisão</option>
                    <option value="Dominado">Dominado</option>
                  </select>

                  {/* Solve Again Button */}
                  <button
                    type="button"
                    onClick={() => onSolveAgain(item.statement)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition cursor-pointer"
                    title="Carregar de volta no Solucionador Passo a Passo"
                  >
                    <span>Resolver Novamente</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Item */}
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition"
                    title="Remover do caderno"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Statement */}
              <div className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <MathRenderer content={item.statement} />
              </div>

              {/* My Mistake vs Key Fix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40">
                  <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">
                    ⚠️ Onde eu errei:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                    {item.myMistakeNotes}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                    💡 Lição definitiva & Passo Chave:
                  </span>
                  <div className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                    <MathRenderer content={item.correctKeyStep} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
