export const mockTimeTrackersService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  active: jest.fn(),
  softRemove: jest.fn(),
});
