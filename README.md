# 🎓 Falky Frontend

Frontend do sistema educacional Falky com assistente IA personalizado.

## ✨ Funcionalidades

- 🎭 **10 Personalidades do Falky**: Conversador, Coach Motivacional, Superdireto, Professor Clássico, Cientista, Zueiro, Gamer, Zen, Sábio, Hacker
- 🧠 **Suporte à Neurodivergência**: TDAH, Autismo, Dislexia, Discalculia, Transtorno de Processamento Sensorial
- 📚 **Sistema de Preferências de Curso**: Níveis de conhecimento, ritmos de estudo, motivações
- 🧪 **Página de Teste da API**: Interface completa para testar todos os endpoints
- 🎨 **UI Moderna**: Design responsivo e acessível

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm/yarn/pnpm
- Backend Falky rodando em `localhost:8000`

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd falky-frontend

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🧪 Testando a API

### Página de Teste Dedicada
1. Acesse `/api-test` ou clique em "🧪 Teste API" no header
2. Use os botões para testar todos os endpoints
3. Visualize resultados em tempo real
4. Teste com perfis pré-definidos

### Endpoints Testados
- **Usuários**: Criar, Buscar, Atualizar, Listar preferências
- **Cursos**: Criar, Buscar, Atualizar, Listar preferências de curso

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Pages (App Router)
│   ├── api-test/          # 🧪 Página de teste da API
│   ├── create-course-*/   # Fluxo de criação de curso
│   └── ...
├── components/            # Componentes reutilizáveis
├── controllers/          # 🎮 Controllers da API
├── services/            # 🔧 Serviços (Axios, etc)
├── types/              # 📝 Tipos TypeScript
├── utils/              # 🛠️ Utilitários
├── constants/          # 📋 Constantes
└── hooks/              # 🪝 Custom hooks
```

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Backend
Certifique-se de que o backend Falky está rodando:
```bash
# No diretório do backend
python run_server.py
```

## 📚 Documentação

- [`docs/user-preferences-system.md`](docs/user-preferences-system.md) - Sistema de preferências
- [`docs/api-test-page.md`](docs/api-test-page.md) - Guia da página de teste
- [`docs/design-system.md`](docs/design-system.md) - Sistema de design
- [`docs/api-management-system.md`](docs/api-management-system.md) - Sistema de API

## 🎯 Tipos de Usuário Suportados

### Personalidades do Falky
- **Conversador**: Diálogo descontraído e envolvente
- **Coach Motivacional**: Incentivador e energético
- **Superdireto**: Explicações enxutas e diretas
- **Professor Clássico**: Postura didática e formal
- **Cientista**: Fundamentação técnica detalhada
- **Zueiro**: Humor e leveza no aprendizado
- **Gamer**: Gamificação do processo
- **Zen**: Abordagem serena e pausada
- **Sábio**: Metáforas e analogias filosóficas
- **Hacker**: Analogias técnicas e investigativas

### Neurodivergências
- **TDAH**: Sessões dinâmicas com gamificação
- **Autismo**: Estrutura previsível e linguagem literal
- **Dislexia**: Formatos audiovisuais e mapas mentais
- **Discalculia**: Abordagens verbais e visuais
- **Transtorno de Processamento Sensorial**: Ambientes controlados

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificar linting
npm run type-check   # Verificar TypeScript
```

## 🧪 Exemplos de Uso da API

### Criar Preferências de Usuário
```typescript
import { apiController, FalkyPersonalityType } from '@/controllers/api.controller';

const preferences = {
  user_name: "João Silva",
  user_birth_date: "1990-05-15",
  falky_personality: FalkyPersonalityType.CONVERSADOR,
  user_neurodivergence: "none"
};

const response = await apiController.setUserPreferences(preferences);
```

### Buscar Preferências
```typescript
const userPrefs = await apiController.getUserPreferences(userId);
const coursePrefs = await apiController.getCoursePreferences(userId, courseId);
```

## 🔍 Solução de Problemas

### Backend não responde
1. Verifique se está rodando em `localhost:8000`
2. Confirme as variáveis de ambiente
3. Verifique logs do console

### Erros de TypeScript
1. Execute `npm run type-check`
2. Verifique importações dos tipos
3. Confirme versões das dependências

### Problemas de Build
1. Limpe cache: `rm -rf .next node_modules && npm install`
2. Verifique sintaxe do código
3. Execute linting: `npm run lint`

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Deploy automático via GitHub
# ou
vercel --prod
```

### Outros Providers
```bash
npm run build
# Deploy da pasta .next/
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

---

**Desenvolvido com ❤️ para revolucionar a educação personalizada**
