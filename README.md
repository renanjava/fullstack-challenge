![Node.js](https://img.shields.io/badge/node.js-v20.12.2-green)
![NestJS](https://img.shields.io/badge/NestJS-v10.0.0-red)
![Vue.js](https://img.shields.io/badge/Vue.js-v3.4.0-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16-blue)
![Docker](https://img.shields.io/badge/Docker-enabled-blue)
![Test Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen)

# Time Tracker - Aplicação Fullstack

## 📌 Visão Geral

Time Tracker é uma aplicação fullstack completa para gerenciamento de tempo e tarefas, desenvolvida com **NestJS** no backend e **Vue.js** no frontend. O sistema permite que usuários gerenciem projetos, tarefas, colaboradores e rastreiem o tempo gasto em cada atividade, com autenticação JWT, processamento assíncrono com RabbitMQ e interface responsiva.

---

## 🚀 Tecnologias Utilizadas

### Backend

- **Framework**: NestJS
- **Linguagem**: TypeScript
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT e Bcrypt
- **Validação**: Class Validator & Class Transformer
- **Mensageria**: RabbitMQ
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest (80%+ coverage)
- **CI/CD**: GitHub Actions

### Frontend

- **Framework**: Vue.js 3 (Composition API + Options API)
- **Build Tool**: Vite
- **Estilização**: Bulma CSS
- **Roteamento**: Vue Router
- **Ícones**: Lucide Vue Next & Font Awesome

### DevOps

- **Containerização**: Docker & Docker Compose
- **Web Server**: Nginx
- **Orquestração**: Multi-stage builds
- **CI/CD**: GitHub Actions com testes automatizados

---

## 📂 Estrutura do Projeto

```plaintext
/
├── backend/
│   ├── src/
│   │   ├── modules/           # Módulos da aplicação (tasks, projects, users, etc)
│   │   ├── auth/              # Configuração da autenticação com JWT
│   │   ├── common/            # Decorators, filters, guards, pipes
│   │   ├── prisma/            # Configuração Prisma
│   │   ├── queue/             # Configuração RabbitMQ
│   │   └── main.ts            # Arquivo principal
│   ├── prisma/
│   │   ├── migrations/        # Migrações do banco
│   │   ├── seed.ts            # Seeds com dados fictícios
│   │   └── schema.prisma      # Schema do banco
│   ├── test/                  # Testes unitários e de integração
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── api/               # Configuração e chamadas HTTP
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── interfaces/        # TypeScript interfaces
│   │   ├── utils/             # Funções utilitárias
│   │   ├── router/            # Configuração de rotas
│   │   └── App.vue
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🎯 Funcionalidades

### Autenticação e Segurança

- ✅ Login com JWT Token (expiração em 5 minutos)
- ✅ Hash de senha com Bcrypt através de Pipes customizados
- ✅ Proteção de rotas com Guards
- ✅ Refresh token e logout
- ✅ Validação automática de token no frontend

### Gestão de Projetos

- ✅ CRUD completo de projetos
- ✅ Associação de tarefas a projetos
- ✅ Listagem e filtros por projeto

### Gestão de Tarefas

- ✅ CRUD completo de tarefas
- ✅ Associação de tarefas a projetos e colaboradores (opcional)
- ✅ Filtros por projeto e colaborador
- ✅ Soft delete (campo `deletedAt`)
- ✅ Ativar/desativar registros

### Time Tracker

- ✅ Iniciar/parar rastreamento de tempo com um clique
- ✅ Validação de conflitos de intervalos de tempo
- ✅ Validação de horário de início/fim
- ✅ Processamento assíncrono com RabbitMQ para escalabilidade
- ✅ Histórico de atividades recentes (últimos 3 registros)

### Relatórios

- ✅ Visualização de horas trabalhadas no dia atual (formato HH:MM)
- ✅ Visualização de horas trabalhadas no mês atual (formato HH:MM)
- ✅ Filtros por projeto e colaborador
- ✅ Cards informativos responsivos

### Gestão de Usuários e Colaboradores

- ✅ CRUD de usuários
- ✅ CRUD de colaboradores
- ✅ Composição entre Users e Collaborators (cascade delete)
- ✅ Campo único em Users conforme regra de negócio

---

## ✅ Validações e Regras de Negócio

- Username único
- Password criptografado (bcrypt)
- Não permite time tracker com intervalo de tempo conflitante
- Task sempre associada a um projeto
- Colaborador opcional na task
- Total de horas em um dia ≤ 24h
- Timezone enviado em toda requisição de time tracker
- Data de início ≤ data de fim
- Validação de campos no frontend e backend

---

## 👤 User Stories

- Usuário pode ver/adicionar/editar/excluir projetos
- Usuário pode ver/adicionar/editar/excluir tarefas
- Usuário pode associar tarefa a projeto e colaborador
- Usuário pode filtrar tarefas por projeto/colaborador
- Usuário pode iniciar/parar time tracker de uma tarefa
- Usuário vê tempo gasto no dia/mês em destaque (HH:MM)
- Usuário vê relatório dia-a-dia do mês

---

## 🏗️ Arquitetura e Design Patterns

### Design Patterns Aplicados

#### Backend

- **Singleton Pattern**: Conexão única com banco de dados (padrão NestJS)
- **Factory Pattern**: Criação de instâncias complexas
- **Repository Pattern**: Abstração de acesso a dados com Prisma
- **Decorator Pattern**: Decorators customizados para Swagger
- **Adapter Pattern**: Pipes para transformação de dados
- **Observer Pattern**: RabbitMQ para processamento assíncrono

#### Frontend

- **Composition API**: Reutilização de lógica com composables
- **Component Pattern**: Componentes reutilizáveis e dinâmicos
- **Observer Pattern**: Sistema de eventos entre componentes
- **Factory Pattern**: Formulário dinâmico baseado em JSON

### Boas Práticas Implementadas

#### Segurança

- Variáveis sensíveis com `.env` e GitHub Secrets
- Whitelist em validações (`class-validator`)
- UUID para IDs únicos e seguros
- Hash automático de senhas com Pipes

#### Banco de Dados

- Prisma ORM com migrations versionadas
- Soft delete ao invés de remoção física
- Delete on cascade para evitar registros órfãos
- CamelCase no código e snake_case no banco (`@map`)
- Queries otimizadas com `include` e `count`

#### Performance

- Multi-stage builds no Docker (imagem otimizada)
- Processamento assíncrono com RabbitMQ
- Computed properties no Vue para reatividade eficiente
- Nginx como servidor web para produção

#### Testes

- Testes unitários para services, controllers e repositories
- Stubs com Faker.js para dados fictícios
- Mocks para métodos em testes
- Cobertura de código de 80%+
- CI/CD com GitHub Actions

#### Código Limpo

- DTOs para input e serialização para output
- Tratamento centralizado de erros com Global Filter
- Decorators customizados para reduzir duplicação
- Typescript para type safety
- ESLint e Prettier configurados

---

## 🛠️ Instalação e Configuração

### Pré-requisitos

- **Node.js**: v22.20.0 ou superior
- **Docker**: Para rodar os serviços
- **Docker Compose**: Para orquestração

### Passos para Instalação

#### 1. Clone o repositório:

```bash
git clone https://github.com/renanjava/fullstack-challenge
cd fullstack-challenge
code .
```

#### 2. Configure as variáveis de ambiente:

**Crie o arquivo .env no Backend** (`backend/.env`):

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/fullstack_challenge?schema=public"
DATABASE_NAME="fullstack_challenge"
JWT_SECRET="CAFECOMLEITE"
RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672
RABBITMQ_QUEUE_TIME_TRACKER=time-tracker-queue
```

#### 3. Instale as dependências:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 🖥️ Como Rodar a Aplicação

### Docker Compose

Antes de iniciar a aplicação com o Docker Compose, abra o Docker Desktop e certifique-se de que o Docker está em funcionamento. Isso é necessário para que os containers sejam executados corretamente.

```bash
# Na raiz do projeto
docker-compose up --build
```

A aplicação estará disponível em:

- **Frontend**: http://localhost:80 (acesse a url pelo docker desktop por causa do NGINX)
- **Backend**: http://localhost:3000
- **Swagger**: http://localhost:3000/api
- **RabbitMQ Management**: http://localhost:15672 (admin/admin123)

## 📚 Principais Rotas da API

### Autenticação

- **POST** `/auth/register` - Criar novo usuário
- **POST** `/auth/login` - Login (retorna JWT token)
- **GET** `/auth/profile` - Perfil do usuário autenticado

### Projetos

- **GET** `/projects` - Listar todos os projetos
- **GET** `/projects/:id` - Listar um projeto
- **POST** `/projects` - Criar novo projeto
- **PATCH** `/projects/:id` - Atualizar projeto
- **DELETE** `/projects/:id` - Soft delete de projeto
- **PATCH** `/projects/active/:id` - Reativar projeto

### Tarefas

- **GET** `/tasks` - Listar todas as tarefas
- **GET** `/tasks/:id` - Listar uma tarefa
- **POST** `/tasks` - Criar nova tarefa
- **PATCH** `/tasks/:id` - Atualizar tarefa
- **DELETE** `/tasks/:id` - Soft delete de tarefa
- **PATCH** `/tasks/active/:id` - Reativar tarefa

### Time Trackers

- **POST** `/time-trackers` - Criar registro de tempo (processado via RabbitMQ)
- **GET** `/time-trackers/:id` - Listar um registro de tempo
- **POST** `/time-trackers` - Criar novo registro de tempo
- **PATCH** `/time-trackers/:id` - Atualizar registro de tempo
- **DELETE** `/time-trackers/:id` - Soft delete de registro de tempo
- **PATCH** `/time-trackers/active/:id` - Reativar registro de tempo
- **GET** `/time-trackers/day/:date` - Horas total em um dia de todos projetos/colaboradores
- **GET** `/time-trackers/month/:date` - Horas total em um mês de todos projetos/colaboradores
- **GET** `/time-trackers/project/:id/day/:date` - Horas por projeto/dia
- **GET** `/time-trackers/project/:id/month/:date` - Horas por projeto/mês
- **GET** `/time-trackers/collaborator/:id/day/:date` - Horas por colaborador/dia
- **GET** `/time-trackers/collaborator/:id/month/:date` - Horas por colaborador/mês

### Colaboradores

- **GET** `/collaborators` - Listar todos os colaboradores
- **GET** `/collaborators/:id` - Listar um colaborador
- **POST** `/collaborators` - Criar novo colaborador
- **PATCH** `/collaborators/:id` - Atualizar colaborador
- **DELETE** `/collaborators/:id` - Soft delete de colaborador
- **PATCH** `/collaborators/active/:id` - Reativar colaborador

### Usuários

- **GET** `/users` - Listar todas os usuários
- **GET** `/users/:id` - Listar um usuário
- **PATCH** `/users/:id` - Atualizar usuário
- **DELETE** `/users/:id` - Soft delete de usuário
- **PATCH** `/users/active/:id` - Reativar usuário

- **📖 Documentação completa disponível em**: http://localhost:3000/api (Swagger)
- **📖 Caso preferir, realize requisições no postman**: [Acesse a coleção do Postman](https://www.postman.com/renan-g-l/fullstack-challenge/collection/8z6hcp3/fullstack-challenge?action=share&creator=30576907)

---

## ⚙️ Testes

### Rodar Testes com Cobertura

```bash
cd backend
npm run test:cov
```

### Cobertura Atual

- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

---

## 🔄 CI/CD

O projeto utiliza **GitHub Actions** para:

- ✅ Executar testes automaticamente em cada push/PR
- ✅ Verificar cobertura de código (mínimo 80%)
- ✅ Executar linter (ESLint)
- ✅ Feedback rápido para desenvolvedores

Configuração em `.github/workflows/check.yml`

---

## 🐰 Processamento Assíncrono com RabbitMQ

O sistema utiliza RabbitMQ para processar a criação de time trackers de forma assíncrona:

### Fluxo:

1. **Controller** recebe requisição POST `/time-trackers`
2. **Service** envia mensagem para fila RabbitMQ
3. **Worker** consome mensagem da fila
4. **Repository** salva no banco de dados

### Benefícios:

- 🚀 Escalabilidade horizontal (múltiplos workers)
- 🛡️ Resiliência (retry automático em caso de falha)
- ⚡ Performance (resposta rápida ao usuário)
- 📊 Processamento em lote eficiente

---

## 🎨 Frontend Features

### Componentes Reutilizáveis

- **Notification**: Sistema de notificações com 4 tipos (success, danger, warning, info)
- **ModalForm**: Formulário dinâmico baseado em JSON
- **List**: Lista genérica com ações de editar/deletar
- **Filter**: Componente de filtros reutilizável
- **DaysAndMonthsWorked**: Cards de relatório responsivos

### Sistema de Eventos

- Comunicação pai-filho via `emit`
- Watch para observar mudanças de estado
- Computed properties para reatividade

### Proteção de Rotas

- Guarda de autenticação com JWT
- Redirecionamento automático para login
- Validação de token em todas as requisições

---

## 📱 Responsividade

Toda a interface é **100% responsiva**, com breakpoints para:

- 📱 Mobile (< 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (> 1024px)

---

## 🗄️ Banco de Dados

### Modelagem

```
User (1) ──> (N) Collaborator
Project (1) ──> (N) Task
Task (1) ──> (N) TimeTracker
Collaborator (0..1) ──> (N) TimeTracker
```

### Features

- Soft delete em todas as entidades principais
- Cascade delete configurado
- Índices otimizados para queries frequentes
- Timezone automático via JavaScript Date

---

## 📊 Seeds

Para popular o banco com dados fictícios:
- Atualize a .env do backend:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fullstack_challenge?schema=public"
DATABASE_NAME="fullstack_challenge"
JWT_SECRET="CAFECOMLEITE"
RABBITMQ_URL=amqp://admin:admin123@localhost:5672
RABBITMQ_QUEUE_TIME_TRACKER=time-tracker-queue
```

```bash
cd backend
npm install
npx prisma db seed
```

Utiliza **Faker.js** para gerar:

- 20 usuários
- 20 colaboradores
- 20 projetos
- 10~20 tarefas
- 20 registros de time tracker

- Observação: o seed gerado é apenas dados fictícios para popular o banco de dados, portanto, ele não passa nas validações da service (alguns time trackers terá horários no intervalo de tempo de outro time tracker)

---

## 🔐 Segurança

- ✅ Senhas hasheadas com Bcrypt (salt rounds: 10)
- ✅ JWT com expiração configurável
- ✅ Validação de inputs com class-validator
- ✅ Proteção contra SQL Injection (Prisma ORM)
- ✅ CORS configurado

---

## 🐳 Docker

### Multi-stage Build

Imagens otimizadas para produção:

- Remoção de dev dependencies
- Build apenas de arquivos necessários
- Tamanho reduzido da imagem final

### Health Checks

Monitoramento automático da saúde dos containers:

- Backend: endpoint `/`
- PostgreSQL: verificação de conexão
- RabbitMQ: verificação de filas

### Volumes

Persistência de dados garantida:

- PostgreSQL: dados do banco
- RabbitMQ: mensagens e configurações

---

## 📝 Licença

Este projeto foi desenvolvido como parte de um teste técnico.

---

## 👨‍💻 Autor

- GitHub: [@renanjava](https://github.com/renanjava)
- LinkedIn: [Renan Geraldini Leão](https://linkedin.com/in/renan-g-l)
- Email: renanleao.f90@hotmail.com

---

## 🙏 Agradecimentos

Obrigado pela oportunidade de demonstrar minhas habilidades técnicas através deste projeto!

---

**⭐ Se este projeto foi útil, considere dar uma estrela no repositório!**
