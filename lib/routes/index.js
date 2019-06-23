"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();
/* GET home page. */


router.get('/', (_req, res) => {
  res.send('Hello World!');
});
var _default = router;
exports.default = _default;