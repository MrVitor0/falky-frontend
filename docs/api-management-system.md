# Sistema de Gerenciamento de API

## Visão Geral

Este sistema oferece uma solução completa para gerenciamento de APIs no projeto, seguindo padrões de projeto de alto nível, clean code e boas práticas de OOP.

## Arquitetura

### 📁 Estrutura de Pastas

```
src/
├── types/
│   └── api.types.ts          # Tipos e interfaces TypeScript
├── constants/
│   └── api.constants.ts      # Constantes e configurações
├── services/
│   └── api.service.ts        # Serviço Axios com interceptors
├── controllers/
│   └── api.controller.ts     # Controller principal da API
├── utils/
│   ├── date.utils.ts         # Utilitários de data
│   └── string.utils.ts       # Utilitários de string
└── hooks/
    └── useApiController.ts   # Hook personalizado para React
```

## Componentes Principais

### 1. **ApiService** (`services/api.service.ts`)

**Responsabilidades:**
- Configuração do Axios
- Interceptors de requisição e resposta
- Tratamento de erros
- Formatação automática de dados

**Recursos:**
- ✅ Validação automática de body JSON
- ✅ Adição automática de `user_id` estático
- ✅ Headers JSON por padrão
- ✅ Logging em desenvolvimento
- ✅ Tratamento de erros padronizado

```typescript
// Exemplo de uso direto
import { api } from '@/services/api.service';

const response = await api.get('/users');
```

### 2. **ApiController** (`controllers/api.controller.ts`)

**Responsabilidades:**
- Operações CRUD para entidades principais
- Comunicação com endpoints específicos
- Métodos async para operações assíncronas

**Métodos principais:**
- `createCourse()` - Cria um novo curso (async)
- `createUser()` - Cria um novo usuário
- `getRandomRickAndMortyCharacter()` - Busca personagem aleatório
- CRUD completo para Usuários e Cursos

```typescript
// Exemplo de uso
import { apiController } from '@/controllers/api.controller';

// Criar um curso
const courseData = {
  title: 'Curso de TypeScript',
  description: 'Aprenda TypeScript do básico ao avançado',
  instructor: 'João Silva',
  duration: 30,
  level: 'beginner'
};

const result = await apiController.createCourse(courseData);
```

### 3. **Utilitários**

#### DateUtils (`utils/date.utils.ts`)

**Funcionalidades:**
- Formatação de datas para padrão brasileiro
- Validação de datas
- Cálculos de diferença entre datas
- Conversão de timestamps

```typescript
import { formatDateToBrazilian, addDays } from '@/utils/date.utils';

const dataFormatada = formatDateToBrazilian(new Date());
// Output: "25/12/2024"

const dataFutura = addDays(new Date(), 7);
// Adiciona 7 dias à data atual
```

#### StringUtils (`utils/string.utils.ts`)

**Funcionalidades:**
- Formatação de strings (capitalização, slugs)
- Filtro de bad words
- Validação de nomes e emails
- Formatação de telefones brasileiros

```typescript
import { removeBadWords, capitalizeWords } from '@/utils/string.utils';

const textoLimpo = removeBadWords('Esse texto tem palavrão');
// Output: "Esse texto tem ********"

const nomeFormatado = capitalizeWords('joão silva');
// Output: "João Silva"
```

### 4. **Hook Personalizado** (`hooks/useApiController.ts`)

**Funcionalidades:**
- Gerenciamento de estado para requisições
- Controle de loading e errors
- Métodos otimizados para React

```typescript
import { useRickAndMortyCharacter } from '@/hooks/useApiController';

function MeuComponente() {
  const { character, loading, error, fetchRandomCharacter } = useRickAndMortyCharacter();

  return (
    <div>
      <button onClick={fetchRandomCharacter} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar Personagem'}
      </button>
      
      {character && (
        <div>
          <h3>{character.name}</h3>
          <p>Status: {character.status}</p>
        </div>
      )}
    </div>
  );
}
```

## Configurações

### Interceptor de Requisição

Automaticamente adiciona:
- `Content-Type: application/json`
- `user_id: "user_12345_static"`
- Timestamp da requisição
- Logs em desenvolvimento

### Interceptor de Resposta

Automaticamente:
- Valida se a resposta é um objeto JSON válido
- Formata resposta no padrão `ApiResponse<T>`
- Trata erros com mensagens padronizadas
- Adiciona timestamp da resposta

## Exemplos de Uso

### 1. Buscar Personagem Aleatório (Rick and Morty)

```typescript
import { apiController } from '@/controllers/api.controller';

const personagem = await apiController.getRandomRickAndMortyCharacter();
console.log(personagem.name, personagem.status);
```

### 2. Criar um Curso

```typescript
import { apiController } from '@/controllers/api.controller';

const novoCurso = await apiController.createCourse({
  title: 'React Avançado',
  description: 'Curso completo de React',
  instructor: 'Maria Santos',
  duration: 40,
  level: 'advanced'
});
```

### 3. Filtrar Bad Words

```typescript
import { removeBadWords } from '@/utils/string.utils';

const comentario = 'Este é um comentário com palavrão';
const comentarioLimpo = removeBadWords(comentario);
// Substitui palavras indesejadas por asteriscos
```

## Integração com Homepage

O sistema está integrado com a homepage através do componente `Hero`, que:
- Usa o hook `useRickAndMortyCharacter`
- Busca um personagem aleatório ao clicar no botão
- Exibe informações do personagem com tratamento de loading e erro

## Tratamento de Erros

### Códigos de Status

- `200` - Sucesso
- `201` - Criado
- `400` - Dados inválidos
- `401` - Não autorizado
- `404` - Não encontrado
- `500` - Erro interno do servidor

### Mensagens de Erro

- Erro de conexão: "Erro de conexão com o servidor"
- Dados inválidos: "Dados inválidos fornecidos"
- Não autorizado: "Acesso não autorizado"
- Não encontrado: "Recurso não encontrado"
- Erro interno: "Erro interno do servidor"

## Configuração do Ambiente

### Variáveis de Ambiente

```env
# URL da API principal (opcional)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Ambiente de desenvolvimento
NODE_ENV=development
```

### Dependências

```json
{
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

## Padrões de Projeto Utilizados

### 1. **Singleton Pattern**
- `ApiService` e `ApiController` são instâncias únicas
- Garantem configuração consistente em toda a aplicação

### 2. **Strategy Pattern**
- Interceptors implementam diferentes estratégias de tratamento
- Permite fácil extensão e modificação

### 3. **Factory Pattern**
- Criação de instâncias Axios com configurações específicas
- Facilita testes e manutenção

### 4. **Observer Pattern**
- Hooks React observam mudanças de estado
- Atualização automática da UI

## Boas Práticas Implementadas

### ✅ Clean Code
- Nomes descritivos
- Funções pequenas e focadas
- Comentários em português
- Separação de responsabilidades

### ✅ SOLID Principles
- Single Responsibility: Cada classe tem uma responsabilidade
- Open/Closed: Extensível sem modificar código existente
- Liskov Substitution: Interfaces bem definidas
- Interface Segregation: Interfaces específicas
- Dependency Inversion: Dependências por injeção

### ✅ Error Handling
- Try/catch em todas as operações assíncronas
- Mensagens de erro padronizadas
- Logs detalhados em desenvolvimento
- Estados de loading e erro

### ✅ Type Safety
- TypeScript em todos os arquivos
- Interfaces bem definidas
- Tipos para requests e responses
- Validação de tipos em tempo de compilação

## Extensibilidade

### Adicionando Nova Entidade

1. Adicione tipos em `api.types.ts`
2. Adicione endpoints em `api.constants.ts`
3. Implemente métodos CRUD no controller
4. Crie hook personalizado se necessário

### Adicionando Novo Interceptor

```typescript
// Em api.service.ts
this.axiosInstance.interceptors.request.use(
  (config) => {
    // Sua lógica personalizada
    return config;
  }
);
```

## Logs e Debugging

### Logs Automáticos
- 🚀 Requisições (método, URL, dados)
- ✅ Respostas (status, dados)
- ❌ Erros (detalhes completos)
- 🎭 Operações específicas (personagens, cursos)

### Console do Navegador
```
🚀 Requisição: GET /character/1
✅ Resposta recebida: { status: 200, data: {...} }
🎭 Personagem obtido: Rick Sanchez
```

## Testes

### Testando o Sistema

```typescript
// Teste de conexão
const isConnected = await apiController.testConnection();
console.log('API conectada:', isConnected);

// Teste de criação de curso
const courseData = { /* dados do curso */ };
const result = await apiController.createCourse(courseData);
console.log('Curso criado:', result.success);
```

Este sistema oferece uma base sólida e extensível para gerenciamento de APIs, seguindo as melhores práticas de desenvolvimento e proporcionando uma experiência consistente para os desenvolvedores. 