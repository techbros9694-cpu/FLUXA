import fs from 'node:fs';
import path from 'node:path';

const vercelNodePath = path.resolve('node_modules/nitro/dist/presets/vercel/runtime/vercel.node.mjs');

if (fs.existsSync(vercelNodePath)) {
  let content = fs.readFileSync(vercelNodePath, 'utf8');
  if (content.includes('Object.defineProperty(req.socket, "remoteAddress"')) {
    content = content.replace(
      'Object.defineProperty(req.socket, "remoteAddress"',
      'if (req.socket) Object.defineProperty(req.socket, "remoteAddress"'
    );
    fs.writeFileSync(vercelNodePath, content, 'utf8');
    console.log('[patch-nitro] Successfully patched vercel.node.mjs for Vercel serverless environment.');
  } else if (content.includes('if (req.socket)')) {
    console.log('[patch-nitro] vercel.node.mjs is already patched.');
  }
}
