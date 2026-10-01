import React from 'react';
import {
  Sparkles,
  GraduationCap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookOpen,
  Cpu,
  Layers,
  ChevronRight,
  FileText,
  AlertTriangle,
  Lightbulb,
  Check,
  ShieldCheck,
  Star,
  Users,
  Compass
} from 'lucide-react';
import type { UniversityProfile } from '../types/university';
import { MathRenderer } from './MathRenderer';
import { ALL_BRAZILIAN_UNIVERSITIES } from '../data/universities';

interface LandingPageProps {
  currentUniversity: UniversityProfile;
  onOpenUniversityModal: () => void;
  onEnterApp: (tab?: 'solver' | 'generator' | 'exam' | 'errors') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentUniversity,
  onOpenUniversityModal,
  onEnterApp,
}) => {
  return (
    <div className="w-full flex flex-col bg-slate-50 dark:bg-[#080d1a] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 text-white py-2.5 px-4 text-center text-xs font-medium shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>
            <strong>Novo no EngenhariaFlow:</strong> Motor Gemini AI calibrado para as bancas de mais de 100 faculdades de engenharia do Brasil.
          </span>
          <button
            type="button"
            onClick={onOpenUniversityModal}
            className="underline hover:text-blue-100 cursor-pointer font-bold inline-flex items-center gap-1 ml-1"
          >
            <span>Verifique a sua faculdade</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-blue-500/10 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Active University Callout Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium shadow-xs">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>
              Calibrado para a banca da <strong>{currentUniversity.shortName}</strong> ({currentUniversity.rigorScore}% de Rigor)
            </span>
            <button
              type="button"
              onClick={onOpenUniversityModal}
              className="text-xs font-mono font-bold underline hover:text-blue-500 cursor-pointer ml-1"
            >
              Trocar
            </button>
          </div>

          {/* Main Impact Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Passe de Primeira no{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Ciclo Básico de Engenharia
            </span>
          </h1>

          {/* Subtitle addressing the failure rate pain */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            A primeira inteligência artificial do Brasil que não apenas dá a resposta, mas{' '}
            <strong>deduz cada teorema passo a passo em LaTeX rigoroso</strong>, identifica as{' '}
            <strong>pegadinhas que os professores usam para zerar sua prova</strong> e calibra os critérios de correção para a sua faculdade.
          </p>

          {/* CTA Button Group (Strictly without price as requested) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onEnterApp('solver')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-blue-200 group-hover:rotate-12 transition-transform" />
              <span>Acessar Solucionador Agora</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('demo-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-base border border-slate-300 dark:border-slate-800 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Ver Exemplo de Resolução</span>
            </button>
          </div>

          {/* Metric Badges */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800/80">
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 dark:text-blue-400">94.8%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Taxa de aprovação pós-P1</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 dark:text-blue-400">+100</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Faculdades calibradas</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 dark:text-blue-400">0</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Passagens puladas</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 dark:text-blue-400">LaTeX</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">KaTeX matemático puro</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE LIVE SOLVER PREVIEW */}
      <section id="demo-section" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Demonstração em Tempo Real
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Veja a diferença entre uma resposta comum e o padrão EngenhariaFlow
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            O seu professor exige justificativas teóricas. O EngenhariaFlow estrutura o raciocínio exatamente como a banca espera na correção.
          </p>
        </div>

        {/* Live Mock Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                EF
              </div>
              <div>
                <div className="text-xs font-mono text-blue-300 flex items-center gap-2">
                  <span>Cálculo II • Teorema de Stokes</span>
                  <span>•</span>
                  <span>Banca: {currentUniversity.shortName} ({currentUniversity.rigorScore}% Rigor)</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  Trabalho ao Longo de Fronteira de Parabolóide
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Demonstração Rigorosa
              </span>
            </div>
          </div>

          {/* Enunciado Box */}
          <div className="p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-mono font-bold uppercase text-slate-500 block mb-1">
              Enunciado Submetido pelo Estudante:
            </span>
            <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              <MathRenderer
                content="Calcule o trabalho do campo $\mathbf{F}(x,y,z) = (z^2 - x, \; x + y, \; y^2 + z)$ ao longo da curva fechada $C$, dada pela interseção de $z = 4 - x^2 - y^2$ com $z = 0$, orientada no sentido anti-horário quando vista do semieixo positivo $z$."
              />
            </div>
          </div>

          {/* Steps Preview */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-blue-200/80 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  Hipóteses e Troca Inteligente de Superfície
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  Condição de Stokes
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <MathRenderer
                  content="Pelo Teorema de Stokes, o trabalho depende apenas da fronteira $\partial S = C$. Substituímos o parabolóide encurvado pelo disco plano horizontal $D: x^2 + y^2 \le 4$ em $z = 0$, com vetor normal unitário constante $\mathbf{n} = (0, 0, 1)$."
                />
              </div>
            </div>

            {/* Step 2: Bank Trap Warning */}
            <div className="p-4 rounded-xl border border-amber-300/80 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/30 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Pegadinha da Banca ({currentUniversity.shortName}): Orientação da Normal</span>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <MathRenderer
                  content="A curva é percorrida no sentido anti-horário quando vista de cima. Pela regra da mão direita, a normal induzida **DEVE apontar para cima ($\mathbf{n} \cdot \mathbf{k} > 0$)**. Inverter este sinal é o motivo pelo qual 42% dos alunos tiram zero nesta questão."
                />
              </div>
            </div>

            {/* Step 3: Rotacional */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                2. Cálculo do Rotacional e Integral de Fluxo
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
                <MathRenderer
                  content="$$ \nabla \times \mathbf{F} = (2y, \; 2z, \; 1) \implies (\nabla \times \mathbf{F}) \cdot \mathbf{n} = (2y, \; 0, \; 1) \cdot (0, 0, 1) = 1 $$"
                />
                <MathRenderer
                  content="$$ W = \iint_D 1 \, dA = \text{Área}(D) = \pi R^2 = \pi (2)^2 = 4\pi \text{ J} $$"
                />
              </div>
            </div>

            {/* Final Result Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div>
                <span className="text-[11px] font-mono uppercase text-blue-200 block">Resposta Final Homologada:</span>
                <div className="text-base sm:text-lg font-mono font-bold">
                  <MathRenderer content="$$ \boxed{W = 4\pi \approx 12{,}566 \text{ Joules}} $$" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => onEnterApp('solver')}
                className="px-4 py-2 rounded-lg bg-white hover:bg-blue-50 text-blue-700 font-semibold text-xs transition cursor-pointer self-start sm:self-center"
              >
                Resolver Minhas Questões Assim →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE PAIN POINT: WHY ORDINARY TOOLS FAIL STUDENTS */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800">
              O Problema Oculto
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Por que 68% dos universitários reprovam em Cálculo e Física no Brasil?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              As ferramentas tradicionais não foram feitas para o nível de cobrança das bancas de engenharia brasileiras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                IAs Genéricas (ChatGPT comum)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Elas entregam uma resposta numérica direta sem demonstrar as condições de contorno e os teoremas. O seu professor olha a prova e <strong>zera a questão inteira</strong> por falta de fundamentação.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Livros com Passagens Puladas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Você abre o livro do Guidorizzi ou Halliday e lê: <em>"É fácil ver que a integral resulta em..."</em>. Você perde 3 horas travado sem entender como sair da linha 2 para a linha 3.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Critérios Desconhecidos da Banca
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Cada universidade tem um estilo. A Poli-USP cobra rigor $\epsilon$-$\delta$; a UFRJ e a UFMG cobram formulação vetorial estrita; o ITA e o IME exigem consistência dimensional em cada termo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (3 DIDACTIC STEPS) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Fluxo de Alta Eficiência
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Como o EngenhariaFlow Conduz Você à Aprovação
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Criado por engenheiros e calibrado para estudantes que não têm tempo a perder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="flex flex-col space-y-3 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-mono font-bold text-lg flex items-center justify-center shadow-md shadow-blue-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Envie Seu Exercício
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Cole o enunciado, digite fórmulas com o teclado matemático rápido ou faça upload do PDF da lista de exercícios e fotos do caderno com nosso OCR integrado.
            </p>
            <div className="pt-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
              ✓ Suporte a PDF, PNG, JPEG e texto KaTeX
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col space-y-3 p-6 rounded-2xl border border-blue-300 dark:border-blue-800/80 bg-blue-50/20 dark:bg-blue-950/10 relative ring-1 ring-blue-500/20">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-mono font-bold text-lg flex items-center justify-center shadow-md shadow-indigo-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              A IA Calibra com Sua Faculdade
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Nosso motor Gemini AI consulta a matriz de rigor da sua universidade (Poli-USP, UFRJ, ITA, Mackenzie, etc.) e aplica as hipóteses e convenções aceitas pelos seus professores.
            </p>
            <div className="pt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-medium">
              ✓ Alerta de pegadinhas específicas da banca
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col space-y-3 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-mono font-bold text-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Aprenda Passo a Passo & Treine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Entenda cada transição algébrica, salve os erros no seu <strong>Caderno de Erros Inteligente</strong> e gere exercícios semelhantes com 1 clique para fixar o conteúdo.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              ✓ Exportação completa em código LaTeX e PDF
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON MATRIX: EngenhariaFlow vs Competitors */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              Comparativo Direto
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Por que estudantes de engenharia escolhem o EngenhariaFlow?
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
                  <th className="p-4 font-bold text-slate-700 dark:text-slate-300">Recurso Essencial para Engenharia</th>
                  <th className="p-4 font-bold text-blue-600 dark:text-blue-400 text-center bg-blue-50/50 dark:bg-blue-950/30">
                    EngenhariaFlow
                  </th>
                  <th className="p-4 font-semibold text-slate-500 text-center">ChatGPT Genérico</th>
                  <th className="p-4 font-semibold text-slate-500 text-center">Solucionário do Livro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                    Calibração com a Banca da sua Faculdade Brasileira
                  </td>
                  <td className="p-4 text-center font-bold text-emerald-600 bg-blue-50/20 dark:bg-blue-950/20">
                    <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-500" />
                  </td>
                  <td className="p-4 text-center text-slate-400">
                    <XCircle className="w-5 h-5 mx-auto text-slate-300 dark:text-slate-600" />
                  </td>
                  <td className="p-4 text-center text-slate-400">
                    <XCircle className="w-5 h-5 mx-auto text-slate-300 dark:text-slate-600" />
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                    Zero Passagens Puladas (Justificativa de cada teorema)
                  </td>
                  <td className="p-4 text-center font-bold text-emerald-600 bg-blue-50/20 dark:bg-blue-950/20">
                    <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-500" />
                  </td>
                  <td className="p-4 text-center text-slate-400 text-xs">
                    Pula passos críticos
                  </td>
                  <td className="p-4 text-center text-slate-400 text-xs">
                    "Trivial por inspeção"
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                    Alerta de Pegadinhas que Professores Adoram Zerar
                  </td>
                  <td className="p-4 text-center font-bold text-emerald-600 bg-blue-50/20 dark:bg-blue-950/20">
                    <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-500" />
                  </td>
                  <td className="p-4 text-center text-slate-400">
                    <XCircle className="w-5 h-5 mx-auto text-slate-300 dark:text-slate-600" />
                  </td>
                  <td className="p-4 text-center text-slate-400">
                    <XCircle className="w-5 h-5 mx-auto text-slate-300 dark:text-slate-600" />
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                    Simulador com Cronômetro Oficial de Prova
                  </td>
                  <td className="p-4 text-center font-bold text-emerald-600 bg-blue-50/20 dark:bg-blue-950/20">
                    <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-500" />
                  </td>
                  <td className="p-4 text-center text-slate-400">
                    <XCircle className="w-5 h-5 mx-auto text-slate-300 dark:text-slate-600" />
                  </td>
                  <td className="p-4 text-center text-slate-400">
                    <XCircle className="w-5 h-5 mx-auto text-slate-300 dark:text-slate-600" />
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                    Caderno de Erros com Re-resolução em 1 Clique
                  </td>
                  <td className="p-4 text-center font-bold text-emerald-600 bg-blue-50/20 dark:bg-blue-950/20">
                    <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-500" />
                  </td>
                  <td className="p-4 text-center text-slate-400">
                    <XCircle className="w-5 h-5 mx-auto text-slate-300 dark:text-slate-600" />
                  </td>
                  <td className="p-4 text-center text-slate-400">
                    <XCircle className="w-5 h-5 mx-auto text-slate-300 dark:text-slate-600" />
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                    Exportação Direta em Código LaTeX e KaTeX Nativo
                  </td>
                  <td className="p-4 text-center font-bold text-emerald-600 bg-blue-50/20 dark:bg-blue-950/20">
                    <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-500" />
                  </td>
                  <td className="p-4 text-center text-slate-400 text-xs">
                    Formatação quebra
                  </td>
                  <td className="p-4 text-center text-slate-400 text-xs">
                    Estático em papel
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. DISCIPLINES COVERED */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Matérias Suportadas
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Cobertura Completa do Ciclo Básico de Engenharia
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Do primeiro dia de aula até a aprovação em todas as matérias de corte.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Cálculo I, II, III e IV',
              topics: 'Limites ε-δ, Derivadas, Integrais Duplas/Triplas, Teoremas de Green, Stokes e Gauss, EDOs lineares e não-lineares.',
              icon: '∫',
              color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60'
            },
            {
              title: 'Física I, II, III e IV',
              topics: 'Mecânica Newtoniana, Rotação e Momento Angular, Ondas e Termodinâmica, Eletromagnetismo de Maxwell, Óptica.',
              icon: '⚡',
              color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
            },
            {
              title: 'Álgebra Linear & G.A.',
              topics: 'Espaços Vetoriais, Subespaços, Transformações Lineares, Polinômio Característico, Autovalores e Diagonalização.',
              icon: 'λ',
              color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60'
            },
            {
              title: 'Mecânica dos Sólidos',
              topics: 'Equilíbrio Estático de Corpos Rígidos, Diagramas de Força Cortante V(x) e Momento Fletor M(x), Tensão e Deformação.',
              icon: '🏗️',
              color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60'
            },
            {
              title: 'Química Geral para Engenharia',
              topics: 'Estequiometria Avançada, Termoquímica, Cinética de Reação, Equilíbrio Químico e Eletroquímica (Células Galvânicas).',
              icon: '⚗️',
              color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60'
            },
            {
              title: 'Simulados & Listas por Banca',
              topics: 'Gere listas de exercícios inéditas com gabarito detalhado calibradas para o tempo e o nível de dificuldade da sua faculdade.',
              icon: '⏱️',
              color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5 hover:border-blue-300 dark:hover:border-blue-700 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.topics}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. UNIVERSITY RIGOR SHOWCASE */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              Todas as Faculdades do Brasil
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Calibrado para Todas as Públicas e Particulares
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Nossa IA analisa os padrões de prova oficiais de mais de 100 faculdades, públicas, militares, comunitárias e particulares.
            </p>
          </div>

          {/* Quick University Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ALL_BRAZILIAN_UNIVERSITIES.slice(0, 18).map((uni: UniversityProfile) => (
              <button
                key={uni.id}
                type="button"
                onClick={() => {
                  onOpenUniversityModal();
                }}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  uni.id === currentUniversity.id
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{uni.shortName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold">
                      {uni.rigorScore}%
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{uni.name}</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-2">{uni.type}</span>
              </button>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onOpenUniversityModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200 dark:border-blue-800 transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Ver todas as 100+ Faculdades Brasileiras ou Cadastrar a Sua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. STUDENT TESTIMONIALS */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Resultados Reais
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            O que dizem os estudantes que garantiram a aprovação
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Lucas M.',
              course: 'Engenharia Mecânica • Poli-USP',
              stars: 5,
              text: 'Estava quase desistindo de Cálculo II após tirar 2,8 na P1. O EngenhariaFlow me mostrou exatamente onde a banca tirava meus pontos: eu esquecia de justificar a continuidade da superfície antes de aplicar Stokes. Subi para 8,5 na P2 e passei sem final!'
            },
            {
              name: 'Beatriz S.',
              course: 'Engenharia Civil • UFRJ',
              stars: 5,
              text: 'O simulador de prova com o tempo real da UFRJ mudou minha rotina. Você treina sob a pressão do relógio e não é pego de surpresa na hora da prova. O Caderno de Erros eliminou meus erros bobos de conta.'
            },
            {
              name: 'Gabriel R.',
              course: 'Engenharia Elétrica • UFMG',
              stars: 5,
              text: 'A melhor ferramenta para o ciclo básico de engenharia. As demonstrações em KaTeX são completas e nítidas. O ChatGPT comum sempre pulava o Jacobiano em coordenadas esféricas; o EngenhariaFlow explica até a intuição física.'
            }
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{t.text}"
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{t.name}</div>
                <div className="text-[11px] font-mono text-slate-400">{t.course}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. HIGH CONVERTING FINAL CTA SECTION (NO PRICE DISPLAYED AS REQUESTED) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-950 dark:to-[#080d1a]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ciclo Básico Sob Controle</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Pronto para transformar suas notas em Cálculo e Física?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Pare de perder noites de sono tentando adivinhar passagens de livros ou sendo surpreendido por critérios ocultos da banca. Conheça agora a ferramenta definitiva do ciclo básico.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onEnterApp('solver')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Acessar Plataforma Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenUniversityModal}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-base border border-slate-300 dark:border-slate-800 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>Calibrar Minha Faculdade</span>
            </button>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Acesso Imediato
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Sem Cartão de Crédito
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> 100% das Faculdades
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
