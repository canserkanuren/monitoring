"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.render('terminal', { title: 'Terminal', message: 'Cancer !' });
});
exports.TerminalController = router;
//# sourceMappingURL=terminal.controller.js.map