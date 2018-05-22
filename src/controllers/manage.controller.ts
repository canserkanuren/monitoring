import { Router, Request, Response } from 'express';
const psList = require('ps-list');
const exec = require('child_process').exec;
const os = require('os');

import { logger } from '../config';
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  psList().then(data => {
    res.render('manage', { title: 'Manage', processlist: data });
    logger.info('Process number ' + data.length);
  });
});

router.post('/kill/:pid', (req: Request, res: Response) => {
  var cmd;
  var cmdLine;

  if(os.platform() == 'win32') {
    cmd = exec('TASKKILL /pid ' + req.params.pid);
    cmdLine = 'TASKKILL /pid ' + req.params.pid;
  } else {
    cmd = exec('kill -15 ' + req.params.pid);
    cmdLine = 'kill -15 ' + req.params.pid;
  }

  logger.debug('COMMAND : ' + cmdLine);

  cmd.stdout.on('data', data => {
    logger.info('stdout: ' + data.toString());
  });

  cmd.stderr.on('data', data => {
    logger.error('stderr: ' + data.toString());
  });

  cmd.on('exit', code => {
    logger.info('child process exited with code ' + code.toString());
    res.redirect('/manage');
  });
});

export const ManageController: Router = router;
