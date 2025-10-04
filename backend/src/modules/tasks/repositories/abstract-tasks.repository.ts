import { UpdateTaskDto } from '../dtos/update-task.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { ResponseTaskDto } from '../dtos/response-task.dto';

export abstract class TasksRepository {
  abstract create(createTaskDto: CreateTaskDto): Promise<ResponseTaskDto>;
  abstract findAll(): Promise<ResponseTaskDto[]>;
  abstract findOne(id: string): Promise<ResponseTaskDto>;
  abstract update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseTaskDto>;
}
