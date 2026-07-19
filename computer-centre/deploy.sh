#!/usr/bin/env bash
# Deploy TechHub Computer Centre to Vercel.
set -euo pipefail

TARGET="${1:-production}"
TOKEN="${VERCEL_TOKEN:-}"
ROOT="$(cd "$(dirname "$0")" && pwd)"

if [[ -z "$TOKEN" ]]; then
  echo "Missing VERCEL_TOKEN. Create one at https://vercel.com/account/tokens"
  exit 1
fi

TMP_JSON="$(mktemp)"
trap 'rm -f "$TMP_JSON"' EXIT

node - "$ROOT" "$TARGET" "$TMP_JSON" <<'NODE'
const fs = require('fs');
const path = require('path');
const [root, target, outPath] = process.argv.slice(2);
const exclude = new Set(['deploy.sh', 'README.md']);
const textExtensions = new Set(['.html', '.css', '.js', '.json', '.md', '.txt', '.svg']);

function walk(dir, base = '') {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full, rel));
    else if (!exclude.has(entry.name)) files.push({ rel, full });
  }
  return files;
}

const manifest = walk(root).map(({ rel, full }) => {
  const ext = path.extname(full).toLowerCase();
  if (textExtensions.has(ext)) {
    return { file: rel.replace(/\\/g, '/'), data: fs.readFileSync(full, 'utf8'), encoding: 'utf-8' };
  }
  return { file: rel.replace(/\\/g, '/'), data: fs.readFileSync(full).toString('base64'), encoding: 'base64' };
});

fs.writeFileSync(outPath, JSON.stringify({ name: 'techhub-computer-centre', target, files: manifest }));
console.log(`Packaged ${manifest.length} files.`);
NODE

RESPONSE="$(curl -sS -X POST 'https://api.vercel.com/v13/deployments?skipAutoDetectionConfirmation=1' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  --data-binary @"$TMP_JSON")"

URL="$(node -e "const r=JSON.parse(process.argv[1]); console.log(r.url?'https://'+r.url:'');" "$RESPONSE")"
if [[ -z "$URL" ]]; then echo "$RESPONSE"; exit 1; fi
echo "Deployed: $URL"
