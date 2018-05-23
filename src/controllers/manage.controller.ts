import { logger } from '../config';
import { Router, Request, Response } from 'express';
const psList = require('ps-list');
const exec = require('child_process').exec;
const os = require('os');

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  psList().then(data => {
    var cmd;
    var users;

    if (os.platform() == 'win32') {
      cmd = exec('wmic useraccount get name');
    } else {
      cmd = exec("getent passwd | awk -F ':' '{print $1}'");
    }

    cmd.stdout.on('data', data => {
      users = data.toString().split(/\s+/);
      logger.info('stdout: ' + data.toString());
    });

    cmd.stderr.on('data', data => {
      logger.error('stderr: ' + data.toString());
    });

    cmd.on('exit', code => {
      logger.info('child process exited with code ' + code.toString());
      res.render('manage', { title: 'Manage', processlist: data, users: users });
    });

    logger.info('Process number ' + data.length);
  });
});

router.post('/kill/:pid', (req: Request, res: Response) => {
  var cmd;
  var cmdLine;

  if (os.platform() == 'win32') {
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

router.post('/remove/:user', (req: Request, res: Response) => {
  var cmd;
  var cmdLine;
  if (os.platform() == 'win32') {
    cmd = exec('net user ' + req.params.user + ' /delete ');
    cmdLine = 'net user ' + req.params.user + ' /delete ';
  }
  else {
    cmd = exec('deluser ' + req.params.user);
    cmdLine = 'deluser ' + req.params.user;
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
