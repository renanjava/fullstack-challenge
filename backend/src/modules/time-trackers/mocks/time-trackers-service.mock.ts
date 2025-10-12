export const mockTimeTrackersService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  active: jest.fn(),
  softRemove: jest.fn(),
  getTimeTrackersFromDay: jest.fn(),
  getTimeTrackersFromMonth: jest.fn(),
  getTimeTrackersFromDayWhereCollaboratorId: jest.fn(),
  getTimeTrackersFromMonthWhereCollaboratorId: jest.fn(),
  getTimeTrackersFromDayWhereProjectId: jest.fn(),
  getTimeTrackersFromMonthWhereProjectId: jest.fn(),
});
