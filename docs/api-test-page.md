# 🧪 Página de Teste da API - Guia de Uso

## Visão Geral

A página de teste da API (`/api-test`) é uma ferramenta dedicada para testar todos os endpoints do sistema de preferências do usuário e curso. Ela oferece uma interface intuitiva para executar e visualizar os resultados de todas as operações CRUD disponíveis.

## Como Acessar

1. **Via Header**: Clique no botão "🧪 Teste API" no cabeçalho principal
2. **Diretamente**: Navegue para `/api-test` na URL

## Funcionalidades

### 🔧 Controles

#### IDs Atuais
- **User ID**: ID do usuário atualmente selecionado (preenchido automaticamente ao criar preferências)
- **Course ID**: ID do curso atualmente selecionado (preenchido automaticamente ao criar preferências de curso)
- Você pode editar manualmente estes campos para testar com IDs específicos

#### Botões de Controle
- **🗑️ Limpar Tudo**: Remove todos os resultados e zera os IDs
- **🧹 Limpar Resultados**: Remove apenas os resultados dos testes, mantendo os IDs

### 👤 Preferências do Usuário

| Botão | Funcionalidade | Requisitos |
|-------|---------------|------------|
| **Criar Preferências** | Cria novas preferências de usuário com dados de exemplo | Nenhum |
| **Buscar Preferências** | Busca preferências por User ID | User ID válido |
| **Atualizar Preferências** | Atualiza nome e personalidade do usuário | User ID válido |
| **Listar Todas** | Lista todas as preferências de usuários cadastradas | Nenhum |

### 📚 Preferências do Curso

| Botão | Funcionalidade | Requisitos |
|-------|---------------|------------|
| **Criar Pref. Curso** | Cria preferências de curso para JavaScript | User ID válido |
| **Buscar Pref. Curso** | Busca preferências específicas de um curso | User ID e Course ID válidos |
| **Atualizar Pref. Curso** | Atualiza nome e nível do curso | User ID e Course ID válidos |
| **Listar Pref. Cursos** | Lista todas as preferências de cursos | Nenhum |

### 🎭 Exemplos Pré-definidos

Teste perfis específicos com um clique:

- **ESTUDANTE TRADICIONAL**: João Silva, Professor Clássico, sem neurodivergência
- **PROFISSIONAL RAPIDO**: Maria Santos, Superdireto, sem neurodivergência  
- **INICIANTE MOTIVADO**: Pedro Costa, Coach Motivacional, sem neurodivergência
- **TECH ENTHUSIAST**: Ana Ferreira, Hacker, sem neurodivergência
- **TDAH GAMER**: Carlos Oliveira, Gamer, com TDAH

## Fluxo de Teste Recomendado

### 1. Teste Básico de Usuário
```
1. Clique em "Criar Preferências" (User ID será preenchido automaticamente)
2. Clique em "Buscar Preferências" para verificar os dados criados
3. Clique em "Atualizar Preferências" para testar modificações
4. Clique em "Listar Todas" para ver todos os usuários
```

### 2. Teste de Curso
```
1. Com um User ID válido, clique em "Criar Pref. Curso"
2. Clique em "Buscar Pref. Curso" para verificar os dados
3. Clique em "Atualizar Pref. Curso" para testar modificações
4. Clique em "Listar Pref. Cursos" para ver todos os cursos
```

### 3. Teste com Exemplos
```
1. Escolha um perfil pré-definido (ex: "TDAH GAMER")
2. Use o User ID gerado para criar preferências de curso
3. Teste as operações de busca e atualização
```

## 📊 Interpretação dos Resultados

### Resultados de Sucesso (Fundo Verde)
```json
{
  "success": true,
  "data": {
    "user_id": "abc123...",
    "user_name": "João Teste API",
    "user_age": 34,
    // ... outros campos
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Resultados de Erro (Fundo Vermelho)
```json
{
  "success": false,
  "error": "Recurso não encontrado",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Dicas de Uso

### ✅ Boas Práticas
- Sempre teste criar antes de buscar/atualizar
- Use os exemplos pré-definidos para teste rápido
- Copie os IDs dos resultados para testes manuais
- Limpe os resultados periodicamente para organização

### ⚠️ Situações Comuns
- **"User ID não encontrado"**: Primeiro crie preferências de usuário
- **"Course ID não encontrado"**: Primeiro crie preferências de curso
- **"Erro de validação"**: Verifique se os dados estão no formato correto
- **"Erro de rede"**: Verifique se o backend está rodando

## Estados dos Botões

- **Normal**: Botão disponível para clique
- **Loading**: Mostra "Criando...", "Buscando...", etc.
- **Disabled**: Botão desabilitado durante operações

## Integração com Backend

A página testa os seguintes endpoints:

### Usuários
- `POST /api/v1/user-preferences` - Criar
- `GET /api/v1/user-preferences/{id}` - Buscar
- `PUT /api/v1/user-preferences/{id}` - Atualizar  
- `GET /api/v1/user-preferences` - Listar

### Cursos
- `POST /api/v1/course-preferences` - Criar
- `GET /api/v1/course-preferences/{user_id}/{course_id}` - Buscar
- `PUT /api/v1/course-preferences/{user_id}/{course_id}` - Atualizar
- `GET /api/v1/course-preferences` - Listar

## Solução de Problemas

### Backend Não Responde
```
1. Verifique se o backend está rodando (localhost:8000)
2. Confirme a URL da API nas variáveis de ambiente
3. Verifique os logs do console do navegador
```

### Dados Inconsistentes
```
1. Use "Limpar Tudo" para resetar o estado
2. Comece um novo fluxo de teste
3. Verifique se os IDs estão corretos
```

### Erros de Validação
```
1. Verifique o formato da data de nascimento (YYYY-MM-DD)
2. Confirme se os enums estão corretos
3. Verifique campos obrigatórios
```

## Dados de Exemplo Utilizados

### Preferências de Usuário
```typescript
{
  user_name: "João Teste API",
  user_birth_date: "1990-01-15",
  falky_personality: "conversador",
  user_neurodivergence: "none"
}
```

### Preferências de Curso
```typescript
{
  course_name: "JavaScript para Iniciantes",
  knowledge_level: "novato",
  study_pace: "moderado", 
  goals_and_motivations: "dominio_tema",
  additional_information: "Quero aprender JS para desenvolvimento web"
}
``` 