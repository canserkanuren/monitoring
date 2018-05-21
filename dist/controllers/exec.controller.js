"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_1 = require("../config");
var exec = require('child_process').exec;
var router = express_1.Router();
router.post('/', function (req, res) {
    var cmd = exec(req.body.cmd);
    cmd.stdout.on('data', function (data) {
        config_1.logger.info('stdout: ' + data.toString());
    });
    cmd.stderr.on('data', function (data) {
        config_1.logger.info('stderr: ' + data.toString());
        res.end();
    });
    cmd.on('exit', function (code) {
        config_1.logger.info('child process exited with code ' + code.toString());
        res.end();
    });
});
exports.ExecController = router;
//# sourceMappingURL=exec.controller.js.map