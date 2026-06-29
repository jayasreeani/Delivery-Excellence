#!/usr/bin/env bash
# Deploy TEAM360 static prototype to Vercel via REST API.
# Usage:
#   export VERCEL_TOKEN="your-token-from-vercel.com/account/tokens"
#   ./deploy.sh [production|preview]

set -euo pipefail

TARGET="${1:-production}"
TOKEN="${VERCEL_TOKEN:-}"

if [[ -z "$TOKEN" ]]; then
  echo "Missing Vercel token."
  echo "Create one at: https://vercel.com/account/tokens"
  echo 'Then run: export VERCEL_TOKEN="your-token"; ./deploy.sh'
  exit 1
fi

ROOT="$(cd "$(dirname "$0")" && pwd)"
TMP_JSON="$(mktemp)"
trap 'rm -f "$TMP_JSON"' EXIT

node <<'NODE' "$ROOT" "$TARGET" "$TMP_JSON"
const fs = require('fs');
const path = require('path');

const [root, target, outPath] = process.argv.slice(2);
const exclude = new Set(['.git', '.tools', '.vercel', 'node_modules', 'deploy.ps1', 'deploy.sh', 'team360-deploy.zip', 'backend', 'frontend', 'database']);
const textExtensions = new Set(['.html', '.css', '.js', '.json', '.md', '.txt', '.svg']);

function shouldInclude(rel) {
  const parts = rel.split('/');
  if (parts.some((p) => exclude.has(p))) return false;
  if (exclude.has(path.basename(rel))) return false;
  return true;
}

function walk(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!shouldInclude(rel + '/')) continue;
      files.push(...walk(full, rel));
    } else if (shouldInclude(rel)) {
      files.push({ rel, full });
    }
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

const body = { name: 'team360', target, files: manifest };
fs.writeFileSync(outPath, JSON.stringify(body));
console.log(`Packaged ${manifest.length} files for ${target} deploy.`);
NODE

echo "Deploying to Vercel ($TARGET)..."
RESPONSE="$(curl -sS -X POST 'https://api.vercel.com/v13/deployments' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  --data-binary @"$TMP_JSON")"

URL="$(node -e "const r=JSON.parse(process.argv[1]); const u=r.url?('https://'+r.url):(r.alias?.[0]||r.aliasUrl||''); console.log(u||'');" "$RESPONSE")"
STATE="$(node -e "const r=JSON.parse(process.argv[1]); console.log(r.readyState||r.error?.message||'unknown');" "$RESPONSE")"

if [[ -z "$URL" ]]; then
  echo "Deployment failed:"
  echo "$RESPONSE"
  exit 1
fi

echo ""
echo "Deployment started successfully!"
echo "URL: $URL"
echo "Status: $STATE"
echo ""
echo "Open the URL in Safari once the deployment is READY."
