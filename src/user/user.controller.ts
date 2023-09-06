import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
