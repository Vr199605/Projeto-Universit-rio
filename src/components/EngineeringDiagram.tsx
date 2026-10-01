import React from 'react';

interface EngineeringDiagramProps {
  type: string;
  className?: string;
}

export const EngineeringDiagram: React.FC<EngineeringDiagramProps> = ({ type, className = '' }) => {
  if (type === 'stokes_paraboloid') {
    return (
      <div className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 my-3 flex flex-col items-center justify-center ${className}`}>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Diagrama Geométrico 3D: Superfície S & Fronteira ∂S = C
        </div>
        <svg
          viewBox="0 0 460 220"
          className="w-full max-w-[420px] h-auto drop-shadow-sm select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="paraboloidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="diskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
            </linearGradient>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
            </marker>
            <marker id="arrow-axis" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Coordinate Axes */}
          {/* Z axis */}
          <line x1="230" y1="210" x2="230" y2="25" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="230" y1="70" x2="230" y2="18" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-axis)" />
          <text x="238" y="24" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace">z</text>

          {/* X axis */}
          <line x1="230" y1="160" x2="110" y2="200" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-axis)" />
          <text x="100" y="208" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace">x</text>

          {/* Y axis */}
          <line x1="230" y1="160" x2="365" y2="160" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-axis)" />
          <text x="372" y="164" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace">y</text>

          {/* Base Boundary Disk D (z = 0) */}
          <ellipse cx="230" cy="160" rx="110" ry="36" fill="url(#diskGrad)" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Paraboloid Body: z = 4 - x^2 - y^2 */}
          <path
            d="M 120 160 C 120 70, 340 70, 340 160"
            fill="url(#paraboloidGrad)"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Vertex indicator (0, 0, 4) */}
          <circle cx="230" cy="70" r="3.5" fill="#3b82f6" />
          <text x="240" y="72" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="system-ui">Vértice (0,0,4)</text>

          {/* Normal vector on paraboloid n_S */}
          <line x1="180" y1="95" x2="160" y2="60" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="135" y="65" fill="#3b82f6" fontSize="11" fontWeight="600">n (S)</text>

          {/* Normal vector on flat disk n_D = k */}
          <line x1="260" y1="160" x2="260" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
          <text x="268" y="128" fill="#10b981" fontSize="11" fontWeight="600">n = k (0,0,1)</text>

          {/* Boundary Curve C with orientation arrow */}
          <path
            d="M 120 160 A 110 36 0 0 0 340 160"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
          />
          <path
            d="M 240 196 L 255 194 L 245 188"
            fill="#f59e0b"
          />
          <text x="258" y="210" fill="#f59e0b" fontSize="11" fontWeight="bold">Curva C: raio R = 2 (sentido anti-horário)</text>

          {/* Equivalence note */}
          <rect x="290" y="30" width="155" height="42" rx="6" fill="#0f172a" fillOpacity="0.8" stroke="#334155" />
          <text x="298" y="47" fill="#38bdf8" fontSize="10.5" fontWeight="600">Stokes: ∂S = ∂D = C</text>
          <text x="298" y="62" fill="#94a3b8" fontSize="9.5">Substituição por disco plano z=0</text>
        </svg>
      </div>
    );
  }

  if (type === 'angular_momentum_disks') {
    return (
      <div className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 my-3 flex flex-col items-center justify-center ${className}`}>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Diagrama Físico: Acoplamento Inelástico Rotacional
        </div>
        <svg
          viewBox="0 0 460 190"
          className="w-full max-w-[420px] h-auto drop-shadow-sm select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="rot-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Central Shaft */}
          <line x1="230" y1="20" x2="230" y2="175" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="230" cy="20" r="4" fill="#64748b" />
          <circle cx="230" cy="175" r="4" fill="#64748b" />

          {/* Falling Ring (Above) */}
          <ellipse cx="230" cy="55" rx="75" ry="18" fill="none" stroke="#f43f5e" strokeWidth="4" strokeDasharray="6 2" />
          <text x="320" y="58" fill="#f43f5e" fontSize="11" fontWeight="bold">Anel (m = 1,0 kg, IA = mR²)</text>
          
          {/* Drop arrows */}
          <path d="M 190 70 L 190 92 M 270 70 L 270 92" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="212" y="85" fill="#f43f5e" fontSize="10">queda</text>

          {/* Rotating Disk (Below) */}
          <ellipse cx="230" cy="125" rx="90" ry="24" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="330" y="130" fill="#3b82f6" fontSize="11" fontWeight="bold">Disco (M = 2,0 kg, ID = ½MR²)</text>

          {/* Rotation Indicator Arrow */}
          <path
            d="M 170 142 A 75 16 0 0 0 290 142"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            markerEnd="url(#rot-arrow)"
          />
          <text x="205" y="165" fill="#6366f1" fontSize="11" fontWeight="600">ω₀ = 12 rad/s → ωf = 6 rad/s</text>
        </svg>
      </div>
    );
  }

  if (type === 'beam_diagram') {
    return (
      <div className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 my-3 flex flex-col items-center justify-center ${className}`}>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Diagrama Estrutural: Viga Biapoiada com Carga Distribuída
        </div>
        <svg
          viewBox="0 0 460 160"
          className="w-full max-w-[420px] h-auto drop-shadow-sm select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Distributed load arrows */}
          {Array.from({ length: 9 }).map((_, i) => {
            const x = 70 + i * 40;
            return (
              <g key={i}>
                <line x1={x} y1="30" x2={x} y2="65" stroke="#ef4444" strokeWidth="1.5" />
                <polygon points={`${x-3},58 ${x+3},58 ${x},65`} fill="#ef4444" />
              </g>
            );
          })}
          <line x1="70" y1="30" x2="390" y2="30" stroke="#ef4444" strokeWidth="1.5" />
          <text x="200" y="24" fill="#ef4444" fontSize="11" fontWeight="bold">q = 8,0 kN/m</text>

          {/* Beam element */}
          <rect x="70" y="65" width="320" height="12" rx="2" fill="#64748b" />

          {/* Supports */}
          {/* Left pin support A */}
          <polygon points="70,77 60,95 80,95" fill="#3b82f6" />
          <line x1="55" y1="95" x2="85" y2="95" stroke="#3b82f6" strokeWidth="2" />
          <text x="45" y="115" fill="#3b82f6" fontSize="11" fontWeight="bold">RA = 24 kN</text>

          {/* Right roller support B */}
          <polygon points="390,77 380,95 400,95" fill="#3b82f6" />
          <circle cx="384" cy="99" r="3" fill="#3b82f6" />
          <circle cx="396" cy="99" r="3" fill="#3b82f6" />
          <line x1="375" y1="104" x2="405" y2="104" stroke="#3b82f6" strokeWidth="2" />
          <text x="365" y="122" fill="#3b82f6" fontSize="11" fontWeight="bold">RB = 24 kN</text>

          {/* Dimension line */}
          <line x1="70" y1="135" x2="390" y2="135" stroke="#94a3b8" strokeWidth="1" />
          <line x1="70" y1="130" x2="70" y2="140" stroke="#94a3b8" strokeWidth="1" />
          <line x1="390" y1="130" x2="390" y2="140" stroke="#94a3b8" strokeWidth="1" />
          <text x="215" y="148" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace">L = 6,0 m</text>
        </svg>
      </div>
    );
  }

  return null;
};
