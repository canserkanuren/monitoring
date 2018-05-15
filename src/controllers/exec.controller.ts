import { Router, Request, Response } from 'express';
import { logger } from '../config';

const exec = require('child_process').exec;

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  var cmd = exec(req.body.cmd);

  cmd.stdout.on('data', data => {
    logger.info('stdout: ' + data.toString());
  });

  cmd.stderr.on('data', data => {
    logger.info('stderr: ' + data.toString());
    res.end();
  });

  cmd.on('exit', code => {
    logger.info('child process exited with code ' + code.toString());
    res.end();
  });
});

export const ExecController: Router = router;
