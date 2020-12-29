import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, user_login, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    user_login,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
