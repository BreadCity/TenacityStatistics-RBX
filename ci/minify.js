// https://github.com/richie0866/orca/blob/master/ci/minify.js

/* eslint-disable no-undef */
/* eslint-disable roblox-ts/module */
const luamin = require('luamin');
const path = require('path');
const fs = require('fs');

const result = luamin.minify(fs.readFileSync(path.join(__dirname, '/bundle.tmp'), 'utf8'));
fs.writeFileSync('ci/bundle.tmp', result);
