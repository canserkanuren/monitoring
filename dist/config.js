"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log4js_1 = require("log4js");
log4js_1.configure({
    appenders: { monitor: { type: 'file', filename: 'logs/monitor.log' }, console: { type: 'console' } },
    categories: { default: { appenders: ['monitor', 'console'], level: 'debug' } }
});
exports.logger = log4js_1.getLogger();
//# sourceMappingURL=config.js.map