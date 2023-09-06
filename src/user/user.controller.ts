import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(public service: UserService) {}

  @Get()
  getAllUsers() {
    return this.service.findAll();
  }
  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.service.findById({ where: { id } });
  }

  @Post()
  createUser(@Body() createDto: CreateUserDto) {
    return this.service.create(createDto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.service.update({ where: { id } }, updateDto);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.service.delete({ where: { id } });
  }
}
