# Deploy TEAM360 to Vercel via REST API (no npm/CLI required).
# Usage:
#   $env:VERCEL_TOKEN = "your-token-from-vercel.com/account/tokens"
#   .\deploy.ps1

param(
    [string]$Token = $env:VERCEL_TOKEN,
    [ValidateSet("production", "preview")]
    [string]$Target = "production"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot

if (-not $Token) {
    Write-Host "Missing Vercel token." -ForegroundColor Red
    Write-Host "Create one at: https://vercel.com/account/tokens"
    Write-Host 'Then run: $env:VERCEL_TOKEN = "your-token"; .\deploy.ps1'
    exit 1
}

$exclude = @('.git', '.tools', '.vercel', 'node_modules', 'deploy.ps1', 'team360-deploy.zip')
$textExtensions = @('.html', '.css', '.js', '.json', '.md', '.txt', '.svg')

$files = Get-ChildItem -Path $ProjectRoot -Recurse -File | Where-Object {
    $rel = $_.FullName.Substring($ProjectRoot.Length + 1)
    -not ($exclude | Where-Object { $rel -like "$_*" -or $rel -like "*\$_*" })
}

Write-Host "Packaging $($files.Count) files..." -ForegroundColor Cyan

$manifest = @()
foreach ($file in $files) {
    $relativePath = ($file.FullName.Substring($ProjectRoot.Length + 1) -replace '\\', '/')
    $ext = $file.Extension.ToLowerInvariant()

    if ($textExtensions -contains $ext) {
        $manifest += @{
            file     = $relativePath
            data     = [System.IO.File]::ReadAllText($file.FullName)
            encoding = 'utf-8'
        }
    }
    else {
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $manifest += @{
            file     = $relativePath
            data     = [Convert]::ToBase64String($bytes)
            encoding = 'base64'
        }
    }
}

$body = @{
    name   = 'team360'
    target = $Target
    files  = $manifest
} | ConvertTo-Json -Depth 6 -Compress

$headers = @{
    Authorization = "Bearer $Token"
    'Content-Type' = 'application/json'
}

Write-Host "Deploying to Vercel ($Target)..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri 'https://api.vercel.com/v13/deployments' -Method Post -Headers $headers -Body $body
}
catch {
    $detail = $_.ErrorDetails.Message
    Write-Host "Deployment failed: $detail" -ForegroundColor Red
    exit 1
}

$url = if ($response.url) { "https://$($response.url)" } else { $response.aliasUrl }
Write-Host ""
Write-Host "Deployment started successfully!" -ForegroundColor Green
Write-Host "URL: $url"
Write-Host "Status: $($response.readyState)"
Write-Host ""
Write-Host "Open the URL in your browser once the deployment is READY."
