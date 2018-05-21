"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var psList = require('ps-list');
var exec = require('child_process').exec;
var config_1 = require("../config");
var router = express_1.Router();
router.get('/', function (req, res) {
    psList().then(function (data) {
        res.render('manage', { title: 'Manage', processlist: data });
    });
});
router.post('/kill/:pid', function (req, res) {
    var cmd = exec("kill" + req.params.pid);
    cmd.on('exit', function (code) {
        config_1.logger.info('child process exited with code ' + code.toString());
        res.redirect('/manage');
    });
});
exports.ManageController = router;
//# sourceMappingURL=manage.controller.js.map