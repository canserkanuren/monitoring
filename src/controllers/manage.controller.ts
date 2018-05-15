import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('manage', { title: 'Home', message: 'Cancer !' });
});

export const ManageController: Router = router;
