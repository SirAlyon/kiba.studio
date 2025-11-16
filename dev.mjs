#!/usr/bin/env node

// Workaround per Node 21 - module.createRequire bug
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire as nodeCreateRequire } from 'module';

if (!global.module) {
  global.module = {};
}
if (!global.module.createRequire) {
  global.module.createRequire = nodeCreateRequire;
}

// Avvia Nuxt dev
import('nuxi').then(({ runCommand }) => {
  process.argv = ['node', 'nuxi', 'dev'];
  runCommand('dev');
});