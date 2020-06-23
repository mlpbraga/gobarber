import { Router } from 'express';
const routes = Router();

routes.post('/users', (req, res) => {
  const { name, email} = req.body;

  const user = {
    name,
    email,
  }
  return res.json(user);
});

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello'});
});

export default routes;
