import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { AppModule } from '../../src/app.module';
import DefaultDbConfigService from '../../src/database/databaseConfig.service';

export default async (
  modifyModule?: (moduleBuilder: TestingModuleBuilder) => TestingModuleBuilder,
  getTestingModule?: (testingModule: TestingModule) => void,
) => {
  dotenv.config({
    path: '.env',
    override: true,
  });

  let testingModuleBuilder: TestingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DefaultDbConfigService)
    .useClass(DefaultDbConfigService);

  if (modifyModule) {
    testingModuleBuilder = modifyModule(testingModuleBuilder);
  }

  const moduleFixture: TestingModule = await testingModuleBuilder.compile();

  if (getTestingModule) {
    getTestingModule(moduleFixture);
  }

  return moduleFixture.createNestApplication();
};
