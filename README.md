![Node.js](https://img.shields.io/badge/node.js-v20.12.2-green)
![NestJS](https://img.shields.io/badge/NestJS-v11.0.1-red)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Vue.js](https://img.shields.io/badge/Vue.js-v3-42b883)
![Bulma](https://img.shields.io/badge/Bulma-CSS-00D1B2)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED)
![Pino](https://img.shields.io/badge/Pino-logger-orange)

# Sistema de Para controle de tarefas com Apontamento de Horas

## 📌 Visão Geral

Este projeto é uma aplicação completa para gerenciamento de **projetos, tarefas e controle de tempo**.  
O sistema permite que colaboradores se cadastrem, se associem a projetos, criem tarefas e registrem horas trabalhadas.  

A solução foi construída com **NestJS** no backend, **Vue.js** no frontend, **Prisma + PostgreSQL** no banco de dados, e segue boas práticas como **Design Patterns, Mocks e Stubs, autenticação JWT, validação de dados, containerização com Docker e logging estruturado com Pino**.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Linguagem**: TypeScript
- **Framework**: NestJS
- **ORM**: PrismaORM
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT + Bcrypt
- **Validação**: Class Validator
- **Logs**: Pino (nestjs-pino)
- **Testes**: Jest + Supertest
- **Containerização**: Docker

### Frontend
- **Framework**: Vue.js 3 (Options API)
- **UI**: Bulma CSS
- **Validação de Formulários**: Zod
