import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import {
  CreatedResponseDecorator,
  OkResponseDecorator,
  ValidationBadRequestResponseDecorator,
  NotFoundEntityResponseDecorator,
  ConflictResponseDecorator,
  UsuarioUnauthorizedResponseDecorator,
  taskResponseExample,
} from '../../common/decorators/swagger-api.decorator';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @CreatedResponseDecorator('Tarefa criada com sucesso', taskResponseExample)
  @ValidationBadRequestResponseDecorator()
  @ConflictResponseDecorator('Nome da tarefa já existe')
  @UsuarioUnauthorizedResponseDecorator()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @OkResponseDecorator('Lista de tarefas retornada com sucesso', [
    taskResponseExample,
  ])
  @UsuarioUnauthorizedResponseDecorator()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @OkResponseDecorator('Tarefa encontrada com sucesso', taskResponseExample)
  @NotFoundEntityResponseDecorator('Tarefa', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @OkResponseDecorator('Tarefa atualizada com sucesso', taskResponseExample)
  @ValidationBadRequestResponseDecorator()
  @NotFoundEntityResponseDecorator('Tarefa', 'id')
  @ConflictResponseDecorator('Nome da tarefa já existe')
  @UsuarioUnauthorizedResponseDecorator()
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch('active/:id')
  @OkResponseDecorator('Tarefa reativada com sucesso', taskResponseExample)
  @NotFoundEntityResponseDecorator('Tarefa', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  active(@Param('id') id: string) {
    return this.tasksService.active(id);
  }

  @Delete(':id')
  @OkResponseDecorator('Tarefa removida com sucesso (soft delete)', {
    ...taskResponseExample,
    deletedAt: '2025-01-01T00:00:00.000Z',
  })
  @NotFoundEntityResponseDecorator('Tarefa', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  softRemove(@Param('id') id: string) {
    return this.tasksService.softRemove(id);
  }
}
