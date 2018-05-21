"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var response_time_1 = __importDefault(require("response-time"));
var statusMonitor = require('express-status-monitor')();
var controllers_1 = require("./controllers");
var config_1 = require("./config");
var app = express_1.default();
var port = process.env.PORT || 3000;
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(statusMonitor);
app.use(response_time_1.default());
app.use(compression_1.default());
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/**
  Route
**/
app.use('/', controllers_1.HomeController);
app.use('/manage', controllers_1.ManageController);
app.use('/terminal', controllers_1.TerminalController);
app.use('/healthcheck', controllers_1.HealthCheckController);
app.use('/exec', controllers_1.ExecController);
app.listen(port, function () {
    config_1.logger.info("Listening at http://localhost:" + port + "/");
});
//# sourceMappingURL=server.js.map