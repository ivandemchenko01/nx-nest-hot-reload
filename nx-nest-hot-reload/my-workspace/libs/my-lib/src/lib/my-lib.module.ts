import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';

@Module({
})
export class MyLibModule implements OnModuleInit {
  async onModuleInit() {
    console.log('2asdasdфывada hot reload')
  }
  static register(): DynamicModule {
    return {
      module: MyLibModule,
      providers: [],
      exports: [],
    };
  }
}
