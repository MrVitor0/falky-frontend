# 🎓 Falky - Plataforma de Educação Personalizada com IA

> **Revolucionando a educação através da inteligência artificial personalizada**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

---

## 🌟 **Sobre o Projeto**

O **Falky** é uma plataforma revolucionária que democratiza a educação personalizada através de inteligência artificial. Nosso assistente IA adapta-se perfeitamente ao seu estilo de aprendizado, personalidade e necessidades específicas, criando uma experiência educacional única para cada usuário.

### 🎯 **Problema que Resolvemos**

- **Educação Massificada**: Métodos de ensino únicos que não atendem às necessidades individuais
- **Falta de Inclusão**: Sistemas que não consideram neurodivergências e estilos de aprendizado
- **Baixo Engajamento**: Conteúdo genérico que não motiva nem inspira
- **Barreiras de Acesso**: Educação personalizada limitada a poucos

### 💡 **Nossa Solução**

Uma plataforma inteligente que cria **professores IA personalizados** com:

- 🎭 **10 personalidades distintas** do assistente Falky
- 🧠 **Suporte completo à neurodivergência** (TDAH, Autismo, Dislexia, etc.)
- 📚 **Cursos gerados dinamicamente** baseados nas suas respostas
- 🎯 **Metodologia adaptativa** que evolui com seu progresso
- 🌈 **Interface inclusiva** e acessível para todos

---

## ✨ **Funcionalidades Principais**

### 🎭 **10 Personalidades do Falky**

Cada personalidade oferece uma experiência de aprendizado única:

| Personalidade             | Características                     | Ideal Para                           |
| ------------------------- | ----------------------------------- | ------------------------------------ |
| 🗣️ **Conversador**        | Diálogo descontraído e envolvente   | Quem gosta de aprender conversando   |
| 🏆 **Coach Motivacional** | Incentivador e energético           | Quem precisa de motivação extra      |
| 🎯 **Superdireto**        | Explicações enxutas e diretas       | Quem prefere objetividade            |
| 🎓 **Professor Clássico** | Postura didática e formal           | Quem gosta do ensino tradicional     |
| 🔬 **Cientista**          | Fundamentação técnica detalhada     | Quem busca rigor científico          |
| 😄 **Zueiro**             | Humor e leveza no aprendizado       | Quem aprende melhor com diversão     |
| 🎮 **Gamer**              | Gamificação do processo             | Quem ama desafios e conquistas       |
| 🧘 **Zen**                | Abordagem serena e pausada          | Quem prefere calma e reflexão        |
| 🧙‍♂️ **Sábio**              | Metáforas e analogias filosóficas   | Quem conecta com sabedoria ancestral |
| 💻 **Hacker**             | Analogias técnicas e investigativas | Quem tem mentalidade analítica       |

### 🧠 **Suporte à Neurodivergência**

Sistema pioneiro que adapta o ensino para diferentes perfis:

- **TDAH**: Sessões dinâmicas com gamificação e pausas estratégicas
- **Autismo**: Estrutura previsível e linguagem literal e clara
- **Dislexia**: Formatos audiovisuais e mapas mentais
- **Discalculia**: Abordagens verbais e representações visuais
- **Transtorno de Processamento Sensorial**: Ambientes controlados e adaptados

### 🎯 **Sistema de Criação de Cursos Inteligente**

Fluxo inovador de 5 etapas que cria cursos sob medida:

1. **📝 Tópico**: Defina o que quer aprender
2. **💭 Motivação**: Entenda suas razões pessoais
3. **🎯 Objetivo**: Esclareça suas metas de aprendizado
4. **📊 Conhecimento**: Avalie seu nível atual
5. **🎨 Personalização**: Escolha estilo e preferências

### 📊 **Dashboard Completo**

Interface moderna e intuitiva com:

- **📈 Progresso em Tempo Real**: Acompanhe seu desenvolvimento
- **📚 Biblioteca de Cursos**: Gerencie todos os seus estudos
- **⚡ Geração de Material**: Crie conteúdo instantaneamente
- **🎯 Estatísticas Detalhadas**: Métricas de progresso e performance
- **📱 Responsivo**: Perfeito em qualquer dispositivo

### 🔄 **Geração de Material em Tempo Real**

Sistema revolucionário que cria conteúdo personalizado:

- **🤖 IA Generativa**: Materiais únicos baseados no seu perfil
- **⚡ WebSocket**: Progresso em tempo real com feedback visual
- **📄 Múltiplos Formatos**: Texto, áudio, vídeo e exercícios
- **🎯 Adaptativo**: Conteúdo que evolui com seu aprendizado

---

## 🚀 **Tecnologias Utilizadas**

### **Frontend**

- **Next.js 15**: Framework React de última geração
- **TypeScript**: Tipagem estática para código robusto
- **Tailwind CSS 4**: Sistema de design moderno e responsivo
- **Context API**: Gerenciamento de estado global eficiente

### **Backend Integration**

- **WebSocket**: Comunicação em tempo real
- **Axios**: Cliente HTTP robusto com interceptors
- **API RESTful**: Endpoints organizados e documentados

### **Arquitetura**

- **Component-Based**: Componentes reutilizáveis e modulares
- **Clean Code**: Código limpo e bem documentado
- **Scalable**: Arquitetura preparada para crescimento
- **Accessible**: Design inclusivo e acessível

---

## 📁 **Estrutura do Projeto**

```
src/
├── 📱 app/                     # Páginas (App Router)
│   ├── 🧪 api-test/           # Página de teste completa da API
│   ├── 🎯 create-course-*/    # Fluxo de criação de curso (5 steps)
│   ├── 📊 dashboard/          # Dashboard principal e subpáginas
│   │   ├── courses/[id]/      # Detalhes e materiais dos cursos
│   │   ├── my-courses/        # Gerenciamento de cursos
│   │   ├── in-progress/       # Cursos em andamento
│   │   └── completed/         # Cursos concluídos
│   ├── 🔐 login/              # Sistema de autenticação
│   └── 📝 signup-*/           # Fluxo de cadastro
├── 🧩 components/             # Componentes reutilizáveis
│   └── dashboard/             # Componentes do dashboard
├── 🎮 controllers/            # Controllers da API
├── 🔧 services/               # Serviços (API, WebSocket)
├── 📝 types/                  # Definições TypeScript
├── 🛠️ utils/                  # Funções utilitárias
├── 📋 constants/              # Constantes da aplicação
├── 🪝 hooks/                  # Custom hooks
├── 🌐 contexts/               # Context providers
└── 📚 lib/                    # Bibliotecas e helpers
```

---

## 🎮 **Como Executar o Projeto**

### **Pré-requisitos**

- Node.js 18+
- npm/yarn/pnpm
- Backend Falky rodando em `localhost:8000`

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/falky-frontend.git
cd falky-frontend

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### **Configuração**

Crie um arquivo `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### **Acesso**

🌐 Acesse [http://localhost:3000](http://localhost:3000) no navegador

---

## 🧪 **Testando a Plataforma**

### **Página de Testes Completa**

1. **Navegue para `/api-test`** ou clique em "🧪 Teste API" no header
2. **Teste todos os endpoints** com interface visual
3. **Visualize resultados** em tempo real
4. **Experimente perfis** pré-definidos

### **Fluxo de Teste Recomendado**

1. 🎯 **Criar Curso**: Siga o fluxo de 5 etapas
2. 📊 **Explorar Dashboard**: Veja o curso criado
3. ⚡ **Gerar Material**: Experimente a geração em tempo real
4. 📖 **Estudar Conteúdo**: Acesse os materiais gerados
5. 🧪 **Testar API**: Use a página de testes

---

## 🎨 **Design System**

### **Paleta de Cores**

- **🟤 Primária**: `#593100` (Marrom aconchegante)
- **🟠 Secundária**: `#cc6200` (Laranja vibrante)
- **🟡 Accent**: `#ff8c00` (Laranja claro)
- **🤍 Background**: `#fff7f0` (Bege suave)
- **🟨 Cards**: `#ffddc2` (Bege médio)

### **Princípios de Design**

- **Inclusivo**: Acessível para todos os usuários
- **Responsivo**: Perfeito em qualquer dispositivo
- **Moderno**: Interface clean e intuitiva
- **Consistente**: Padrões visuais bem definidos

---

## 🌟 **Diferenciais Competitivos**

### **🎯 Personalização Extrema**

- 10 personalidades distintas do assistente
- Adaptação completa para neurodivergências
- Conteúdo gerado dinamicamente
- Metodologia que evolui com o usuário

### **🚀 Tecnologia de Ponta**

- IA generativa para criação de conteúdo
- WebSocket para experiência em tempo real
- Arquitetura escalável e moderna
- Interface responsiva e acessível

### **🌈 Inclusão e Acessibilidade**

- Suporte pioneiro à neurodivergência
- Interface adaptável para diferentes necessidades
- Design universal e intuitivo
- Múltiplos formatos de conteúdo

### **⚡ Performance e Escalabilidade**

- Next.js 15 para máxima performance
- Arquitetura component-based
- Otimizado para SEO e acessibilidade
- Preparado para milhões de usuários

---

## 📊 **Métricas de Impacto**

### **Problemas Resolvidos**

- 🎯 **Personalização**: De 0% para 100% de adaptação individual
- 🧠 **Inclusão**: Suporte a 5+ tipos de neurodivergência
- ⚡ **Engajamento**: Interface gamificada e motivacional
- 📱 **Acessibilidade**: Design responsivo e universal

### **Benefícios Mensuráveis**

- 📈 **Retenção**: Aprendizado mais envolvente e eficaz
- 🎯 **Eficiência**: Conteúdo sob medida acelera o processo
- 🌟 **Satisfação**: Experiência personalizada e agradável
- 🚀 **Escalabilidade**: Solução que cresce com a demanda

---

## 🎉 **Próximos Passos**

### **Roadmap de Desenvolvimento**

- 🎵 **Síntese de Voz**: Narração personalizada dos materiais
- 🎨 **Editor Visual**: Interface para criação de conteúdo
- 🤝 **Colaboração**: Estudos em grupo e mentoria
- 📱 **App Mobile**: Aplicativo nativo para iOS e Android
- 🧠 **IA Avançada**: Modelos mais sofisticados e precisos

### **Expansão e Crescimento**

- 🌍 **Internacionalização**: Suporte a múltiplos idiomas
- 🏢 **Versão Empresarial**: Soluções para corporações
- 🎓 **Certificações**: Parcerias com instituições
- 🔗 **Integrações**: APIs para LMS e plataformas

---

## 🏆 **Reconhecimentos**

### **Hackathon 2024**

> "O Falky representa o futuro da educação personalizada, combinando tecnologia de ponta com uma abordagem verdadeiramente inclusiva."

### **Impacto Social**

- 🌟 **Democratização**: Educação personalizada para todos
- 🧠 **Inclusão**: Pioneirismo no suporte à neurodivergência
- 🚀 **Inovação**: Tecnologia que transforma vidas
- 🌈 **Diversidade**: Respeitando diferentes formas de aprender

---

## 👥 **Equipe de Desenvolvimento**

Desenvolvido com 💜 por uma equipe apaixonada por educação e tecnologia.

### **Contribua com o Projeto**

```bash
# Fork o projeto
git fork https://github.com/seu-usuario/falky-frontend

# Crie uma branch para sua feature
git checkout -b feature/nova-funcionalidade

# Faça commit das suas alterações
git commit -m 'feat: adiciona nova funcionalidade incrível'

# Envie para o repositório
git push origin feature/nova-funcionalidade

# Abra um Pull Request
```

---

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🔗 **Links Úteis**

- 🌐 **Demo**: [https://falky-frontend.vercel.app](https://falky-frontend.vercel.app)
- 📚 **Documentação**: [/docs](./docs)
- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/falky-frontend/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/falky-frontend/discussions)

---

<div align="center">
  <h2>🚀 Revolucionando a Educação, Uma Pessoa de Cada Vez</h2>
  <p><strong>Falky - Onde a Tecnologia Encontra a Humanidade</strong></p>
  
  [![Feito com Amor](https://img.shields.io/badge/Feito%20com-❤️-red?style=for-the-badge)](https://github.com/seu-usuario/falky-frontend)
  [![Tecnologia](https://img.shields.io/badge/Tecnologia-🚀-blue?style=for-the-badge)](https://github.com/seu-usuario/falky-frontend)
  [![Inclusão](https://img.shields.io/badge/Inclusão-🌈-rainbow?style=for-the-badge)](https://github.com/seu-usuario/falky-frontend)
</div>

---

**© 2024 Falky - Transformando a educação através da IA personalizada**
