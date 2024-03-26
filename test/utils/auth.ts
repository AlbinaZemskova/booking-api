import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AuthService } from '../../src/auth/auth.service';
import { User } from '../../src/users/entities/user.entity';
import { Role } from '../../src/users/enum/roles.enum';

export const signUpAdmin = async (
  testingModule: TestingModule,
): Promise<string> => {
  const usersRepository = testingModule.get<Repository<User>>(
    getRepositoryToken(User),
  );
  const authenticationService = testingModule.get<AuthService>(AuthService);

  await authenticationService.signUp({
    email: 'admin@mail.com',
    firstName: 'admin',
    lastName: 'test',
    password: '1234',
  });

  const { accessToken, userId } = await authenticationService.signIn({
    email: 'admin@mail.com',
    password: '1234',
  });

  await usersRepository.update({ userId }, { role: Role.Admin });

  return `Bearer ${accessToken}`;
};
