import { Module } from '@nestjs/common';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { PostEntity } from './post/entities/post.entity';
import { User } from './user/entities/user.entity';
import { GlobalExceptionFilter } from './filters/global.exception';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'plumtree',
      database: 'nestjsMSQLDB',
      entities: [PostEntity, User],
      synchronize: true,
    }),
    PostModule,
    UserModule,
    RouterModule.register([
      {
        path: 'users',
        module: UserModule,
      },
      {
        path: '/posts/:userId',
        module: PostModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
