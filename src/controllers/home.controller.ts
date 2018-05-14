import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Home', message: 'Cancer !' });
});

export const HomeController: Router = router;
