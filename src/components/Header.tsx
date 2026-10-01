import React from 'react';
import { Sun, Moon, Cpu, GraduationCap, BookOpen, ChevronDown, Sparkles, LayoutGrid } from 'lucide-react';
import type { UniversityProfile } from '../types/university';
import type { TabId } from './TabNavigation';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  savedErrorsCount: number;
  currentUniversity: UniversityProfile;
  onOpenUniversityModal: () => void;
  currentView: 'landing' | 'app';
  onNavigateView: (view: 'landing' | 'app', tab?: TabId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  savedErrorsCount,
  currentUniversity,
  onOpenUniversityModal,
  currentView,
  onNavigateView,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateView('landing')}
            className="flex items-center gap-3 cursor-pointer text-left group"
            title="Ir para a página inicial"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-white" />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
                  Engenharia<span className="text-blue-600 dark:text-blue-400">Flow</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80">
                  v2.5 AI
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden lg:block">
                Ciclo Básico de Engenharia Calibrado por Faculdade
              </p>
            </div>
          </button>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => onNavigateView('landing')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              currentView === 'landing'
                ? 'bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-900/60'
            }`}
          >
            Apresentação
          </button>

          <button
            type="button"
            onClick={() => onNavigateView('app', 'solver')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              currentView === 'app'
                ? 'bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-900/60'
            }`}
          >
            Solucionador IA
          </button>

          <button
            type="button"
            onClick={() => onNavigateView('app', 'generator')}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition cursor-pointer"
          >
            Listas & Simulados
          </button>

          <button
            type="button"
            onClick={() => onNavigateView('app', 'errors')}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>Caderno de Erros</span>
            {savedErrorsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 font-bold">
                {savedErrorsCount}
              </span>
            )}
          </button>
        </nav>

        {/* Dynamic Status & University Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active University Button with Rigor Badge (Click to open selector) */}
          <button
            type="button"
            onClick={onOpenUniversityModal}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 transition cursor-pointer text-left"
            title="Clique para trocar de faculdade e calibrar o rigor da IA"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {currentUniversity.shortName}
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white dark:bg-blue-500">
                  {currentUniversity.rigorScore}% rigor
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block truncate max-w-[120px]">
                {currentUniversity.type}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
          </button>

          {/* Primary View Action Button */}
          {currentView === 'landing' ? (
            <button
              type="button"
              onClick={() => onNavigateView('app', 'solver')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm shadow-blue-500/25 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Acessar Plataforma</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigateView('landing')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-800 transition cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
              <span>Apresentação</span>
            </button>
          )}

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Alternar tema"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            title={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
