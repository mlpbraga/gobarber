import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const authenticateUserService = container.resolve(AuthenticateUserService);
  const { email, password } = req.body;
  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  delete user.password;
  return res.json({ user, token });
});

export default sessionsRouter;
