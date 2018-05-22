import { app, port } from '../server';
import { logger } from '../config';
import { Router, Request, Response, Express } from 'express';

const expressWs = require('express-ws');
const pty = require('node-pty');

const router = Router() as any;

var terminals = {},
  logs = {};

router.get('/', (req: Request, res: Response) => {
  res.render('terminal', { title: 'Terminal', message: 'Cancer !' });
});

router.post('/terminals', (req, res) => {
  var term = pty.spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
    name: 'xterm-color',
    cols: 100,
    rows: 40,
    cwd: process.env.PWD,
    env: process.env
  });

  logger.info('Created terminal with PID: ' + term.pid);
  terminals[term.pid] = term;
  logs[term.pid] = '';
  term.on('data', data => {
    logs[term.pid] += data;
  });
  res.send(term.pid.toString());
  res.end();
});

router.ws('/terminals/:pid', (ws, req) => {
  var term = terminals[parseInt(req.params.pid)];
  logger.info('Connected to terminal ' + term.pid);
  ws.send(logs[term.pid]);

  term.on('data', data => {
    try {
      ws.send(data);
      logger.info(data);
    } catch (ex) {
      // The WebSocket is not open, ignore
    }
  });
  ws.on('message', msg => {
    term.write(msg);
  });
  ws.on('close', () => {
    term.kill();
    logger.info('Closed terminal ' + term.pid);
    // Clean things up
    delete terminals[term.pid];
    delete logs[term.pid];
  });
});

export const TerminalController = router;
