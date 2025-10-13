import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export type SwaggerParamsType = {
  description: string;
  example: Record<string, any>;
};

export function CreatedResponseDecorator(
  description: string,
  example: Record<string, any>,
) {
  return applyDecorators(
    ApiCreatedResponse({
      description,
      example,
    }),
  );
}

export function OkResponseDecorator(
  description: string,
  example: Record<string, any>,
) {
  return applyDecorators(
    ApiOkResponse({
      description,
      example,
    }),
  );
}

export function UsuarioUnauthorizedResponseDecorator() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Usuário não autenticado',
      example: {
        statusCode: 401,
        message: `Unauthorized`,
      },
    }),
  );
}

export function ValidationBadRequestResponseDecorator() {
  return applyDecorators(
    ApiBadRequestResponse({
      example: {
        statusCode: 400,
        message: ['dto message error'],
        error: 'Bad Request',
      },
    }),
  );
}

export function ConflictResponseDecorator(text: string) {
  return applyDecorators(
    ApiConflictResponse({
      description: text,
      example: {
        statusCode: 409,
        message: text,
      },
    }),
  );
}

export function NotFoundEntityResponseDecorator(
  entity: string,
  field: string = 'field_example',
) {
  return applyDecorators(
    ApiNotFoundResponse({
      description: `${entity} não encontrado`,
      example: {
        statusCode: 404,
        message: `Nenhum ${entity} encontrado com os atributos: [${field}: ${field}]`,
      },
    }),
  );
}

export function ForbiddenResponseDecorator(text: string) {
  return applyDecorators(
    ApiForbiddenResponse({
      description: text,
      example: { statusCode: 403, message: text },
    }),
  );
}

export const userResponseExample = {
  id: 'user-123',
  username: 'joao',
  created_at: '2025-01-01T00:00:00.000Z',
  updated_at: '2025-01-01T00:00:00.000Z',
  deleted_at: null,
} as const;

export const collaboratorResponseExample = {
  id: 'collab-123',
  name: 'Maria Silva',
  user_id: 'user-123',
  created_at: '2025-01-01T00:00:00.000Z',
  updated_at: '2025-01-01T00:00:00.000Z',
  deleted_at: null,
  user: userResponseExample,
} as const;

export const projectResponseExample = {
  id: 'proj-123',
  name: 'Projeto XPTO',
  created_at: '2025-01-01T00:00:00.000Z',
  updated_at: '2025-01-01T00:00:00.000Z',
  deleted_at: null,
  tasks: [],
} as const;

export const taskResponseExample = {
  id: 'task-123',
  name: 'Implementar autenticação',
  description: 'Criar sistema de login com JWT',
  project_id: 'proj-123',
  created_at: '2025-01-01T00:00:00.000Z',
  updated_at: '2025-01-01T00:00:00.000Z',
  deleted_at: null,
  project: {
    id: 'proj-123',
    name: 'Projeto XPTO',
  },
} as const;

export const timeTrackerResponseExample = {
  id: 'tt-123',
  start_date: '2025-01-15T08:00:00.000Z',
  end_date: '2025-01-15T17:00:00.000Z',
  timezone_id: 'America/Sao_Paulo',
  task_id: 'task-123',
  collaborator_id: 'collab-123',
  created_at: '2025-01-01T00:00:00.000Z',
  updated_at: '2025-01-01T00:00:00.000Z',
  deleted_at: null,
  tasks: {
    id: 'task-123',
    name: 'Implementar autenticação',
  },
  collaborators: {
    id: 'collab-123',
    name: 'Maria Silva',
  },
} as const;
