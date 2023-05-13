import { Test, TestingModule } from '@nestjs/testing';
import { ControllerTestService } from './controller-test.service';

describe('ControllerTestService', () => {
  let service: ControllerTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControllerTestService],
    }).compile();

    service = module.get<ControllerTestService>(ControllerTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
