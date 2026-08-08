import fs from 'node:fs';
import path from 'node:path';

// 1. Patch vercel.node.mjs for socket safety
const vercelNodePath = path.resolve('node_modules/nitro/dist/presets/vercel/runtime/vercel.node.mjs');

if (fs.existsSync(vercelNodePath)) {
  let content = fs.readFileSync(vercelNodePath, 'utf8');
  if (content.includes('Object.defineProperty(req.socket, "remoteAddress"')) {
    content = content.replace(
      'Object.defineProperty(req.socket, "remoteAddress"',
      'if (req.socket) Object.defineProperty(req.socket, "remoteAddress"'
    );
    fs.writeFileSync(vercelNodePath, content, 'utf8');
    console.log('[patch-nitro] Successfully patched vercel.node.mjs');
  }
}

// 2. Patch common.mjs to avoid invalid '+' and '[...]' characters in generated chunk filenames
// which fail on Vercel/AWS Lambda serverless filesystem imports (ERR_MODULE_NOT_FOUND)
const commonMjsPath = path.resolve('node_modules/nitro/dist/_build/common.mjs');

if (fs.existsSync(commonMjsPath)) {
  let content = fs.readFileSync(commonMjsPath, 'utf8');
  let modified = false;

  if (content.includes('.sort().join("+")')) {
    content = content.replace('.sort().join("+")', '.sort().join("_")');
    modified = true;
  }

  if (content.includes('`${chunk.name}+[...].mjs`')) {
    content = content.replace('`${chunk.name}+[...].mjs`', '`${chunk.name}_etc.mjs`');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(commonMjsPath, content, 'utf8');
    console.log('[patch-nitro] Successfully patched chunk naming in Nitro common.mjs');
  }
}

