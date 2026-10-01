import React from 'react';
import { Sparkles, ListFilter, Timer, BookMarked } from 'lucide-react';

export type TabId = 'solver' | 'generator' | 'exam' | 'errors';

interface TabNavigationProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  savedErrorsCount?: number;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  savedErrorsCount = 0,
}) => {
  const tabs = [
    {
      id: 'solver' as TabId,
      name: 'Solucionador Passo a Passo',
      shortName: 'Solucionador',
      icon: Sparkles,
      badge: 'Principal',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300',
    },
    {
      id: 'generator' as TabId,
      name: 'Gerador de Listas & Treino',
      shortName: 'Gerador',
      icon: ListFilter,
      badge: 'Filtros Provas',
    },
    {
      id: 'exam' as TabId,
      name: 'Simulado / Modo Prova',
      shortName: 'Modo Prova',
      icon: Timer,
      badge: 'Cronômetro',
      badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
    },
    {
      id: 'errors' as TabId,
      name: 'Histórico & Caderno de Erros',
      shortName: 'Caderno de Erros',
      icon: BookMarked,
      count: savedErrorsCount,
    },
  ];

  return (
    <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative min-w-fit flex items-center gap-2 py-2 px-3 sm:px-4 rounded-xl text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 dark:bg-blue-600 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-900'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                  }`}
                />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.shortName}</span>

                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : tab.badgeColor || 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}

                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`ml-1 text-[11px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white text-blue-600'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
