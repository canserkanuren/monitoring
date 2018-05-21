"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    var startTime = Date.now();
    var uptime_mills = (Date.now() - startTime), uptime_secs = (uptime_mills / 1000), uptime_mins = Math.round((uptime_secs / 60)), uptime_hrs = Math.round((uptime_mins / 60));
    res.json({
        uptime_mills: uptime_mills,
        uptime_secs: uptime_secs,
        uptime_mins: uptime_mins,
        uptime_hrs: uptime_hrs
    });
});
exports.HealthCheckController = router;
//# sourceMappingURL=healthcheck.controller.js.map