import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  user_login: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    email,
    password,
    user_login,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkEmailExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new Error('Email address already used');
    }

    const checkUserExists = await usersRepository.findOne({
      where: { user_login },
    });

    if (checkUserExists) {
      throw new Error('User login a already used');
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      user_login,
      password: hashPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
