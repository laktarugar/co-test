'use strict';

import express from 'express';
import path from 'path';

var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.resolve(path.join(__dirname, 'data.json')));
});

module.exports = router;
