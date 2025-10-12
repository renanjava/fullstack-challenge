export const mockTimeTrackersRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  verifyTimeConflict: jest.fn(),
  getTimeTrackersFromDay: jest.fn(),
  getTimeTrackersFromMonth: jest.fn(),
  getTimeTrackersFromDayWhereCollaboratorId: jest.fn(),
  getTimeTrackersFromMonthWhereCollaboratorId: jest.fn(),
  getTimeTrackersFromDayWhereProjectId: jest.fn(),
  getTimeTrackersFromMonthWhereProjectId: jest.fn(),
});
