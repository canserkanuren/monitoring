import { configure, getLogger } from 'log4js';

configure({
	appenders:  { monitor: { type: 'file', filename: 'logs/monitor.log' }, console: { type: 'console' } },
	categories: { default: { appenders: ['monitor', 'console'], level: 'debug' } }
});

export const logger = getLogger();
