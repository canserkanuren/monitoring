import { Router, Request, Response } from 'express';
const psList = require('ps-list');
const exec = require('child_process').exec;

import { logger } from '../config';
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  psList().then(data => {
    res.render('manage', { title: 'Manage', processlist: data });
  });
});

router.post('/kill/:pid', (req: Request, res: Response) => {
  var cmd = exec("kill" + req.params.pid);
  cmd.on('exit', code => {
    logger.info('child process exited with code ' + code.toString());
    res.redirect('/manage');
  });
});

export const ManageController: Router = router;
