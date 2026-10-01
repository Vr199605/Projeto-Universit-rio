import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TabNavigation, type TabId } from './components/TabNavigation';
import { SolverTab } from './components/SolverTab';
import { ListGeneratorTab } from './components/ListGeneratorTab';
import { ExamModeTab } from './components/ExamModeTab';
import { ErrorNotebookTab } from './components/ErrorNotebookTab';
import { UniversitySelectorModal } from './components/UniversitySelectorModal';
import { LandingPage } from './components/LandingPage';
import type { ErrorNotebookItem, ProblemSolution } from './types';
import type { UniversityProfile } from './types/university';
import { INITIAL_ERROR_ITEMS } from './data/mockData';
import { DEFAULT_UNIVERSITY } from './data/universities';

export function App() {
  // Theme state: dark mode default (Vercel/Linear style)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('engenhariaflow-theme');
    return saved ? saved === 'dark' : true;
  });

  // Navigation View: 'landing' (Página de Apresentação e Conversão) ou 'app' (Plataforma Interativa)
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');

  // Active tab state inside the app
  const [activeTab, setActiveTab] = useState<TabId>('solver');

  // University Profile State
  const [currentUniversity, setCurrentUniversity] = useState<UniversityProfile>(() => {
    const savedUni = localStorage.getItem('engenhariaflow-university');
    if (savedUni) {
      try {
        return JSON.parse(savedUni);
      } catch {
        return DEFAULT_UNIVERSITY;
      }
    }
    return DEFAULT_UNIVERSITY;
  });
  const [isUniversityModalOpen, setIsUniversityModalOpen] = useState<boolean>(false);

  // Error notebook state - starts clean and ready for student's real questions
  const [errorItems, setErrorItems] = useState<ErrorNotebookItem[]>([]);

  // Cross-tab transfer question
  const [transferredStatement, setTransferredStatement] = useState<string | null>(null);

  // Sync theme with HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('engenhariaflow-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('engenhariaflow-theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSelectUniversity = (uni: UniversityProfile) => {
    setCurrentUniversity(uni);
    localStorage.setItem('engenhariaflow-university', JSON.stringify(uni));
  };

  // View & Tab navigation switcher
  const handleNavigateView = (view: 'landing' | 'app', tab?: TabId) => {
    setCurrentView(view);
    if (tab) {
      setActiveTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add problem to error notebook from SolverTab
  const handleSaveToErrorNotebook = (problem: ProblemSolution, note: string, tag: any) => {
    const newItem: ErrorNotebookItem = {
      id: `err-${Date.now()}`,
      problemTitle: problem.title,
      discipline: problem.discipline as any,
      topic: problem.topic,
      dateAdded: 'Hoje, agora',
      errorTag: tag,
      statement: problem.originalText,
      myMistakeNotes: note,
      correctKeyStep: problem.finalResult.latexDisplay,
      masteryStatus: 'Precisa Praticar',
    };
    setErrorItems((prev) => [newItem, ...prev]);
  };

  // Switch to solver tab with transferred question
  const handleSendToSolver = (statement: string) => {
    setTransferredStatement(statement);
    setActiveTab('solver');
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update item status in error notebook
  const handleUpdateStatus = (id: string, newStatus: ErrorNotebookItem['masteryStatus']) => {
    setErrorItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, masteryStatus: newStatus } : item))
    );
  };

  // Delete item from error notebook
  const handleDeleteItem = (id: string) => {
    setErrorItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080d1a] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Upper Navigation Header */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        savedErrorsCount={errorItems.length}
        currentUniversity={currentUniversity}
        onOpenUniversityModal={() => setIsUniversityModalOpen(true)}
        currentView={currentView}
        onNavigateView={handleNavigateView}
      />

      {/* RENDER VIEW: LANDING PAGE OR PLATFORM APP */}
      {currentView === 'landing' ? (
        <LandingPage
          currentUniversity={currentUniversity}
          onOpenUniversityModal={() => setIsUniversityModalOpen(true)}
          onEnterApp={(tab) => handleNavigateView('app', tab || 'solver')}
        />
      ) : (
        <>
          {/* Main Tab Navigation inside the App */}
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            savedErrorsCount={errorItems.length}
          />

          {/* Main Content Area */}
          <main className="flex-1 w-full pb-16">
            {activeTab === 'solver' && (
              <SolverTab
                initialStatement={transferredStatement}
                currentUniversity={currentUniversity}
                onOpenUniversityModal={() => setIsUniversityModalOpen(true)}
                onSaveToErrorNotebook={handleSaveToErrorNotebook}
                onNavigateToTab={(tab) => setActiveTab(tab as TabId)}
              />
            )}

            {activeTab === 'generator' && (
              <ListGeneratorTab
                currentUniversity={currentUniversity}
                onOpenUniversityModal={() => setIsUniversityModalOpen(true)}
                onSendToSolver={handleSendToSolver}
              />
            )}

            {activeTab === 'exam' && (
              <ExamModeTab
                currentUniversity={currentUniversity}
                onOpenUniversityModal={() => setIsUniversityModalOpen(true)}
                onSendToSolver={handleSendToSolver}
              />
            )}

            {activeTab === 'errors' && (
              <ErrorNotebookTab
                errorItems={errorItems}
                onSolveAgain={handleSendToSolver}
                onUpdateStatus={handleUpdateStatus}
                onDeleteItem={handleDeleteItem}
              />
            )}
          </main>
        </>
      )}

      {/* University Selector Modal */}
      <UniversitySelectorModal
        isOpen={isUniversityModalOpen}
        onClose={() => setIsUniversityModalOpen(false)}
        currentUniversity={currentUniversity}
        onSelectUniversity={handleSelectUniversity}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 py-6 bg-white/40 dark:bg-slate-950/40 text-xs text-slate-500 text-center print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">EngenhariaFlow</span>
            <span>—</span>
            <span>
              Ciclo Básico de Engenharia calibrado para a banca da {currentUniversity.shortName} ({currentUniversity.rigorScore}% de Rigor)
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
            <button
              type="button"
              onClick={() => handleNavigateView('landing')}
              className="hover:underline cursor-pointer"
            >
              Conhecer a Plataforma
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleNavigateView('app', 'solver')}
              className="hover:underline cursor-pointer"
            >
              Solucionador IA
            </button>
            <span>•</span>
            <span>Renderizado em KaTeX</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
