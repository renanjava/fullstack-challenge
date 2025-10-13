import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  OkResponseDecorator,
  ValidationBadRequestResponseDecorator,
  NotFoundEntityResponseDecorator,
  ConflictResponseDecorator,
  UsuarioUnauthorizedResponseDecorator,
  userResponseExample,
} from '../../common/decorators/swagger-api.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @OkResponseDecorator('Lista de usuários retornada com sucesso', [
    userResponseExample,
  ])
  @UsuarioUnauthorizedResponseDecorator()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @OkResponseDecorator('Usuário encontrado com sucesso', userResponseExample)
  @NotFoundEntityResponseDecorator('Usuário', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @OkResponseDecorator('Usuário atualizado com sucesso', userResponseExample)
  @ValidationBadRequestResponseDecorator()
  @NotFoundEntityResponseDecorator('Usuário', 'id')
  @ConflictResponseDecorator('Username já existe')
  @UsuarioUnauthorizedResponseDecorator()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Patch('active/:id')
  @OkResponseDecorator('Usuário reativado com sucesso', userResponseExample)
  @NotFoundEntityResponseDecorator('Usuário', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async active(@Param('id') id: string) {
    return await this.usersService.active(id);
  }

  @Delete(':id')
  @OkResponseDecorator('Usuário removido com sucesso (soft delete)', {
    ...userResponseExample,
    deletedAt: '2025-01-01T00:00:00.000Z',
  })
  @NotFoundEntityResponseDecorator('Usuário', 'id')
  @UsuarioUnauthorizedResponseDecorator()
  async softRemove(@Param('id') id: string) {
    return await this.usersService.softRemove(id);
  }
}
