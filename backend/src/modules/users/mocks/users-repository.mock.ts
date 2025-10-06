export const mockUsersRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  findByUsernameAndReturnPassword: jest.fn(),
});
