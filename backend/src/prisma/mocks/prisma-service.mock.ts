export const mockPrismaService = () => ({
  users: {
    findMany: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
  },
  collaborators: {
    findMany: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
  },
  timeTrackers: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
  },
  tasks: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
  },
});
