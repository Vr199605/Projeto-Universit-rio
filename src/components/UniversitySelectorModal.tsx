import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Search,
  Check,
  Sparkles,
  Sliders,
  ShieldCheck,
  Clock,
  X,
  Building2,
  MapPin,
  PlusCircle
} from 'lucide-react';
import type { UniversityProfile, RigorCategory } from '../types/university';
import { ALL_BRAZILIAN_UNIVERSITIES, detectUniversityProfile } from '../data/universities';

interface UniversitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUniversity: UniversityProfile;
  onSelectUniversity: (uni: UniversityProfile) => void;
}

const BRAZILIAN_STATES = [
  'Todos',
  'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE', 'CE', 'DF', 'GO', 'ES', 'PB', 'RN', 'PA', 'AM', 'BR'
];

export const UniversitySelectorModal: React.FC<UniversitySelectorModalProps> = ({
  isOpen,
  onClose,
  currentUniversity,
  onSelectUniversity,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('Todos');
  const [previewUni, setPreviewUni] = useState<UniversityProfile>(currentUniversity);
  const [customRigor, setCustomRigor] = useState<number>(currentUniversity.rigorScore);

  // Filtered universities
  const filteredUniversities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return ALL_BRAZILIAN_UNIVERSITIES.filter((u) => {
      // Type filter
      if (selectedType === 'federal' && u.type !== 'Federal') return false;
      if (selectedType === 'estadual' && u.type !== 'Estadual') return false;
      if (selectedType === 'militar' && u.type !== 'Militar') return false;
      if (selectedType === 'privada' && u.type !== 'Privada') return false;

      // State filter
      if (selectedState !== 'Todos' && u.state !== selectedState && u.state !== 'BR') {
        return false;
      }

      // Search query
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.shortName.toLowerCase().includes(q) ||
        u.state.toLowerCase().includes(q) ||
        (u.examStyle && u.examStyle.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedType, selectedState]);

  if (!isOpen) return null;

  const handleSelectPreset = (uni: UniversityProfile) => {
    setPreviewUni(uni);
    setCustomRigor(uni.rigorScore);
  };

  const handleApplyCustomName = () => {
    if (!searchQuery.trim()) return;
    const detected = detectUniversityProfile(searchQuery.trim());
    setPreviewUni(detected);
    setCustomRigor(detected.rigorScore);
  };

  const handleConfirm = () => {
    const finalProfile: UniversityProfile = {
      ...previewUni,
      rigorScore: customRigor,
      rigorCategory: getRigorCategoryFromScore(customRigor),
    };
    onSelectUniversity(finalProfile);
    onClose();
  };

  const getRigorCategoryFromScore = (score: number): RigorCategory => {
    if (score >= 97) return 'Extremo / Nível Olímpico';
    if (score >= 92) return 'Muito Alto (Padrão USP/Unicamp/UFRJ)';
    if (score >= 87) return 'Alto (Padrão Federal)';
    if (score >= 78) return 'Médio-Alto (Excelência Privada)';
    return 'Didático / Aplicado';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#0c1222] rounded-2xl border border-slate-200 dark:border-slate-800/90 max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Clean Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-white dark:bg-[#0c1222]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Selecione sua Faculdade
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                  Todas as Universidades do Brasil
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                A IA calibra o nível de rigor, o formato de prova e a metodologia da banca examinadora
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="px-6 py-3.5 bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por sigla ou nome (ex: Poli-USP, UFRJ, UFMG, UFV, ITA, Mauá, Estácio, UNIP...)"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs focus:ring-2 focus:ring-blue-500 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* State Filter Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                UF:
              </span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              >
                {BRAZILIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st === 'Todos' ? 'Todos os Estados' : st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'Todas as Instituições' },
                { id: 'federal', label: 'Públicas Federais (UFs / IFs)' },
                { id: 'estadual', label: 'Públicas Estaduais (USP, etc.)' },
                { id: 'militar', label: 'Militares de Elite (ITA / IME)' },
                { id: 'privada', label: 'Particulares & Comunitárias' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedType(t.id)}
                  className={`text-[11px] font-medium px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                    selectedType === t.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/80 dark:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono text-slate-400 shrink-0 hidden md:block">
              {filteredUniversities.length} disponíveis
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800/80">
          {/* Left Column: List of Universities (7 cols) */}
          <div className="lg:col-span-7 p-4 flex flex-col space-y-2 overflow-y-auto max-h-[480px]">
            {/* If user typed a custom university name not fully matching */}
            {searchQuery.trim().length > 1 && (
              <div
                onClick={handleApplyCustomName}
                className="p-3.5 rounded-xl border border-dashed border-blue-400 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer transition flex items-center justify-between gap-3 mb-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block">
                      Usar faculdade digitada: "{searchQuery.trim()}"
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      A IA definirá o rigor acadêmico compatível automaticamente
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-600 text-white shrink-0">
                  Calibrar
                </span>
              </div>
            )}

            {filteredUniversities.map((uni) => {
              const isSelected = previewUni.id === uni.id;
              return (
                <div
                  key={uni.id}
                  onClick={() => handleSelectPreset(uni)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 ring-1 ring-blue-500/50'
                      : 'border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-900/40'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {uni.shortName}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {uni.state}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-medium">
                        {uni.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {uni.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                        {uni.rigorScore}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">rigor</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-300 dark:border-slate-700 text-transparent'
                      }`}
                    >
                      ✓
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredUniversities.length === 0 && (
              <div className="py-12 text-center space-y-2">
                <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">
                  Nenhuma faculdade pré-cadastrada com esses termos.
                </p>
                <button
                  type="button"
                  onClick={handleApplyCustomName}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Cadastrar "{searchQuery}" com IA
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Academic Rigor Profile (5 cols) */}
          <div className="lg:col-span-5 p-5 flex flex-col justify-between bg-slate-50/40 dark:bg-slate-950/20 space-y-4">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                  Instituição Selecionada
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {previewUni.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900">
                    {previewUni.rigorCategory}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {previewUni.state} • {previewUni.type}
                  </span>
                </div>
              </div>

              {/* Rigor Slider */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-blue-500" />
                    Índice de Rigor Acadêmico:
                  </span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                    {customRigor}%
                  </span>
                </div>

                <input
                  type="range"
                  min={50}
                  max={100}
                  value={customRigor}
                  onChange={(e) => setCustomRigor(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>50 (Didático)</span>
                  <span>75 (Médio)</span>
                  <span>90 (Federal)</span>
                  <span>100 (ITA/IME)</span>
                </div>
              </div>

              {/* Exam Board Style */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs shadow-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Padrão de Avaliação da Instituição:
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  {previewUni.examStyle}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Tempo Prova: {previewUni.examDurationMinutes} min
                  </span>
                  <span>
                    Formulário: {previewUni.allowFormulaSheet ? 'Permitido' : 'Proibido'}
                  </span>
                </div>
              </div>

              {/* Strategic Advice */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Dica de Ouro para a Prova:
                </div>
                <p className="text-[11px] text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                  {previewUni.strategicAdvice}
                </p>
              </div>
            </div>

            {/* Modal Bottom Buttons */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Aplicar Calibração ({previewUni.shortName})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
