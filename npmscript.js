/* eslint-disable roblox-ts/module */
/* eslint-disable no-undef */

const { execSync } = require('child_process');

// package.json scripts
const argv = process.argv;
const find = argv.findIndex(v => v === '--script');
const script = argv[find + 1];
if (!find || !script)
  throw new Error('Script is undefined');

const path = require('path');

const Exe = process.platform === 'win32' ? v=>`${v}.exe` : v=>v;

let rojo = path.resolve(process.cwd(), 'bin', 'Rojo', Exe('rojo'));
let remodel = path.resolve(process.cwd(), 'bin', 'Remodel', Exe('remodel'));
const fs = require('fs');
if (!fs.existsSync(rojo))
  throw new Error('Cannot find rojo');
if (!fs.existsSync(remodel))
  throw new Error('Cannot find remodel');
rojo = `"${rojo}"`;
remodel = `"${remodel}"`;

const scripts = {
  'build': `${rojo} build default.project.json --output "script.rbxm"`,
  'remodel': `${remodel} run "${path.resolve(process.cwd(), 'ci', 'bundle.lua')}" "${path.resolve(process.cwd(), 'public', 'script.lua')}" dev verbose`
};

const data = scripts[script];
execSync(data);
