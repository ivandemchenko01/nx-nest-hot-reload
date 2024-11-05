import { Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MyLibModule} from "@my-workspace/my-lib"

@Module({
  imports: [MyLibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('app moduleasd hot reloadфыв')
  }
}
