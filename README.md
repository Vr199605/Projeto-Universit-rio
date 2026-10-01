# EngenhariaFlow 🚀
> Plataforma de Solução & Estudo para o Ciclo Básico de Engenharia com Gemini AI, LaTeX KaTeX e Calibração por Faculdades Brasileiras.

EngenhariaFlow é uma aplicação web moderna e minimalista (estilo Vercel/Linear) voltada para estudantes do ciclo básico de engenharia (**Cálculo I a IV, Física I a IV, Álgebra Linear, Mecânica dos Sólidos e Química Geral**).

---

## ✨ Funcionalidades Principais

1. **Solucionador com IA Calibrada (Google Gemini AI)**:
   - Resolução passo a passo sem omitir passagens.
   - Calibrado para o nível de rigor e o estilo de prova da sua universidade (USP, UFRJ, ITA, IME, Unicamp, PUCs, Federais e Particulares).
   - Destaque automático para a **"⚠️ Pegadinha Típica da Banca"** (os erros mais comuns que zeram questões em provas).
   - Renderização matemática nítida em **LaTeX KaTeX**.

2. **Landing Page Didática e de Alta Conversão**:
   - Apresentação completa do serviço, comparativo com IAs genéricas e livros tradicionais.
   - Demonstração interativa e prova social.

3. **Gerador de Listas & Simulados**:
   - Criação de listas de exercícios customizadas por disciplina, tópico e nível de dificuldade da banca.
   - Gabarito detalhado com 1 clique para revelar e botão direto para enviar a questão ao Solucionador.

4. **Modo Prova com Cronômetro**:
   - Simulação cronometrada adaptada ao tempo oficial de prova da sua faculdade (90 a 180 minutos).
   - Rascunho para respostas e diagnóstico de desempenho.

5. **Caderno de Erros Inteligente**:
   - Armazenamento de questões com tags de erro (*"Erro de Sinal"*, *"Esqueceu Jacobiano"*, *"Vetor Normal Invertido"*, *"Falta de Hipótese"*).
   - Botão para re-resolver a questão no solucionador com 1 clique.

6. **Catálogo de Universidades do Brasil**:
   - Mais de 100 faculdades públicas, militares, comunitárias e particulares mapeadas.
   - Criação instantânea de faculdade customizada com ajuste de rigor percentual.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19 + TypeScript + Vite 8
- **Estilização**: Tailwind CSS v4 (Paleta Deep Slate, Indigo & Cobalt Blue)
- **Matemática**: KaTeX (renderização de alta performance de fórmulas inline `$..$` e bloco `$$..$$`)
- **Inteligência Artificial**: Google Gemini API (`gemini-flash-latest` / `gemini-3.8-flash`)
- **Ícones**: Lucide React
- **Efeitos**: Canvas Confetti

---

## 🚀 Como Rodar Localmente

### 1. Clonar o Repositório
```bash
git clone https://github.com/SEU_USUARIO/engenharia-flow.git
cd engenharia-flow
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse no seu navegador: `http://localhost:5173/`

### 4. Build para Produção
```bash
npm run build
```

---

Desenvolvido para revolucionar a preparação de estudantes de engenharia no Brasil.
