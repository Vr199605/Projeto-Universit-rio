import { ProblemSolution, ExamQuestion, ErrorNotebookItem } from '../types';

export const CALC2_STOKES_PROBLEM: ProblemSolution = {
  id: 'calc2-stokes-01',
  title: 'Cálculo II: Teorema de Stokes e Trabalho ao Longo de Fronteira Paraboloidal',
  originalText: `Calcule o trabalho do campo de forças $\\mathbf{F}(x, y, z) = (z^2 - x, \\; x + y, \\; y^2 + z)$ ao longo da curva fechada $C$, dada pela interseção do parabolóide $z = 4 - x^2 - y^2$ com o plano $z = 0$, percorrida no sentido anti-horário quando vista do semieixo positivo $z$.`,
  discipline: 'Cálculo II',
  topic: 'Teorema de Stokes & Campos Vetoriais',
  difficulty: 'Média',
  difficultyTag: 'P3 Típica Politécnica / UFRJ / Unicamp',
  estimatedTime: '12 min',
  detailMode: 'didatico',
  prerequisites: [
    'Rotacional (Curl) de Campo Tridimensional: $\\nabla \\times \\mathbf{F}$',
    'Teorema Fundamental de Stokes: $\\oint_{\\partial S} \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}$',
    'Parametrização de Superfície e Vetor Normal Unitário',
    'Coordenadas Polares e Integrais Duplas'
  ],
  steps: [
    {
      id: 'step-1',
      number: 1,
      title: 'Identificação dos Dados Fornecidos e Hipóteses de Contorno',
      subtitle: 'Geometria da curva C e escolha da superfície orientável',
      badge: 'Geometria & Domínio',
      content: `O problema solicita o trabalho $W = \\oint_C \\mathbf{F} \\cdot d\\mathbf{r}$ de um campo vetorial ao longo de uma curva fechada no espaço.

**1. Fronteira da Superfície ($C$):**
A curva $C$ é a interseção do parabolóide $z = 4 - x^2 - y^2$ com o plano horizontal $z = 0$:
$$0 = 4 - x^2 - y^2 \\implies x^2 + y^2 = 4$$
Logo, $C$ é uma circunferência de centro na origem e raio $R = 2$ no plano $xy$.

**2. Sentido e Orientação Induzida:**
A curva é percorrida no sentido anti-horário vista de cima ($z > 0$). Pela regra da mão direita, a normal induzida na superfície deve apontar para o semiespaço positivo em $z$ ($\mathbf{n} \\cdot \\mathbf{k} > 0$).

**3. Simplificação Astuta de Engenharia:**
Como o Teorema de Stokes afirma que a integral de linha depende **apenas da fronteira $C = \\partial S$**, podemos substituir a superfície encurvada do parabolóide pelo disco plano horizontal:
$$D = \\{(x, y, 0) \\in \\mathbb{R}^3 : x^2 + y^2 \\le 4\\}$$
Ambas as superfícies têm exatamente a mesma borda orientada $C$, mas o disco plano possui vetor normal constante e trivial $\\mathbf{n} = \\mathbf{k} = (0, 0, 1)$!`,
      diagramSvg: 'stokes_paraboloid',
      notes: 'Dica de Ouro: Sempre verifique se é possível trocar uma superfície complexa por uma superfície plana que possua a mesma fronteira!'
    },
    {
      id: 'step-2',
      number: 2,
      title: 'Fórmulas, Leis e Teoremas Aplicáveis',
      subtitle: 'Enunciado formal do Teorema de Stokes',
      badge: 'Teorema Central',
      content: `O Teorema de Stokes estabelece a relação entre a circulação ao longo de uma curva fechada $C$ e o fluxo do rotacional através de uma superfície orientada $S$ cuja fronteira é $C$:

$$\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} \\, dS$$

**Condições de Aplicabilidade:**
- O campo vetorial $\\mathbf{F} = (P, Q, R) = (z^2 - x, \\; x + y, \\; y^2 + z)$ possui componentes com funções polinomiais, logo é de classe $C^\\infty$ em todo $\\mathbb{R}^3$ (portanto satisfaz $C^1$).
- A superfície $S$ é conexa, suave por partes e orientável.
- A curva $C = \\partial S$ é simples, fechada e orientada positivamente.`,
      notes: 'O Teorema de Stokes é a generalização tridimensional do Teorema de Green.'
    },
    {
      id: 'step-3',
      number: 3,
      title: 'Desenvolvimento Algébrico Detalhado',
      subtitle: 'Cálculo do rotacional e da integral de superfície',
      badge: 'Cálculo Algébrico',
      content: `Vamos calcular o operador rotacional $\\nabla \\times \\mathbf{F}$ via determinante formal:

$$\\nabla \\times \\mathbf{F} = \\begin{vmatrix} 
\\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 
\\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ 
z^2 - x & x + y & y^2 + z 
\\end{vmatrix}$$

Expandindo termo a termo:
- Componente $\\mathbf{i}$: $\\frac{\\partial}{\\partial y}(y^2 + z) - \\frac{\\partial}{\\partial z}(x + y) = 2y - 0 = 2y$
- Componente $-\\mathbf{j}$: $\\frac{\\partial}{\\partial x}(y^2 + z) - \\frac{\\partial}{\\partial z}(z^2 - x) = 0 - 2z = -2z \\implies -(-2z)\\mathbf{j} = +2z\\mathbf{j}$
- Componente $\\mathbf{k}$: $\\frac{\\partial}{\\partial x}(x + y) - \\frac{\\partial}{\\partial y}(z^2 - x) = 1 - 0 = 1$

Portanto, o rotacional vale:
$$\\nabla \\times \\mathbf{F} = (2y, \\; 2z, \\; 1)$$

**Avaliando sobre o disco plano $D$:**
No disco plano $D$, temos $z = 0$ e a normal unitária orientada para cima é $\\mathbf{n} = (0, 0, 1)$.
Efetuando o produto escalar do integrando:
$$(\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} = (2y, \\; 2(0), \\; 1) \\cdot (0, 0, 1) = 2y(0) + 0(0) + 1(1) = 1$$

O integrando tornou-se uma constante unitária! Agora calculamos a integral sobre o disco $D$:
$$\\iint_D (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} \\, dS = \\iint_D 1 \\, dA = \\text{Área}(D)$$

Como o raio do disco é $R = 2$:
$$\\text{Área}(D) = \\pi R^2 = \\pi (2)^2 = 4\\pi$$`,
      notes: 'Atenção aos sinais ao expandir a segunda componente do determinante do rotacional.'
    },
    {
      id: 'step-4',
      number: 4,
      title: 'Resultado Final e Interpretação Física',
      subtitle: 'Conclusão do trabalho realizado com unidades',
      badge: 'Solução Conclusiva',
      content: `O trabalho realizado pelo campo de forças ao longo do bordo fechado $C$ é:

$$W = \\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = 4\\pi \\approx 12{,}5664 \\text{ J}$$

**Interpretação Física:**
Como a integral fechada de linha é diferente de zero ($W \\neq 0$), o campo de forças $\\mathbf{F}$ **não é conservativo**. Há circulação líquida positiva, gerando ganho energético por ciclo no sentido anti-horário.`,
      notes: 'Resultado rigoroso obtido sem necessidade de parametrização trigonométrica direta de C.'
    }
  ],
  finalResult: {
    value: '4\\pi',
    unit: 'Joules (J)',
    latexDisplay: 'W = \\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = 4\\pi \\approx 12{,}566 \\text{ J}',
    summaryText: 'O trabalho resultante do campo de forças ao longo do contorno circular é exatamente 4π Joules.',
    insight: 'Ao aplicar o Teorema de Stokes com a substituição pelo disco plano z=0, reduzimos uma integral dupla complexa de parabolóide a um cálculo direto de área de círculo.'
  },
  similarQuestionPrompt: 'Deseja treinar uma variação com o parabolóide invertido z = 9 - x² - y² e campo F(x,y,z) = (y, -x, z²)?'
};

export const FISICA1_MOMENTO_ANGULAR: ProblemSolution = {
  id: 'fis1-momento-angular-01',
  title: 'Física I: Conservação do Momento Angular e Dissipação de Energia em Colisão Rotacional',
  originalText: `Um disco horizontal homogêneo de massa $M = 2{,}0\\text{ kg}$ e raio $R = 0{,}5\\text{ m}$ gira livremente em torno de um eixo vertical sem atrito com velocidade angular inicial $\\omega_0 = 12\\text{ rad/s}$. Um segundo corpo, um anel fino homogêneo de massa $m = 1{,}0\\text{ kg}$ e mesmo raio $R$, é solto suavemente de uma pequena altura sobre o disco. Devido ao atrito mútuo entre as superfícies, o anel logo atinge a mesma rotação do disco. 

Calcule:
a) A velocidade angular final do sistema $\\omega_f$.
b) A energia mecânica dissipada durante o acoplamento $\\Delta E$.`,
  discipline: 'Física I',
  topic: 'Dinâmica de Rotação & Momento Angular',
  difficulty: 'Média',
  difficultyTag: 'Prova Oficial USP / Poli',
  estimatedTime: '10 min',
  detailMode: 'didatico',
  prerequisites: [
    'Momento de Inércia do Disco: $I_D = \\frac{1}{2} M R^2$',
    'Momento de Inércia do Anel Fino: $I_A = m R^2$',
    'Conservação do Momento Angular: $\\sum \\tau_{\\text{ext}} = 0 \\implies L_i = L_f$',
    'Energia Cinética de Rotação: $K_{\\text{rot}} = \\frac{1}{2} I \\omega^2$'
  ],
  steps: [
    {
      id: 'fis-step-1',
      number: 1,
      title: 'Hipóteses Físicas e Definição dos Momentos de Inércia',
      subtitle: 'Isolamento do sistema e momentos de inércia em relação ao eixo vertical',
      badge: 'Fundamentos',
      content: `Consideramos o sistema composto pelo **Disco + Anel**.
Como as forças de atrito entre os dois corpos são estritamente **internas** ao sistema e não há torques externos aplicados ao longo do eixo vertical ($\sum \\tau_z^{\\text{ext}} = 0$), o momento angular total em relação ao eixo $z$ se conserva:
$$L_z^{\\text{inicial}} = L_z^{\\text{final}}$$

**Momentos de Inércia em Relação ao Eixo Central:**
1. Disco homogêneo:
$$I_D = \\frac{1}{2} M R^2 = \\frac{1}{2} (2{,}0) (0{,}5)^2 = 0{,}25 \\text{ kg}\\cdot\\text{m}^2$$

2. Anel fino:
$$I_A = m R^2 = (1{,}0) (0{,}5)^2 = 0{,}25 \\text{ kg}\\cdot\\text{m}^2$$

O momento de inércia final do conjunto acoplado é a soma:
$$I_{\\text{total}} = I_D + I_A = 0{,}25 + 0{,}25 = 0{,}50 \\text{ kg}\\cdot\\text{m}^2$$`,
      diagramSvg: 'angular_momentum_disks',
      notes: 'Note que anel fino tem toda sua massa concentrada na borda R, por isso seu I não leva o fator 1/2.'
    },
    {
      id: 'fis-step-2',
      number: 2,
      title: 'Determinação da Velocidade Angular Final (Item a)',
      subtitle: 'Aplicação da Lei da Conservação do Momento Angular',
      badge: 'Conservação de L',
      content: `Antes do acoplamento, apenas o disco estava em rotação:
$$L_i = I_D \\omega_0 = (0{,}25 \\text{ kg}\\cdot\\text{m}^2)(12\\text{ rad/s}) = 3{,}0 \\text{ kg}\\cdot\\text{m}^2/\\text{s}$$

Após o acoplamento, ambos giram com velocidade angular comum $\\omega_f$:
$$L_f = (I_D + I_A) \\omega_f = (0{,}50) \\omega_f$$

Pela conservação:
$$L_i = L_f \\implies 3{,}0 = 0{,}50 \\,\\omega_f \\implies \\omega_f = \\frac{3{,}0}{0{,}50} = 6{,}0 \\text{ rad/s}$$

A velocidade angular cai pela metade porque o momento de inércia total duplicou.`,
      notes: 'Analogia direta com uma colisão perfeitamente inelástica linear: p_i = p_f.'
    },
    {
      id: 'fis-step-3',
      number: 3,
      title: 'Balanço Energético e Dissipação (Item b)',
      subtitle: 'Cálculo da variação de energia cinética rotacional',
      badge: 'Termodinâmica / Atrito',
      content: `**Energia Cinética Inicial ($K_i$):**
$$K_i = \\frac{1}{2} I_D \\omega_0^2 = \\frac{1}{2} (0{,}25) (12)^2 = \\frac{1}{2} \\times 0{,}25 \\times 144 = 18{,}0 \\text{ J}$$

**Energia Cinética Final ($K_f$):**
$$K_f = \\frac{1}{2} I_{\\text{total}} \\omega_f^2 = \\frac{1}{2} (0{,}50) (6{,}0)^2 = \\frac{1}{2} \\times 0{,}50 \\times 36 = 9{,}0 \\text{ J}$$

**Energia Dissipada pelo Atrito:**
$$\\Delta K = K_f - K_i = 9{,}0 - 18{,}0 = -9{,}0 \\text{ J}$$
Portanto, a energia dissipada na forma de calor e desgaste superficial é de $9{,}0 \\text{ J}$ ($50\\%$ da energia inicial).`,
      notes: 'Mesmo com momento angular conservado, há perda severa de energia cinética mecânica devido ao escorregamento inicial.'
    }
  ],
  finalResult: {
    value: '\\omega_f = 6{,}0\\text{ rad/s}, \\quad E_{\\text{dissipada}} = 9{,}0\\text{ J}',
    unit: 'rad/s e Joules',
    latexDisplay: '\\omega_f = 6{,}0 \\text{ rad/s} \\quad \\text{e} \\quad |\\Delta K| = 9{,}0 \\text{ J}',
    summaryText: 'A velocidade angular final é 6,0 rad/s e foram dissipados 9,0 J em calor durante o atrito.',
    insight: 'Como I duplicou de 0,25 para 0,50 kg·m², ω reduziu à metade, o que resulta em 50% de dissipação de energia cinética.'
  }
};

export const ALGEBRA_DIAGONALIZACAO: ProblemSolution = {
  id: 'alglin-diag-01',
  title: 'Álgebra Linear: Diagonalização de Operador Linear e Determinação de Autoespaços',
  originalText: `Dada a matriz simétrica $A = \\begin{pmatrix} 3 & 1 \\\\ 1 & 3 \\end{pmatrix}$, determine:
a) Os autovalores $\\lambda_1$ e $\\lambda_2$.
b) Os respectivos autovetores ortonormais associados.
c) A matriz de passagem ortogonal $P$ e a matriz diagonal $D$ tais que $P^T A P = D$.`,
  discipline: 'Álgebra Linear',
  topic: 'Autovalores, Autovetores e Diagonalização',
  difficulty: 'Fácil',
  difficultyTag: 'P2 Clássica Engenharia',
  estimatedTime: '8 min',
  detailMode: 'didatico',
  prerequisites: [
    'Polinômio Característico: $p(\\lambda) = \\det(A - \\lambda I) = 0$',
    'Teorema Espectral para Matrizes Simétricas Reais',
    'Normalização de Vetores: $\\mathbf{u} = \\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|}$'
  ],
  steps: [
    {
      id: 'alg-step-1',
      number: 1,
      title: 'Cálculo dos Autovalores',
      subtitle: 'Resolução da equação secular det(A - λI) = 0',
      badge: 'Polinômio Característico',
      content: `Montamos o determinante de $A - \\lambda I$:
$$\\det \\begin{pmatrix} 3 - \\lambda & 1 \\\\ 1 & 3 - \\lambda \\end{pmatrix} = (3 - \\lambda)^2 - 1^2 = 0$$

Fatorando como diferença de quadrados:
$$(3 - \\lambda - 1)(3 - \\lambda + 1) = (2 - \\lambda)(4 - \\lambda) = 0$$

Portanto, os autovalores são:
$$\\lambda_1 = 4, \\quad \\lambda_2 = 2$$`,
      notes: 'Como A é simétrica real, todos os seus autovalores são reais e os autoespaços associados a autovalores distintos são mutuamente ortogonais.'
    },
    {
      id: 'alg-step-2',
      number: 2,
      title: 'Determinação dos Autovetores e Ortonormalização',
      subtitle: 'Sistemas homogêneos (A - λI)v = 0',
      badge: 'Autoespaços',
      content: `**Para $\\lambda_1 = 4$:**
$$(A - 4I)\\mathbf{v}_1 = \\begin{pmatrix} -1 & 1 \\\\ 1 & -1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} \\implies -x + y = 0 \\implies x = y$$
Um autovetor associado é $\\mathbf{v}_1 = (1, 1)^T$.
Normalizando:
$$\\mathbf{u}_1 = \\frac{1}{\\sqrt{1^2 + 1^2}} \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 1/\\sqrt{2} \\\\ 1/\\sqrt{2} \\end{pmatrix}$$

**Para $\\lambda_2 = 2$:**
$$(A - 2I)\\mathbf{v}_2 = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} \\implies x + y = 0 \\implies y = -x$$
Um autovetor associado é $\\mathbf{v}_2 = (1, -1)^T$.
Normalizando:
$$\\mathbf{u}_2 = \\begin{pmatrix} 1/\\sqrt{2} \\\\ -1/\\sqrt{2} \\end{pmatrix}$$`,
      notes: 'Observe que <u1, u2> = (1/√2)(1/√2) + (1/√2)(-1/√2) = 1/2 - 1/2 = 0 (ortogonalidade confirmada).'
    },
    {
      id: 'alg-step-3',
      number: 3,
      title: 'Construção das Matrizes P e D',
      subtitle: 'Formulação ortogonal e verificação',
      badge: 'Diagonalização',
      content: `A matriz ortogonal $P$ é formada pelos autovetores unitários em colunas:
$$P = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$$

A matriz diagonal $D$ contém os autovalores correspondentes na diagonal principal:
$$D = \\begin{pmatrix} 4 & 0 \\\\ 0 & 2 \\end{pmatrix}$$

Pelo Teorema Espectral: $P^{-1} = P^T$, portanto $P^T A P = D$.`,
      notes: 'Matriz diagonalizada com sucesso!'
    }
  ],
  finalResult: {
    value: 'D = diag(4, 2)',
    latexDisplay: 'P = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}, \\quad D = \\begin{pmatrix} 4 & 0 \\\\ 0 & 2 \\end{pmatrix}',
    summaryText: 'Autovalores λ₁=4 e λ₂=2; Matriz ortogonal P composta pelos autovetores normalizados.',
    insight: 'Como a matriz inicial era simétrica real, a diagonalização ortogonal foi garantida sem necessidade do processo de Gram-Schmidt.'
  }
};

export const MEC_SOLIDOS_VIGA: ProblemSolution = {
  id: 'mecsol-viga-01',
  title: 'Mecânica dos Sólidos: Diagrama de Esforço Cortante e Momento Fletor em Viga Biapoiada',
  originalText: `Uma viga biapoiada de comprimento $L = 6{,}0\\text{ m}$ está submetida a uma carga distribuída uniforme $q = 8{,}0\\text{ kN/m}$ ao longo de todo o vão. Determine as reações de apoio, as funções analíticas de esforço cortante $V(x)$ e momento fletor $M(x)$, e calcule o momento fletor máximo na seção crítica.`,
  discipline: 'Mecânica dos Sólidos',
  topic: 'Diagramas de Esforços Solicitantes (DEC e DMF)',
  difficulty: 'Média',
  difficultyTag: 'Prova Clássica de Resistência dos Materiais',
  estimatedTime: '10 min',
  detailMode: 'didatico',
  prerequisites: [
    'Equilíbrio Estático de Corpos Rígidos: $\\sum F_y = 0$, $\\sum M = 0$',
    'Relações Diferenciais de Viga: $\\frac{dV}{dx} = -q(x)$, $\\frac{dM}{dx} = V(x)$',
    'Convenção de Sinais da Resistência dos Materiais'
  ],
  steps: [
    {
      id: 'mec-step-1',
      number: 1,
      title: 'Equilíbrio Global e Reações de Apoio',
      subtitle: 'Simetria e equações de estática',
      badge: 'Estática',
      content: `A carga total atuante na viga vale:
$$Q_{\\text{total}} = q \\cdot L = (8{,}0 \\text{ kN/m}) \\cdot (6{,}0 \\text{ m}) = 48{,}0 \\text{ kN}$$

Por simetria geométrica e de carregamento em relação ao ponto médio:
$$R_A = R_B = \\frac{Q_{\\text{total}}}{2} = \\frac{48{,}0}{2} = 24{,}0 \\text{ kN}$$`,
      diagramSvg: 'beam_diagram',
      notes: 'Equilíbrio verificado: 24 + 24 - 48 = 0.'
    },
    {
      id: 'mec-step-2',
      number: 2,
      title: 'Equações Analíticas dos Esforços Internos',
      subtitle: 'Corte genérico a uma distância x da extremidade esquerda (0 ≤ x ≤ L)',
      badge: 'Equações Analíticas',
      content: `Realizando uma seção transversal genérica a uma coordenada $x$:

**Esforço Cortante $V(x)$:**
$$\\sum F_y = 0 \\implies R_A - q\\cdot x - V(x) = 0 \\implies V(x) = 24 - 8x \\quad [\\text{kN}]$$
Nos apoios:
- $V(0) = +24\\text{ kN}$
- $V(6) = 24 - 8(6) = -24\\text{ kN}$
- O esforço cortante se anula onde $24 - 8x = 0 \\implies x = 3{,}0\\text{ m}$ (centro do vão).

**Momento Fletor $M(x)$:**
Integrando o esforço cortante:
$$M(x) = \\int V(x)\\,dx = 24x - 4x^2 \\quad [\\text{kN}\\cdot\\text{m}]$$
Nos extremos: $M(0) = 0$ e $M(6) = 24(6) - 4(36) = 144 - 144 = 0$.`,
      notes: 'Onde o esforço cortante se anula, o momento fletor atinge seu valor extremo!'
    },
    {
      id: 'mec-step-3',
      number: 3,
      title: 'Momento Fletor Máximo na Seção Crítica',
      subtitle: 'Substituição em x = L/2 = 3,0 m',
      badge: 'Dimensionamento',
      content: `Substituindo $x = 3{,}0\\text{ m}$ na equação da parábola de momento fletor:
$$M_{\\max} = M(3) = 24(3) - 4(3)^2 = 72 - 36 = 36{,}0 \\text{ kN}\\cdot\\text{m}$$

Conferindo pela fórmula clássica de vigas uniformemente carregadas:
$$M_{\\max} = \\frac{q L^2}{8} = \\frac{8{,}0 \\times (6{,}0)^2}{8} = \\frac{8{,}0 \\times 36}{8} = 36{,}0 \\text{ kN}\\cdot\\text{m}$$`,
      notes: 'Fórmula padrão qL²/8 conferida perfeitamente.'
    }
  ],
  finalResult: {
    value: 'M_{\\max} = 36{,}0 \\text{ kN}\\cdot\\text{m}',
    unit: 'kN·m',
    latexDisplay: 'M_{\\max} = \\frac{qL^2}{8} = 36{,}0 \\text{ kN}\\cdot\\text{m} \\quad \\text{em } x = 3{,}0 \\text{ m}',
    summaryText: 'Reações verticais RA = RB = 24 kN e momento fletor máximo de 36,0 kN·m localizado no centro do vão.',
    insight: 'A seção em x = 3,0m é a mais solicitada à flexão e dita o dimensionamento do perfil metálico ou da armadura longitudinal de concreto.'
  }
};

export const ALL_PRESET_SOLUTIONS: Record<string, ProblemSolution> = {
  'calc2-stokes': CALC2_STOKES_PROBLEM,
  'fis1-momento': FISICA1_MOMENTO_ANGULAR,
  'alglin-diag': ALGEBRA_DIAGONALIZACAO,
  'mecsol-viga': MEC_SOLIDOS_VIGA,
};

// Exam Questions for Tab 3
export const MOCK_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 'q1',
    number: 1,
    discipline: 'Cálculo II',
    topic: 'Teorema da Divergência (Gauss)',
    difficulty: 'Média',
    statement: `Utilize o Teorema da Divergência de Gauss para calcular o fluxo para fora do campo $\\mathbf{F}(x,y,z) = (x^3, y^3, z^3)$ através da superfície da esfera unitária $S: x^2 + y^2 + z^2 = 1$.`,
    type: 'discursiva',
    modelAnswer: `1. Calculamos o divergente: $\\nabla \\cdot \\mathbf{F} = 3x^2 + 3y^2 + 3z^2 = 3(x^2 + y^2 + z^2)$.
2. Pelo Teorema de Gauss: $\\iint_S \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_V 3(x^2+y^2+z^2) \\, dV$.
3. Em coordenadas esféricas: $x^2+y^2+z^2 = \\rho^2$ e $dV = \\rho^2 \\sin\\phi \\, d\\rho \\, d\\phi \\, d\\theta$.
4. $\\int_0^{2\\pi} d\\theta \\int_0^\\pi \\sin\\phi \\, d\\phi \\int_0^1 3\\rho^4 \\, d\\rho = 2\\pi \\times 2 \\times \\left[ \\frac{3\\rho^5}{5} \\right]_0^1 = \\frac{12\\pi}{5}$.`,
    scoringGuide: '2.5 pontos: 0.5 divergente, 0.5 teorema de Gauss, 1.0 integração esférica, 0.5 resultado final.'
  },
  {
    id: 'q2',
    number: 2,
    discipline: 'Física I',
    topic: 'Pêndulo Balístico & Energia',
    difficulty: 'Média',
    statement: `Um projétil de massa $m = 20\\text{ g}$ é disparado com velocidade horizontal $v_0$ contra um bloco de madeira de massa $M = 1{,}98\\text{ kg}$ suspenso por fios inextensíveis de comprimento $L = 1{,}5\\text{ m}$. O projétil fica encravado no bloco e o conjunto oscila até atingir uma altura máxima $h = 20\\text{ cm}$. Adote $g = 9{,}8\\text{ m/s}^2$. 
Determine a velocidade de disparo $v_0$.`,
    type: 'discursiva',
    modelAnswer: `1. Conservação da energia mecânica após a colisão: $\\frac{1}{2}(m+M)V^2 = (m+M)gh \\implies V = \\sqrt{2gh} = \\sqrt{2 \\times 9{,}8 \\times 0{,}2} = 1{,}98\\text{ m/s}$.
2. Conservação da quantidade de movimento durante a colisão inelástica: $m v_0 = (m+M)V$.
3. $v_0 = \\frac{m+M}{m} V = \\frac{0{,}02 + 1{,}98}{0{,}02} \\times 1{,}98 = 100 \\times 1{,}98 = 198\\text{ m/s}$.`,
    scoringGuide: '2.5 pontos: 1.0 cálculo de V via conservação de energia, 1.0 momento linear na colisão, 0.5 conta e unidade.'
  },
  {
    id: 'q3',
    number: 3,
    discipline: 'Álgebra Linear',
    topic: 'Transformações Lineares e Núcleo',
    difficulty: 'Fácil',
    statement: `Considere a transformação linear $T: \\mathbb{R}^3 \\to \\mathbb{R}^2$ dada por $T(x,y,z) = (x - 2y + z, \\; 2x - 4y + 2z)$. 
Determine a dimensão e uma base para o núcleo $\\ker(T)$ e para a imagem $\\text{Im}(T)$.`,
    type: 'discursiva',
    modelAnswer: `1. Note que a segunda coordenada é exatamente o dobro da primeira: $2x - 4y + 2z = 2(x - 2y + z)$.
2. Imagem: $\\text{Im}(T) = \\text{span}\\{(1, 2)\\}$, logo $\\dim(\\text{Im}(T)) = 1$. Base: $\\{(1, 2)\\}$.
3. Teorema do Núcleo e da Imagem: $\\dim(\\mathbb{R}^3) = \\dim(\\ker(T)) + \\dim(\\text{Im}(T)) \\implies 3 = \\dim(\\ker(T)) + 1 \\implies \\dim(\\ker(T)) = 2$.
4. Equação do núcleo: $x - 2y + z = 0 \\implies x = 2y - z$. Base do núcleo: $\\{(2, 1, 0), \\; (-1, 0, 1)\\}$.`,
    scoringGuide: '2.5 pontos: 1.0 dimensão e base da imagem, 1.0 equação e base do núcleo, 0.5 teorema de dimensões.'
  },
  {
    id: 'q4',
    number: 4,
    discipline: 'Cálculo I',
    topic: 'Otimização com Derivadas',
    difficulty: 'Média',
    statement: `Deseja-se construir uma caixa retangular sem tampa com base quadrada de lado $x$ e altura $h$, com volume fixado em $V = 32\\text{ m}^3$. Quais dimensões minimizam a área total de material gasto na construção?`,
    type: 'discursiva',
    modelAnswer: `1. Volume: $V = x^2 h = 32 \\implies h = \\frac{32}{x^2}$.
2. Área sem tampa: $A(x) = x^2 + 4xh = x^2 + 4x\\left(\\frac{32}{x^2}\\right) = x^2 + \\frac{128}{x}$.
3. Derivada primeira: $A'(x) = 2x - \\frac{128}{x^2} = 0 \\implies 2x^3 = 128 \\implies x^3 = 64 \\implies x = 4\\text{ m}$.
4. Altura: $h = \\frac{32}{4^2} = \\frac{32}{16} = 2\\text{ m}$.
5. Teste da segunda derivada: $A''(x) = 2 + \\frac{256}{x^3} > 0$ para $x > 0$, garantindo ponto de mínimo. Dimensões: $4\\text{ m} \\times 4\\text{ m} \\times 2\\text{ m}$.`,
    scoringGuide: '2.5 pontos: 0.5 função área, 1.0 derivada e ponto crítico, 0.5 justificativa de mínimo, 0.5 respostas corretas.'
  }
];

// Error Notebook initial data
export const INITIAL_ERROR_ITEMS: ErrorNotebookItem[] = [
  {
    id: 'err-1',
    problemTitle: 'Integral Dupla com Coordenadas Polares',
    discipline: 'Cálculo II',
    topic: 'Mudança de Variáveis',
    dateAdded: 'Hoje, 10:14',
    errorTag: 'Esqueceu Jacobiano',
    statement: 'Calcule $\\iint_D (x^2 + y^2) \\, dA$ onde $D$ é o círculo de raio 3.',
    myMistakeNotes: 'Troquei dA diretamente por dr dθ e esqueci de multiplicar pelo fator r (Jacobiano em polares). Deu 81π/4 em vez de 81π/2!',
    correctKeyStep: 'Lembrar sempre: $dA = r \\, dr \\, d\\theta$ nas integrais polares e $dV = \\rho^2 \\sin\\phi \\, d\\rho \\, d\\phi \\, d\\theta$ em esféricas.',
    masteryStatus: 'Precisa Praticar'
  },
  {
    id: 'err-2',
    problemTitle: 'Trabalho de Campo Eletrostático',
    discipline: 'Física III',
    topic: 'Potencial Elétrico',
    dateAdded: 'Ontem',
    errorTag: 'Erro de Sinal',
    statement: 'Calcule a ddp $V_B - V_A = -\\int_A^B \\mathbf{E} \\cdot d\\mathbf{l}$.',
    myMistakeNotes: 'Comi o sinal de menos da definição de potencial e somei o trabalho em vez de subtrair, invertendo o sentido espontâneo da carga.',
    correctKeyStep: 'A força elétrica faz trabalho positivo quando se desloca para potenciais mais baixos: $W = -q\\Delta V$.',
    masteryStatus: 'Em Revisão'
  },
  {
    id: 'err-3',
    problemTitle: 'Regra de L’Hôpital em Forma Indeterminada 1^∞',
    discipline: 'Cálculo I',
    topic: 'Limites Fundamentais',
    dateAdded: '28/09/2026',
    errorTag: 'Cálculo de Limite',
    statement: 'Calcule $\\lim_{x \\to 0} (1 + 2x)^{1/x}$.',
    myMistakeNotes: 'Tentei derivar numerador e denominador sem aplicar o logaritmo natural antes, pois a forma é 1^∞ e não 0/0.',
    correctKeyStep: 'Definir $y = (1+2x)^{1/x} \\implies \\ln y = \\frac{\\ln(1+2x)}{x}$. Agora sim aplicar L’Hôpital: limite é 2, logo $y = e^2$.',
    masteryStatus: 'Dominado'
  }
];

export const LIST_GENERATOR_SUBJECTS: { [key in string]: string[] } = {
  'Cálculo I': ['Limites e Continuidade', 'Regra da Cadeia & Derivação Implícita', 'Máximos e Mínimos (Otimização)', 'Integrais Definidas & Teorema Fundamental', 'Técnicas de Integração por Partes e Substituição'],
  'Cálculo II': ['Funções de Várias Variáveis & Gradiente', 'Máximos e Mínimos com Multiplicadores de Lagrange', 'Integrais Duplas & Triplas', 'Teorema de Green', 'Teorema de Stokes & Gauss'],
  'Cálculo III': ['Sequências e Séries Numéricas', 'Testes de Convergência', 'Séries de Taylor e Maclaurin', 'Equações Diferenciais Ordinárias (EDOs 1ª Ordem)', 'EDOs Lineares com Coeficientes Constantes'],
  'Cálculo IV': ['Funções de Variável Complexa', 'Transformada de Laplace e Aplicações', 'Séries de Fourier', 'Equações Diferenciais Parciais (EDPs da Onda e do Calor)'],
  'Física I': ['Cinemática Vetorial Tridimensional', 'Leis de Newton e Forças de Arrasto', 'Trabalho e Teorema da Energia Cinética', 'Conservação do Momento Linear & Colisões', 'Dinâmica do Corpo Rígido & Momento Angular'],
  'Física II': ['Oscilações Harmônicas Simples e Amortecidas', 'Ondas Mecânicas e Efeito Doppler', 'Estática e Dinâmica dos Fluidos (Bernoulli)', 'Primeira e Segunda Leis da Termodinâmica'],
  'Física III': ['Lei de Coulomb e Campo Elétrico', 'Lei de Gauss', 'Potencial Elétrico e Capacitância', 'Lei de Biot-Savart e Lei de Ampère', 'Lei de Faraday-Lenz & Indutância'],
  'Álgebra Linear': ['Sistemas Lineares e Eliminação de Gauss', 'Espaços e Subespaços Vetoriais', 'Transformações Lineares e Matrizes Associadas', 'Autovalores e Autovetores', 'Espaços com Produto Interno & Gram-Schmidt'],
  'Química Geral': ['Estequiometria e Soluções', 'Termoquímica e Entalpia de Reação', 'Equilíbrio Químico e Le Chatelier', 'Equilíbrio Ácido-Base e pH', 'Cinética Química e Eletroquímica'],
  'Mecânica dos Sólidos': ['Tensão e Deformação Axial (Lei de Hooke)', 'Torção em Eixos Circulares', 'Esforço Cortante e Momento Fletor em Vigas', 'Tensões de Flexão (Fórmula de Navier)', 'Círculo de Mohr para Estado Plano de Tensões']
};
