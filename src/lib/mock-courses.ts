import { Course, CourseStats, CourseActivity, DashboardData } from "./types";

// Dados mock para cursos - migrados do courses.json
const mockCourses: Course[] = [
  {
    id: "langchain-course-2025",
    user_id: "df8021089115b8f1561326d3a517b60b",
    timestamp: "2025-07-12T23:21:51.428474",
    thread_id: "thread_20250712_231622_625b52e0",
    course_topic: "LangChain e LangGraph em Python para Agentes de IA",
    name: "LangChain e LangGraph em Python para Agentes de IA",
    description:
      "Curso completo sobre LangChain e LangGraph para desenvolvimento de agentes de IA com Python, incluindo aplicações práticas em automação comercial",
    status: "em_andamento",
    progress: 25,
    totalLessons: 29,
    completedLessons: 7,
    createdAt: new Date("2025-01-13T00:00:00.000Z"),
    updatedAt: new Date("2025-01-13T10:30:00.000Z"),
    category: "Inteligência Artificial",
    difficulty: "iniciante",
    estimatedHours: 29,
    tags: ["langchain", "langgraph", "python", "ai", "agentes", "automacao"],
    user_config: {},
    personalized_curriculum: {
      nivel_identificado: "INICIANTE",
      personalidade_aplicada: "Professor Clássico",
      adaptacoes_personalizadas:
        "Curso estruturado em módulos sequenciais e progressivos, com linguagem formal, clara e didática, focando em conceitos fundamentais e aplicação prática gradual, alinhado à alta autonomia e perfil profissional do estudante.",
      adaptacoes_neurodivergencia:
        "Uso de linguagem direta, organizada e sem ambiguidades, com conteúdos apresentados de forma linear e estruturada, sem estímulos sensoriais excessivos ou elementos que possam dispersar a atenção.",
      justificativa_personalizacao:
        "O perfil de professor clássico e a alta autonomia indicam que o estudante se beneficia de uma abordagem sistemática e organizada, com explicações conceituais claras e exemplos práticos bem estruturados. A ausência de neurodivergência permite o uso de linguagem formal e direta, facilitando a assimilação dos conteúdos técnicos. A falta de experiência prévia e a necessidade de definição de objetivos técnicos orientaram a inclusão de exercícios práticos e estudos de caso contextualizados para promover aplicação imediata e reflexão crítica.",
      modulos: [
        {
          ID_MODULO: "1",
          NAME_MODULO:
            "Fundamentos de LangChain e LangGraph: Conceitos e Contexto",
          DESCRICAO_MODULO:
            "Introdução aos conceitos básicos de LangChain e LangGraph, suas diferenças, importância no mercado e aplicações práticas. Este módulo visa construir uma base sólida para o entendimento dos frameworks e sua relevância na automação de agentes de IA.",
          ROADMAP_MODULO:
            "• Definição e propósito de LangChain e LangGraph\n• Evolução histórica e estado da arte\n• Principais aplicações industriais\n• Comparação entre LangChain e LangGraph\n• Projeto prático: Explorar exemplos simples de agentes em Python",
          NIVEL_DIFICULDADE: "BÁSICO",
          TEMPO_ESTIMADO: "6 horas",
          ADAPTACOES_NEURO:
            "Conteúdo apresentado em linguagem clara e objetiva, com estrutura linear e tópicos bem delimitados para facilitar o foco e a assimilação.",
          JUSTIFICATIVA:
            "Este módulo é essencial para que o estudante compreenda o contexto e os fundamentos teóricos, preparando-o para os módulos práticos seguintes e alinhando expectativas sobre as tecnologias.",
          SUBMODULOS: [
            {
              ID_SUBMODULO: "1.1",
              NAME_SUBMODULO:
                "Introdução a LangChain: Estrutura e Funcionalidades",
              DESCRICAO_SUBMODULO:
                "Apresentação detalhada do framework LangChain, seus componentes principais e exemplos básicos de uso em Python.",
              ROADMAP_SUBMODULO:
                "• O que é LangChain\n• Componentes principais: LLMs, Prompts, Chains\n• Exemplos simples de encadeamento\n• Exercício prático: Criar um chain básico que responde perguntas",
              TEMPO_ESTIMADO: "3 horas",
              content_generated: true,
              generated_at: "2025-01-13T08:30:00.000Z",
              content_url: "/content/langchain-course-2025/1/1.1",
            },
            {
              ID_SUBMODULO: "1.2",
              NAME_SUBMODULO:
                "Introdução a LangGraph: Grafos Computacionais para Agentes",
              DESCRICAO_SUBMODULO:
                "Exploração do framework LangGraph, seu modelo de grafos computacionais e como ele amplia a modularidade dos agentes de IA.",
              ROADMAP_SUBMODULO:
                "• Conceitos de grafos computacionais\n• Estrutura e componentes do LangGraph\n• Diferenças e complementaridades com LangChain\n• Exercício prático: Visualizar um grafo simples de agente",
              TEMPO_ESTIMADO: "3 horas",
            },
          ],
        },
        {
          ID_MODULO: "2",
          NAME_MODULO: "Construção Prática de Agentes com LangChain em Python",
          DESCRICAO_MODULO:
            "Desenvolvimento de agentes básicos utilizando LangChain, com foco em manipulação de contexto, encadeamento de chamadas a LLMs e integração inicial com APIs externas.",
          ROADMAP_MODULO:
            "• Configuração do ambiente Python\n• Criação de prompts dinâmicos\n• Encadeamento de múltiplas chamadas (chains)\n• Gestão de contexto e memória\n• Integração simples com API externa (ex: consulta de dados)\n• Projeto prático: Agente básico de atendimento automatizado",
          NIVEL_DIFICULDADE: "BÁSICO/INTERMEDIÁRIO",
          TEMPO_ESTIMADO: "8 horas",
          ADAPTACOES_NEURO:
            "Instruções passo a passo, com exemplos comentados e exercícios práticos para fixação, facilitando a compreensão e aplicação dos conceitos.",
          JUSTIFICATIVA:
            "Este módulo permite que o estudante aplique os conceitos teóricos na prática, desenvolvendo habilidades essenciais para a construção de agentes funcionais e preparando-o para desafios mais complexos.",
          SUBMODULOS: [
            {
              ID_SUBMODULO: "2.1",
              NAME_SUBMODULO: "Ambiente e Ferramentas para LangChain",
              DESCRICAO_SUBMODULO:
                "Configuração do ambiente de desenvolvimento Python e instalação das bibliotecas necessárias para LangChain.",
              ROADMAP_SUBMODULO:
                "• Instalação do Python e IDE recomendada\n• Instalação do LangChain e dependências\n• Testes iniciais de funcionamento\n• Exercício prático: Rodar um script básico de LangChain",
              TEMPO_ESTIMADO: "1 hora",
              content_generated: true,
              generated_at: "2025-01-13T09:15:00.000Z",
              content_url: "/content/langchain-course-2025/2/2.1",
            },
            {
              ID_SUBMODULO: "2.2",
              NAME_SUBMODULO: "Criação e Encadeamento de Prompts",
              DESCRICAO_SUBMODULO:
                "Desenvolvimento de prompts dinâmicos e encadeamento de chamadas para construir fluxos simples de agentes.",
              ROADMAP_SUBMODULO:
                "• Estrutura de prompts em LangChain\n• Encadeamento básico (chains)\n• Exercício prático: Criar um chain que responde perguntas sequenciais",
              TEMPO_ESTIMADO: "3 horas",
            },
            {
              ID_SUBMODULO: "2.3",
              NAME_SUBMODULO: "Gestão de Contexto e Memória",
              DESCRICAO_SUBMODULO:
                "Implementação de mecanismos para manter contexto entre interações do agente, utilizando memória integrada do LangChain.",
              ROADMAP_SUBMODULO:
                "• Conceito de memória em agentes\n• Tipos de memória suportados\n• Exercício prático: Agente que lembra informações da conversa",
              TEMPO_ESTIMADO: "2 horas",
            },
            {
              ID_SUBMODULO: "2.4",
              NAME_SUBMODULO: "Integração com APIs Externas",
              DESCRICAO_SUBMODULO:
                "Aprender a conectar agentes LangChain a APIs externas para enriquecer respostas e funcionalidades.",
              ROADMAP_SUBMODULO:
                "• Conceitos de integração via API\n• Exemplo prático: Consulta a API pública (ex: clima)\n• Exercício prático: Agente que responde com dados externos",
              TEMPO_ESTIMADO: "2 horas",
            },
          ],
        },
        {
          ID_MODULO: "3",
          NAME_MODULO:
            "Orquestração Avançada com LangGraph: Grafos e Modularidade",
          DESCRICAO_MODULO:
            "Exploração avançada do LangGraph para criação de agentes modulares e dinâmicos, utilizando grafos computacionais para orquestração de fluxos complexos.",
          ROADMAP_MODULO:
            "• Revisão dos conceitos de grafos computacionais\n• Modelagem de agentes com LangGraph\n• Orquestração de múltiplos agentes e fluxos\n• Projeto prático: Construir um agente modular para automação de processos",
          NIVEL_DIFICULDADE: "INTERMEDIÁRIO",
          TEMPO_ESTIMADO: "7 horas",
          ADAPTACOES_NEURO:
            "Apresentação gradual dos conceitos, com diagramas e exemplos visuais para facilitar a compreensão da estrutura em grafos.",
          JUSTIFICATIVA:
            "Este módulo eleva o conhecimento do estudante para a construção de agentes mais complexos e escaláveis, alinhando-se às demandas reais do mercado e ao perfil profissional do aluno.",
          SUBMODULOS: [
            {
              ID_SUBMODULO: "3.1",
              NAME_SUBMODULO: "Conceitos e Estrutura de Grafos Computacionais",
              DESCRICAO_SUBMODULO:
                "Fundamentos teóricos sobre grafos computacionais aplicados a agentes de IA e sua representação em LangGraph.",
              ROADMAP_SUBMODULO:
                "• Teoria básica de grafos\n• Aplicação em agentes computacionais\n• Exercício prático: Mapear fluxo simples em grafo",
              TEMPO_ESTIMADO: "2 horas",
            },
            {
              ID_SUBMODULO: "3.2",
              NAME_SUBMODULO:
                "Desenvolvimento de Agentes Modulares com LangGraph",
              DESCRICAO_SUBMODULO:
                "Construção de agentes usando LangGraph, focando em modularidade e reutilização de componentes.",
              ROADMAP_SUBMODULO:
                "• Componentes do LangGraph\n• Criação e conexão de nós\n• Exercício prático: Montar grafo funcional básico",
              TEMPO_ESTIMADO: "3 horas",
            },
            {
              ID_SUBMODULO: "3.3",
              NAME_SUBMODULO: "Orquestração e Automação de Fluxos Complexos",
              DESCRICAO_SUBMODULO:
                "Implementação de orquestração de múltiplos agentes e fluxos para automação de processos reais.",
              ROADMAP_SUBMODULO:
                "• Estratégias de orquestração\n• Exemplo prático: Automação de atendimento e vendas\n• Exercício prático: Criar fluxo modular completo",
              TEMPO_ESTIMADO: "2 horas",
            },
          ],
        },
        {
          ID_MODULO: "4",
          NAME_MODULO:
            "Aplicações Práticas e Estudos de Caso em Automação Comercial",
          DESCRICAO_MODULO:
            "Aplicação dos conhecimentos adquiridos em cenários reais de automação para e-commerce e atendimento ao cliente, com foco em agentes personalizados para o contexto profissional do estudante.",
          ROADMAP_MODULO:
            "• Análise de casos reais de automação\n• Desenvolvimento de agentes para atendimento e vendas\n• Integração avançada com sistemas externos\n• Projeto final: Construir agente completo para automação de loja virtual",
          NIVEL_DIFICULDADE: "INTERMEDIÁRIO",
          TEMPO_ESTIMADO: "8 horas",
          ADAPTACOES_NEURO:
            "Conteúdos organizados em etapas claras, com exemplos práticos e orientações para autoavaliação e reflexão crítica.",
          JUSTIFICATIVA:
            "Este módulo conecta teoria e prática, permitindo que o estudante aplique os conceitos em seu contexto profissional, consolidando o aprendizado e estimulando a definição de objetivos técnicos próprios.",
          SUBMODULOS: [
            {
              ID_SUBMODULO: "4.1",
              NAME_SUBMODULO:
                "Estudo de Caso: Agente de Atendimento ao Cliente",
              DESCRICAO_SUBMODULO:
                "Análise detalhada e implementação de um agente para atendimento automatizado, integrando LangChain e APIs externas.",
              ROADMAP_SUBMODULO:
                "• Cenário e requisitos\n• Desenvolvimento passo a passo\n• Exercício prático: Personalizar agente para contexto próprio",
              TEMPO_ESTIMADO: "3 horas",
            },
            {
              ID_SUBMODULO: "4.2",
              NAME_SUBMODULO:
                "Estudo de Caso: Automação de Vendas em E-commerce",
              DESCRICAO_SUBMODULO:
                "Construção de agente para gerenciamento de inventário e recomendações de produtos, utilizando LangGraph para modularidade.",
              ROADMAP_SUBMODULO:
                "• Análise do fluxo de vendas\n• Desenvolvimento modular com LangGraph\n• Exercício prático: Adaptar agente para loja virtual",
              TEMPO_ESTIMADO: "3 horas",
            },
            {
              ID_SUBMODULO: "4.3",
              NAME_SUBMODULO:
                "Reflexão e Definição de Objetivos Técnicos Pessoais",
              DESCRICAO_SUBMODULO:
                "Atividade guiada para autoavaliação do aprendizado e definição de metas técnicas para aplicação prática futura.",
              ROADMAP_SUBMODULO:
                "• Revisão dos conceitos aprendidos\n• Identificação de lacunas e interesses\n• Planejamento de próximos passos técnicos",
              TEMPO_ESTIMADO: "2 horas",
            },
          ],
        },
      ],
    },
  },
  {
    id: "1",
    name: "JavaScript Fundamentals",
    description: "Aprenda os fundamentos do JavaScript do zero ao avançado",
    status: "em_andamento",
    progress: 65,
    totalLessons: 20,
    completedLessons: 13,
    createdAt: new Date("2024-01-15T00:00:00.000Z"),
    updatedAt: new Date("2024-01-20T00:00:00.000Z"),
    category: "Programação",
    difficulty: "iniciante",
    estimatedHours: 40,
    tags: ["javascript", "web", "frontend"],
    modulos: [
      {
        ID_MODULO: "1",
        NAME_MODULO: "Fundamentos",
        DESCRICAO_MODULO: "Introdução ao JS, variáveis, tipos, operadores.",
        SUBMODULOS: [
          {
            ID_SUBMODULO: "1.1",
            NAME_SUBMODULO: "Variáveis e Tipos",
            DESCRICAO_SUBMODULO: "Como declarar variáveis, tipos primitivos.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "2h",
          },
          {
            ID_SUBMODULO: "1.2",
            NAME_SUBMODULO: "Operadores",
            DESCRICAO_SUBMODULO:
              "Operadores aritméticos, lógicos e relacionais.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "1h",
          },
        ],
      },
      {
        ID_MODULO: "2",
        NAME_MODULO: "Funções e Objetos",
        DESCRICAO_MODULO: "Funções, escopo, objetos e arrays.",
        SUBMODULOS: [
          {
            ID_SUBMODULO: "2.1",
            NAME_SUBMODULO: "Funções",
            DESCRICAO_SUBMODULO: "Declaração, expressão e arrow functions.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "1.5h",
          },
          {
            ID_SUBMODULO: "2.2",
            NAME_SUBMODULO: "Objetos e Arrays",
            DESCRICAO_SUBMODULO: "Manipulação de objetos e arrays.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "2h",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "React Avançado",
    description: "Domine React com hooks, context e patterns avançados",
    status: "em_andamento",
    progress: 30,
    totalLessons: 25,
    completedLessons: 7,
    createdAt: new Date("2024-01-10T00:00:00.000Z"),
    updatedAt: new Date("2024-01-18T00:00:00.000Z"),
    category: "Programação",
    difficulty: "avancado",
    estimatedHours: 60,
    tags: ["react", "frontend", "javascript"],
    modulos: [
      {
        ID_MODULO: "1",
        NAME_MODULO: "Hooks Avançados",
        DESCRICAO_MODULO: "useReducer, useCallback, useMemo, custom hooks.",
        SUBMODULOS: [
          {
            ID_SUBMODULO: "1.1",
            NAME_SUBMODULO: "useReducer",
            DESCRICAO_SUBMODULO: "Gerenciamento de estado complexo.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "1.5h",
          },
          {
            ID_SUBMODULO: "1.2",
            NAME_SUBMODULO: "Custom Hooks",
            DESCRICAO_SUBMODULO: "Criando e organizando hooks personalizados.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "2h",
          },
        ],
      },
      {
        ID_MODULO: "2",
        NAME_MODULO: "Context API e Patterns",
        DESCRICAO_MODULO: "Context, providers, patterns avançados.",
        SUBMODULOS: [
          {
            ID_SUBMODULO: "2.1",
            NAME_SUBMODULO: "Context API",
            DESCRICAO_SUBMODULO: "Gerenciamento de contexto global.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "1h",
          },
          {
            ID_SUBMODULO: "2.2",
            NAME_SUBMODULO: "Render Props & HOCs",
            DESCRICAO_SUBMODULO: "Padrões avançados de composição.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "1.5h",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Design Thinking",
    description: "Metodologia para resolver problemas de forma criativa",
    status: "concluido",
    progress: 100,
    totalLessons: 15,
    completedLessons: 15,
    createdAt: new Date("2023-12-01T00:00:00.000Z"),
    updatedAt: new Date("2023-12-15T00:00:00.000Z"),
    category: "Design",
    difficulty: "intermediario",
    estimatedHours: 30,
    tags: ["design", "metodologia", "criatividade"],
  },
  {
    id: "4",
    name: "Node.js Backend",
    description: "Construa APIs robustas com Node.js e Express",
    status: "pausado",
    progress: 45,
    totalLessons: 18,
    completedLessons: 8,
    createdAt: new Date("2024-01-05T00:00:00.000Z"),
    updatedAt: new Date("2024-01-12T00:00:00.000Z"),
    category: "Programação",
    difficulty: "intermediario",
    estimatedHours: 50,
    tags: ["nodejs", "backend", "api"],
    modulos: [
      {
        ID_MODULO: "1",
        NAME_MODULO: "Fundamentos do Node.js",
        DESCRICAO_MODULO: "Event loop, módulos, npm.",
        SUBMODULOS: [
          {
            ID_SUBMODULO: "1.1",
            NAME_SUBMODULO: "Event Loop",
            DESCRICAO_SUBMODULO: "Como o Node lida com concorrência.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "1h",
          },
          {
            ID_SUBMODULO: "1.2",
            NAME_SUBMODULO: "Módulos e NPM",
            DESCRICAO_SUBMODULO: "Gerenciamento de dependências.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "1h",
          },
        ],
      },
      {
        ID_MODULO: "2",
        NAME_MODULO: "APIs com Express",
        DESCRICAO_MODULO: "Criação de rotas, middlewares, autenticação.",
        SUBMODULOS: [
          {
            ID_SUBMODULO: "2.1",
            NAME_SUBMODULO: "Rotas e Middlewares",
            DESCRICAO_SUBMODULO: "Como criar rotas e middlewares.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "2h",
          },
          {
            ID_SUBMODULO: "2.2",
            NAME_SUBMODULO: "Autenticação",
            DESCRICAO_SUBMODULO: "JWT, OAuth e estratégias de autenticação.",
            ROADMAP_SUBMODULO: "",
            TEMPO_ESTIMADO: "2h",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "UX/UI Design",
    description: "Princípios de design para criar interfaces incríveis",
    status: "concluido",
    progress: 100,
    totalLessons: 22,
    completedLessons: 22,
    createdAt: new Date("2023-11-15T00:00:00.000Z"),
    updatedAt: new Date("2023-12-10T00:00:00.000Z"),
    category: "Design",
    difficulty: "intermediario",
    estimatedHours: 45,
    tags: ["ux", "ui", "design", "figma"],
  },
  {
    id: "6",
    name: "Python para Data Science",
    description: "Análise de dados e machine learning com Python",
    status: "nao_iniciado",
    progress: 0,
    totalLessons: 30,
    completedLessons: 0,
    createdAt: new Date("2024-01-25T00:00:00.000Z"),
    updatedAt: new Date("2024-01-25T00:00:00.000Z"),
    category: "Data Science",
    difficulty: "intermediario",
    estimatedHours: 80,
    tags: ["python", "data", "ml", "pandas"],
  },
  {
    id: "7",
    name: "Marketing Digital",
    description: "Estratégias completas de marketing online",
    status: "nao_iniciado",
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    createdAt: new Date("2024-01-22T00:00:00.000Z"),
    updatedAt: new Date("2024-01-22T00:00:00.000Z"),
    category: "Marketing",
    difficulty: "iniciante",
    estimatedHours: 25,
    tags: ["marketing", "digital", "seo", "ads"],
  },
  {
    id: "8",
    name: "Fotografia Profissional",
    description: "Técnicas avançadas de fotografia e edição",
    status: "nao_iniciado",
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    createdAt: new Date("2024-01-20T00:00:00.000Z"),
    updatedAt: new Date("2024-01-20T00:00:00.000Z"),
    category: "Arte",
    difficulty: "intermediario",
    estimatedHours: 35,
    tags: ["fotografia", "arte", "lightroom", "composição"],
  },
];

const mockActivities: CourseActivity[] = [
  {
    id: "act_langchain_content_1",
    courseId: "langchain-course-2025",
    courseName: "LangChain e LangGraph em Python para Agentes de IA",
    type: "content_generated",
    timestamp: new Date("2025-01-13T09:15:00"),
    description: "Conteúdo gerado para: Ambiente e Ferramentas para LangChain",
  },
  {
    id: "act_langchain_1",
    courseId: "langchain-course-2025",
    courseName: "LangChain e LangGraph em Python para Agentes de IA",
    type: "lesson_completed",
    timestamp: new Date("2025-01-13T10:30:00"),
    description:
      "Completou: Introdução a LangChain: Estrutura e Funcionalidades",
  },
  {
    id: "act_langchain_content_2",
    courseId: "langchain-course-2025",
    courseName: "LangChain e LangGraph em Python para Agentes de IA",
    type: "content_generated",
    timestamp: new Date("2025-01-13T08:30:00"),
    description:
      "Conteúdo gerado para: Introdução a LangChain: Estrutura e Funcionalidades",
  },
  {
    id: "act_langchain_2",
    courseId: "langchain-course-2025",
    courseName: "LangChain e LangGraph em Python para Agentes de IA",
    type: "course_started",
    timestamp: new Date("2025-01-13T08:00:00"),
    description: "Iniciou o curso de LangChain e LangGraph",
  },
  {
    id: "act_1",
    courseId: "1",
    courseName: "JavaScript Fundamentals",
    type: "lesson_completed",
    timestamp: new Date("2024-01-20T10:30:00"),
    description: "Completou: Arrays e Métodos",
  },
  {
    id: "act_2",
    courseId: "2",
    courseName: "React Avançado",
    type: "lesson_completed",
    timestamp: new Date("2024-01-18T14:15:00"),
    description: "Completou: Custom Hooks",
  },
  {
    id: "act_3",
    courseId: "3",
    courseName: "Design Thinking",
    type: "course_completed",
    timestamp: new Date("2023-12-15T16:45:00"),
    description: "Curso concluído com sucesso!",
  },
  {
    id: "act_4",
    courseId: "4",
    courseName: "Node.js Backend",
    type: "course_paused",
    timestamp: new Date("2024-01-12T09:20:00"),
    description: "Curso pausado temporariamente",
  },
  {
    id: "act_5",
    courseId: "5",
    courseName: "UX/UI Design",
    type: "course_completed",
    timestamp: new Date("2023-12-10T11:30:00"),
    description: "Curso concluído com certificado!",
  },
  {
    id: "act_6",
    courseId: "6",
    courseName: "Python para Data Science",
    type: "course_created",
    timestamp: new Date("2024-01-25T15:45:00"),
    description: "Novo curso criado",
  },
  {
    id: "act_7",
    courseId: "7",
    courseName: "Marketing Digital",
    type: "course_created",
    timestamp: new Date("2024-01-22T11:20:00"),
    description: "Novo curso criado",
  },
  {
    id: "act_8",
    courseId: "8",
    courseName: "Fotografia Profissional",
    type: "course_created",
    timestamp: new Date("2024-01-20T09:15:00"),
    description: "Novo curso criado",
  },
];

// Utilitários para localStorage
const STORAGE_KEYS = {
  COURSES: "falky_courses",
  ACTIVITIES: "falky_activities",
  HAS_COURSES: "falky_has_courses",
};

export class MockCourseDB {
  // Verificar se o usuário tem cursos
  static hasAnyCourses(): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    const hasCoursesFlag = localStorage.getItem(STORAGE_KEYS.HAS_COURSES);
    if (hasCoursesFlag !== null) {
      const result = JSON.parse(hasCoursesFlag);
      return result;
    }

    const courses = this.getCourses();
    return courses.length > 0;
  }

  // Definir se o usuário tem cursos (para testing)
  static setHasCourses(hasCourses: boolean): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEYS.HAS_COURSES, JSON.stringify(hasCourses));

    if (hasCourses && this.getCourses().length === 0) {
      // Se marcou como tendo cursos mas não tem dados, inicializar com mock
      this.initializeMockData();
    }
  }

  // Inicializar dados mock
  static initializeMockData(): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(mockCourses));

    localStorage.setItem(
      STORAGE_KEYS.ACTIVITIES,
      JSON.stringify(mockActivities)
    );

    localStorage.setItem(STORAGE_KEYS.HAS_COURSES, JSON.stringify(true));
  }

  // Limpar todos os dados
  static clearAllData(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.HAS_COURSES);
  }

  // CRUD de cursos
  static getCourses(): Course[] {
    if (typeof window === "undefined") {
      return [];
    }

    const stored = localStorage.getItem(STORAGE_KEYS.COURSES);

    if (!stored) {
      return [];
    }

    try {
      const courses = JSON.parse(stored) as Course[];

      const processedCourses = courses.map((course) => ({
        ...course,
        createdAt: new Date(course.createdAt),
        updatedAt: new Date(course.updatedAt),
      }));

      return processedCourses;
    } catch (error) {
      console.error("getCourses: erro ao processar dados:", error);
      return [];
    }
  }

  static addCourse(
    course: Omit<Course, "id" | "createdAt" | "updatedAt">
  ): Course {
    if (typeof window === "undefined") throw new Error("Not in browser");

    const newCourse: Course = {
      ...course,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const courses = this.getCourses();
    courses.push(newCourse);

    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    localStorage.setItem(STORAGE_KEYS.HAS_COURSES, JSON.stringify(true));

    // Adicionar atividade
    this.addActivity({
      courseId: newCourse.id,
      courseName: newCourse.name,
      type: "course_created",
      description: "Novo curso criado",
    });

    return newCourse;
  }

  static updateCourse(id: string, updates: Partial<Course>): Course | null {
    if (typeof window === "undefined") return null;

    const courses = this.getCourses();
    const index = courses.findIndex((c) => c.id === id);

    if (index === -1) return null;

    const updatedCourse = {
      ...courses[index],
      ...updates,
      updatedAt: new Date(),
    };

    courses[index] = updatedCourse;
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));

    return updatedCourse;
  }

  static deleteCourse(id: string): boolean {
    if (typeof window === "undefined") return false;

    const courses = this.getCourses();
    const filteredCourses = courses.filter((c) => c.id !== id);

    if (filteredCourses.length === courses.length) return false;

    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(filteredCourses));

    // Atualizar flag se não há mais cursos
    if (filteredCourses.length === 0) {
      localStorage.setItem(STORAGE_KEYS.HAS_COURSES, JSON.stringify(false));
    }

    return true;
  }

  static getCourseById(id: string): Course | undefined {
    return this.getCourses().find((c) => c.id === id);
  }

  static getCoursesByStatus(status: Course["status"]): Course[] {
    return this.getCourses().filter((c) => c.status === status);
  }

  // Atividades
  static getActivities(): CourseActivity[] {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (!stored) return [];

    try {
      const activities = JSON.parse(stored) as CourseActivity[];
      return activities.map((activity) => ({
        ...activity,
        timestamp: new Date(activity.timestamp),
      }));
    } catch {
      return [];
    }
  }

  static addActivity(
    activity: Omit<CourseActivity, "id" | "timestamp">
  ): CourseActivity {
    if (typeof window === "undefined") throw new Error("Not in browser");

    const newActivity: CourseActivity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    const activities = this.getActivities();
    activities.unshift(newActivity); // Adicionar no início

    // Manter apenas as últimas 50 atividades
    const limitedActivities = activities.slice(0, 50);

    localStorage.setItem(
      STORAGE_KEYS.ACTIVITIES,
      JSON.stringify(limitedActivities)
    );

    return newActivity;
  }

  // Funções para geração de conteúdo
  static isSubmoduleContentGenerated(
    courseId: string,
    moduleId: string,
    submoduleId: string
  ): boolean {
    const course = this.getCourseById(courseId);
    if (!course) return false;

    // Verificar no currículo personalizado
    if (course.personalized_curriculum) {
      const courseModule = course.personalized_curriculum.modulos.find(
        (m) => m.ID_MODULO === moduleId
      );
      if (courseModule) {
        const submodule = courseModule.SUBMODULOS.find(
          (s) => s.ID_SUBMODULO === submoduleId
        );
        return submodule?.content_generated || false;
      }
    }

    // Verificar no formato original
    if (course.modulos) {
      const courseModule = course.modulos.find((m) => m.ID_MODULO === moduleId);
      if (courseModule) {
        const submodule = courseModule.SUBMODULOS.find(
          (s) => s.ID_SUBMODULO === submoduleId
        );
        return submodule?.content_generated || false;
      }
    }

    return false;
  }

  static async generateSubmoduleContent(
    courseId: string,
    moduleId: string,
    submoduleId: string
  ): Promise<boolean> {
    if (typeof window === "undefined") return false;

    const course = this.getCourseById(courseId);
    if (!course) {
      console.error("Curso não encontrado");
      return false;
    }

    try {
      // Simular tempo de geração (2-4 segundos)
      await new Promise((resolve) =>
        setTimeout(resolve, 2000 + Math.random() * 2000)
      );

      let updated = false;

      // Atualizar no currículo personalizado
      if (course.personalized_curriculum) {
        const moduleIndex = course.personalized_curriculum.modulos.findIndex(
          (m) => m.ID_MODULO === moduleId
        );
        if (moduleIndex !== -1) {
          const submoduleIndex = course.personalized_curriculum.modulos[
            moduleIndex
          ].SUBMODULOS.findIndex((s) => s.ID_SUBMODULO === submoduleId);
          if (submoduleIndex !== -1) {
            course.personalized_curriculum.modulos[moduleIndex].SUBMODULOS[
              submoduleIndex
            ] = {
              ...course.personalized_curriculum.modulos[moduleIndex].SUBMODULOS[
                submoduleIndex
              ],
              content_generated: true,
              generated_at: new Date().toISOString(),
              content_url: `/content/${courseId}/${moduleId}/${submoduleId}`,
            };
            updated = true;
          }
        }
      }

      // Atualizar no formato original
      if (course.modulos && !updated) {
        const moduleIndex = course.modulos.findIndex(
          (m) => m.ID_MODULO === moduleId
        );
        if (moduleIndex !== -1) {
          const submoduleIndex = course.modulos[
            moduleIndex
          ].SUBMODULOS.findIndex((s) => s.ID_SUBMODULO === submoduleId);
          if (submoduleIndex !== -1) {
            course.modulos[moduleIndex].SUBMODULOS[submoduleIndex] = {
              ...course.modulos[moduleIndex].SUBMODULOS[submoduleIndex],
              content_generated: true,
              generated_at: new Date().toISOString(),
              content_url: `/content/${courseId}/${moduleId}/${submoduleId}`,
            };
            updated = true;
          }
        }
      }

      if (updated) {
        // Salvar curso atualizado
        this.updateCourse(courseId, course);

        // Adicionar atividade
        const submoduleName = this.getSubmoduleName(
          course,
          moduleId,
          submoduleId
        );
        this.addActivity({
          courseId,
          courseName: course.name,
          type: "content_generated",
          description: `Conteúdo gerado para: ${submoduleName}`,
        });

        return true;
      }

      console.error("Submódulo não encontrado");
      return false;
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      return false;
    }
  }

  private static getSubmoduleName(
    course: Course,
    moduleId: string,
    submoduleId: string
  ): string {
    // Buscar no currículo personalizado
    if (course.personalized_curriculum) {
      const courseModule = course.personalized_curriculum.modulos.find(
        (m) => m.ID_MODULO === moduleId
      );
      if (courseModule) {
        const submodule = courseModule.SUBMODULOS.find(
          (s) => s.ID_SUBMODULO === submoduleId
        );
        if (submodule) return submodule.NAME_SUBMODULO;
      }
    }

    // Buscar no formato original
    if (course.modulos) {
      const courseModule = course.modulos.find((m) => m.ID_MODULO === moduleId);
      if (courseModule) {
        const submodule = courseModule.SUBMODULOS.find(
          (s) => s.ID_SUBMODULO === submoduleId
        );
        if (submodule) return submodule.NAME_SUBMODULO;
      }
    }

    return `Submódulo ${submoduleId}`;
  }

  // Estatísticas
  static getStats(): CourseStats {
    const courses = this.getCourses();

    const stats: CourseStats = {
      totalCourses: courses.length,
      notStarted: courses.filter((c) => c.status === "nao_iniciado").length,
      inProgress: courses.filter((c) => c.status === "em_andamento").length,
      completed: courses.filter((c) => c.status === "concluido").length,
      paused: courses.filter((c) => c.status === "pausado").length,
      totalHoursStudied: courses.reduce((total, course) => {
        return total + (course.estimatedHours * course.progress) / 100;
      }, 0),
      averageProgress:
        courses.length > 0
          ? courses.reduce((total, course) => total + course.progress, 0) /
            courses.length
          : 0,
    };

    return stats;
  }

  // Dados completos do dashboard
  static getDashboardData(): DashboardData {
    const courses = this.getCourses();
    const stats = this.getStats();
    const recentActivity = this.getActivities().slice(0, 10);

    const dashboardData = {
      courses,
      stats,
      recentActivity,
    };

    return dashboardData;
  }
}

// Função para facilitar o uso
export const mockCourseDB = MockCourseDB;
