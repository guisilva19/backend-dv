import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateDTO, UserDTO } from './users.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() user: UserDTO) {
    return await this.usersService.register(user);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async updateUser(@Body() body: UpdateDTO, @Req() request) {
    const token = request.headers.authorization.split(' ')[1];
    return await this.usersService.update(token, body);
  }

  // @Post('register/conjuge')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  // async createConjuge(@Body() conjuge: ConjugeDTO, @Req() request) {
  //   const token = request.headers.authorization.split(' ')[1];
  //   return await this.usersService.registerConjuge(token, conjuge);
  // }
}
