# ============================================================
#  PRE-PRODUCTION TESTER
#  Laravel + Inertia.js + React + Vite (Windows / Laragon)
#
#  Cara pakai:
#  1. Taruh di ROOT folder project (sejajar dengan artisan)
#  2. Buka PowerShell di folder tersebut
#  3. Jalankan: .\pre-prod-test.ps1
#
#  Jika ada error "cannot be loaded because running scripts is disabled":
#  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
# ============================================================

$REPORT = "pre-prod-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
$PASS = 0; $FAIL = 0; $WARN = 0

function Write-Report($msg) {
    Write-Host $msg
    Add-Content -Path $REPORT -Value $msg
}

function Pass($msg)    { Write-Report "  OK   | $msg"; $script:PASS++ }
function Fail($msg)    { Write-Report "  FAIL | $msg"; $script:FAIL++ }
function Warn($msg)    { Write-Report "  WARN | $msg"; $script:WARN++ }
function Info($msg)    { Write-Report "  INFO | $msg" }
function Section($msg) {
    Write-Report ""
    Write-Report "--------------------------------------------"
    Write-Report "  $msg"
    Write-Report "--------------------------------------------"
}

# Header
Write-Report ""
Write-Report "============================================================"
Write-Report "  PRE-PRODUCTION TEST REPORT"
Write-Report "  Project : $(Split-Path -Leaf (Get-Location))"
Write-Report "  Path    : $(Get-Location)"
Write-Report "  Tanggal : $(Get-Date)"
Write-Report "============================================================"

# ============================================================
# 1. STRUKTUR PROJECT
# ============================================================
Section "1. STRUKTUR PROJECT"

$requiredFiles = @("artisan", "composer.json", "package.json", ".env", "vite.config.js")
foreach ($f in $requiredFiles) {
    if (Test-Path $f) { Pass "File ada: $f" }
    else { Fail "File TIDAK ada: $f" }
}

$requiredDirs = @("app", "bootstrap", "config", "database", "public", "resources", "routes", "storage", "vendor", "node_modules")
foreach ($d in $requiredDirs) {
    if (Test-Path $d) { Pass "Folder ada: $d\" }
    else { Fail "Folder TIDAK ada: $d\ -- jalankan composer install / npm install" }
}

# Cek resources/js/app.jsx (entry point React)
if (Test-Path "resources/js/app.jsx") { Pass "Entry point React ada: resources/js/app.jsx" }
elseif (Test-Path "resources/js/app.tsx") { Pass "Entry point React ada: resources/js/app.tsx" }
else { Fail "Entry point React TIDAK ada (resources/js/app.jsx)" }

# ============================================================
# 2. KONFIGURASI .ENV
# ============================================================
Section "2. KONFIGURASI .ENV"

if (-not (Test-Path ".env")) {
    Fail ".env TIDAK ADA -- copy dari .env.example dan isi nilainya"
} else {
    Pass ".env ditemukan"
    $envContent = Get-Content ".env" -Raw
    $envLines = Get-Content ".env"

    function Get-EnvValue($key) {
        $line = $envLines | Where-Object { $_ -match "^$key=" } | Select-Object -First 1
        if ($line) { return ($line -split "=", 2)[1].Trim('"').Trim("'") }
        return $null
    }

    # Cek key penting
    foreach ($key in @("APP_NAME", "APP_URL", "DB_HOST", "DB_DATABASE", "DB_USERNAME")) {
        $val = Get-EnvValue $key
        if ($val) { Pass ".env: $key = $val" }
        else { Fail ".env: $key kosong atau tidak diset" }
    }

    # APP_DEBUG — wajib false di production
    $appDebug = Get-EnvValue "APP_DEBUG"
    if ($appDebug -eq "true") {
        Warn ".env: APP_DEBUG=true -- WAJIB ubah ke false sebelum deploy ke production!"
    } else {
        Pass ".env: APP_DEBUG=false (aman untuk production)"
    }

    # APP_ENV
    $appEnv = Get-EnvValue "APP_ENV"
    if ($appEnv -eq "production") {
        Warn ".env: APP_ENV=production di lokal -- sebaiknya pakai 'local' saat develop"
    } else {
        Pass ".env: APP_ENV=$appEnv"
    }

    # APP_KEY
    $appKey = Get-EnvValue "APP_KEY"
    if (-not $appKey -or $appKey -eq "") {
        Fail ".env: APP_KEY kosong -- jalankan: php artisan key:generate"
    } else {
        Pass ".env: APP_KEY sudah di-set"
    }

    # Bandingkan dengan .env.example
    if (Test-Path ".env.example") {
        $exampleKeys = Get-Content ".env.example" | Where-Object { $_ -match "^[A-Z]" } | ForEach-Object { ($_ -split "=")[0] }
        $missingKeys = @()
        foreach ($key in $exampleKeys) {
            if (-not ($envLines | Where-Object { $_ -match "^$key=" })) {
                $missingKeys += $key
            }
        }
        if ($missingKeys.Count -gt 0) {
            Fail ".env: Key dari .env.example yang hilang: $($missingKeys -join ', ')"
        } else {
            Pass ".env: Semua key dari .env.example sudah ada"
        }
    }

    # Cek .env di .gitignore
    if (Test-Path ".gitignore") {
        $gitignore = Get-Content ".gitignore"
        if ($gitignore | Where-Object { $_ -match "^\.env$" }) {
            Pass ".gitignore: .env sudah di-ignore"
        } else {
            Fail ".gitignore: .env TIDAK di-ignore -- password bisa ter-commit ke GitHub!"
        }
    }
}

# ============================================================
# 3. DATABASE & MIGRASI
# ============================================================
Section "3. DATABASE & MIGRASI"

try {
    $migrateStatus = php artisan migrate:status 2>&1
    $migrateStr = $migrateStatus -join "`n"
    if ($migrateStr -match "Ran|Pending|nothing") {
        Pass "Koneksi database berhasil"
        $pendingCount = ($migrateStatus | Where-Object { $_ -match "Pending" }).Count
        if ($pendingCount -gt 0) {
            Fail "Ada $pendingCount migration belum dijalankan -- jalankan: php artisan migrate"
        } else {
            Pass "Semua migration sudah dijalankan"
        }
    } else {
        Fail "Koneksi database GAGAL -- cek DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD di .env"
        Info "Error: $($migrateStatus | Select-Object -First 3)"
    }
} catch {
    Fail "Tidak bisa menjalankan php artisan -- pastikan PHP ada di PATH"
}

# ============================================================
# 4. PHP & COMPOSER
# ============================================================
Section "4. PHP & COMPOSER"

# Versi PHP
$phpVer = php -r "echo PHP_VERSION;" 2>&1
if ($phpVer -match "^\d") {
    Info "Versi PHP: $phpVer"
    $phpMajor = [int]($phpVer -split "\.")[0]
    $phpMinor = [int]($phpVer -split "\.")[1]
    if ($phpMajor -ge 8 -and $phpMinor -ge 1) { Pass "PHP $phpVer memenuhi syarat Laravel 10/11" }
    elseif ($phpMajor -ge 8) { Warn "PHP $phpVer -- Laravel terbaru butuh PHP 8.1+, pertimbangkan upgrade" }
    else { Fail "PHP $phpVer terlalu lama -- butuh minimal PHP 8.0" }
} else {
    Fail "PHP tidak ditemukan atau tidak ada di PATH"
}

# PHP Extensions
foreach ($ext in @("pdo", "mbstring", "openssl", "tokenizer", "xml", "ctype", "json", "bcmath")) {
    $extCheck = php -r "echo extension_loaded('$ext') ? 'yes' : 'no';" 2>&1
    if ($extCheck -eq "yes") { Pass "PHP extension: $ext aktif" }
    else { Fail "PHP extension: $ext TIDAK aktif -- Laravel butuh extension ini" }
}

# Composer audit
Info "Menjalankan composer audit..."
$composerAudit = composer audit 2>&1
$auditStr = $composerAudit -join "`n"
if ($LASTEXITCODE -ne 0 -and $auditStr -match "CVE|found \d+") {
    Fail "SECURITY: Ada vulnerability di PHP dependency:"
    $composerAudit | Where-Object { $_ -match "Package|Severity|CVE|Title" } | Select-Object -First 10 | ForEach-Object { Info "  $_" }
} else {
    Pass "Composer audit: Tidak ada vulnerability yang diketahui"
}

# ============================================================
# 5. NODE.JS & NPM
# ============================================================
Section "5. NODE.JS & NPM (REACT + VITE)"

# Versi Node
$nodeVer = node -v 2>&1
if ($nodeVer -match "^v\d") {
    Info "Versi Node.js: $nodeVer"
    $nodeMajor = [int](($nodeVer -replace "v","") -split "\.")[0]
    if ($nodeMajor -ge 18) { Pass "Node.js $nodeVer (Baik, Vite butuh Node 16+)" }
    elseif ($nodeMajor -ge 16) { Warn "Node.js $nodeVer -- disarankan upgrade ke Node 18 LTS" }
    else { Fail "Node.js $nodeVer terlalu lama -- Vite butuh minimal Node 16" }
} else {
    Fail "Node.js tidak ditemukan"
}

# npm audit
Info "Menjalankan npm audit..."
$npmAudit = npm audit 2>&1
$npmAuditStr = $npmAudit -join "`n"
$criticalHigh = $npmAudit | Where-Object { $_ -match "critical|high" }
if ($criticalHigh) {
    Fail "SECURITY: Ada vulnerability HIGH/CRITICAL di npm packages:"
    $criticalHigh | Select-Object -First 5 | ForEach-Object { Info "  $_" }
    Info "Jalankan: npm audit fix"
} else {
    $moderate = $npmAudit | Where-Object { $_ -match "moderate" }
    if ($moderate) { Warn "Ada moderate vulnerability di npm -- cek dengan: npm audit" }
    else { Pass "npm audit: Tidak ada vulnerability high/critical" }
}

# Production build test
Info "Menjalankan npm run build (ini mungkin butuh 1-2 menit)..."
$buildOutput = npm run build 2>&1
$buildStr = $buildOutput -join "`n"
if ($LASTEXITCODE -eq 0) {
    Pass "npm run build: BERHASIL -- siap untuk production"
    if (Test-Path "public/build") {
        $buildSize = (Get-ChildItem -Path "public/build" -Recurse | Measure-Object -Property Length -Sum).Sum
        $buildMB = [math]::Round($buildSize / 1MB, 2)
        Info "Ukuran build: ${buildMB}MB"
        if ($buildMB -gt 10) { Warn "Build size ${buildMB}MB cukup besar -- pertimbangkan lazy loading" }
    }
    # Cek chunk sizes dari output vite
    $largeChunks = $buildOutput | Where-Object { $_ -match "kB" -and [regex]::Match($_, "(\d+)\s*kB").Groups[1].Value -as [int] -gt 500 }
    if ($largeChunks) {
        Warn "Ada chunk yang besar (>500kB) -- bisa lambat di loading pertama:"
        $largeChunks | Select-Object -First 5 | ForEach-Object { Info "  $_" }
    }
} else {
    Fail "npm run build: GAGAL -- harus diperbaiki sebelum deploy!"
    $buildOutput | Where-Object { $_ -match "error|Error|failed" } | Select-Object -First 10 | ForEach-Object { Info "  $_" }
}

# ============================================================
# 6. LARAVEL APPLICATION
# ============================================================
Section "6. LARAVEL APPLICATION"

# Route list
$routeCheck = php artisan route:list 2>&1
$routeStr = $routeCheck -join "`n"
if ($routeStr -match "error|exception|Error") {
    Fail "Route list error -- ada masalah di file routes:"
    $routeCheck | Where-Object { $_ -match "error|exception" } | Select-Object -First 5 | ForEach-Object { Info "  $_" }
} else {
    $routeCount = ($routeCheck | Where-Object { $_ -match "GET|POST|PUT|DELETE|PATCH" }).Count
    Pass "Routes terdaftar: $routeCount route(s)"
}

# Config cache
$configTest = php artisan config:cache 2>&1
$configStr = $configTest -join "`n"
if ($configStr -match "error|exception|Error") {
    Fail "Config cache gagal -- ada error di konfigurasi:"
    $configTest | Select-Object -First 5 | ForEach-Object { Info "  $_" }
} else {
    Pass "Config cache: OK"
}
php artisan config:clear | Out-Null

# Storage link
if (Test-Path "public/storage") { Pass "Storage symlink sudah ada" }
else { Fail "Storage symlink TIDAK ada -- jalankan: php artisan storage:link" }

# Storage writable
if (Test-Path "storage") {
    try {
        $testFile = "storage\test-write-$(Get-Random).tmp"
        New-Item -Path $testFile -ItemType File -Force | Out-Null
        Remove-Item -Path $testFile -Force
        Pass "Storage folder writable"
    } catch {
        Fail "Storage folder TIDAK writable -- cek permission folder storage\"
    }
}

# PHP syntax check di folder utama
Info "Memeriksa syntax PHP di app\, routes\, config\..."
$syntaxErrors = @()
Get-ChildItem -Path @("app", "routes", "config") -Recurse -Filter "*.php" | ForEach-Object {
    $result = php -l $_.FullName 2>&1
    if ($result -notmatch "No syntax errors") {
        $syntaxErrors += "$($_.Name): $result"
    }
}
if ($syntaxErrors.Count -gt 0) {
    Fail "Ada $($syntaxErrors.Count) file PHP dengan syntax error:"
    $syntaxErrors | Select-Object -First 10 | ForEach-Object { Info "  $_" }
} else {
    Pass "Tidak ada syntax error di app\, routes\, config\"
}

# ============================================================
# 7. INERTIA.JS SPECIFIC
# ============================================================
Section "7. INERTIA.JS SPECIFIC"

# Cek @inertiajs/react terpasang
$pkgJson = Get-Content "package.json" | ConvertFrom-Json
$inertiaVer = $pkgJson.devDependencies.'@inertiajs/react'
if ($inertiaVer) { Pass "@inertiajs/react terpasang: $inertiaVer" }
else { Fail "@inertiajs/react tidak ditemukan di package.json" }

# Cek inertia di composer
$composerJson = Get-Content "composer.json" | ConvertFrom-Json
$inertiaLaravel = $composerJson.require.'inertiajs/inertia-laravel'
if ($inertiaLaravel) { Pass "inertiajs/inertia-laravel terpasang: $inertiaLaravel" }
else { Warn "inertiajs/inertia-laravel tidak ada di composer.json -- apakah Inertia dipakai?" }

# Cek root view
if (Test-Path "resources/views/app.blade.php") { Pass "Root view ada: resources/views/app.blade.php" }
else { Fail "Root view TIDAK ada: resources/views/app.blade.php -- Inertia butuh ini" }

# Cek Pages folder
if (Test-Path "resources/js/Pages") { Pass "Folder Pages ada: resources/js/Pages\" }
elseif (Test-Path "resources/js/pages") { Pass "Folder pages ada: resources/js/pages\" }
else { Warn "Folder Pages tidak ditemukan -- biasanya ada di resources/js/Pages\" }

# ============================================================
# 8. GIT STATUS
# ============================================================
Section "8. GIT STATUS"

if (Test-Path ".git") {
    $branch = git branch --show-current 2>&1
    Info "Branch aktif: $branch"
    if ($branch -eq "main" -or $branch -eq "master") {
        Warn "Anda di branch '$branch' langsung -- pertimbangkan pakai branch develop/staging"
    } else {
        Pass "Branch: $branch (bukan main/master langsung)"
    }

    # Uncommitted changes
    $gitStatus = git status --porcelain 2>&1
    if ($gitStatus) {
        $changedCount = ($gitStatus | Measure-Object).Count
        Warn "Ada $changedCount file belum di-commit:"
        $gitStatus | Select-Object -First 10 | ForEach-Object { Info "  $_" }
    } else {
        Pass "Tidak ada uncommitted changes"
    }

    # Unpushed commits
    $unpushed = git log "@{u}.." 2>&1
    $unpushedCount = ($unpushed | Where-Object { $_ -match "^commit" } | Measure-Object).Count
    if ($unpushedCount -gt 0) {
        Warn "Ada $unpushedCount commit yang belum di-push ke GitHub"
    } else {
        Pass "Semua commit sudah di-push"
    }

    # .env ter-track git (BAHAYA)
    $envTracked = git ls-files .env 2>&1
    if ($envTracked -match "\.env") {
        Fail "KRITIS: .env ter-track oleh git! Jalankan: git rm --cached .env"
    } else {
        Pass ".env tidak ter-track oleh git (aman)"
    }

    # node_modules ter-track
    $nmTracked = git ls-files node_modules 2>&1
    if ($nmTracked) {
        Fail "node_modules ter-track oleh git -- tambahkan ke .gitignore!"
    } else {
        Pass "node_modules tidak ter-track oleh git"
    }

} else {
    Fail "Bukan git repository"
}

# ============================================================
# 9. SECURITY & CODE QUALITY
# ============================================================
Section "9. SECURITY & CODE QUALITY"

# Hardcoded credentials
Info "Scanning hardcoded credentials..."
$patterns = @("password\s*=\s*['""][^'""]{6,}['""]", "secret\s*=\s*['""][^'""]{6,}['""]", "api_key\s*=\s*['""][^'""]{6,}['""]")
$hardcoded = @()
foreach ($pattern in $patterns) {
    Get-ChildItem -Path @("app", "resources") -Recurse -Include @("*.php","*.jsx","*.js","*.tsx","*.ts") -ErrorAction SilentlyContinue | ForEach-Object {
        $matches = Select-String -Path $_.FullName -Pattern $pattern -CaseSensitive:$false
        if ($matches) { $hardcoded += $matches }
    }
}
$realHardcoded = $hardcoded | Where-Object { $_ -notmatch "placeholder|example|your_|test|dummy|vendor|node_modules" }
if ($realHardcoded.Count -gt 0) {
    Fail "Kemungkinan hardcoded credentials ditemukan ($($realHardcoded.Count) lokasi):"
    $realHardcoded | Select-Object -First 5 | ForEach-Object { Info "  $_" }
} else {
    Pass "Tidak ada indikasi hardcoded credentials"
}

# console.log di React
$consoleLogs = Get-ChildItem -Path "resources" -Recurse -Include @("*.jsx","*.js","*.tsx","*.ts") -ErrorAction SilentlyContinue |
    Select-String -Pattern "console\.(log|error|warn)" | Where-Object { $_ -notmatch "node_modules|\.test\." }
if ($consoleLogs.Count -gt 10) {
    Warn "$($consoleLogs.Count) console.log/error/warn di React -- hapus sebelum production (bocorkan info ke user)"
} elseif ($consoleLogs.Count -gt 0) {
    Warn "$($consoleLogs.Count) console.log ditemukan -- pertimbangkan hapus sebelum production"
} else {
    Pass "Tidak ada console.log yang tertinggal di React"
}

# TODO/FIXME
$todos = Get-ChildItem -Path @("app", "resources", "routes") -Recurse -Include @("*.php","*.jsx","*.js") -ErrorAction SilentlyContinue |
    Select-String -Pattern "TODO|FIXME|HACK|@todo" | Where-Object { $_ -notmatch "vendor|node_modules" }
if ($todos.Count -gt 0) {
    Warn "$($todos.Count) TODO/FIXME ditemukan -- review sebelum production:"
    $todos | Select-Object -First 5 | ForEach-Object { Info "  $_" }
} else {
    Pass "Tidak ada TODO/FIXME yang tertinggal"
}

# ============================================================
# 10. UNIT TEST
# ============================================================
Section "10. UNIT TEST"

# PHP Tests
Info "Menjalankan PHP tests..."
$phpTest = php artisan test 2>&1
$phpTestStr = $phpTest -join "`n"
if ($phpTestStr -match "FAILED|fail") {
    $failCount = ($phpTest | Where-Object { $_ -match "FAILED|fail" }).Count
    Fail "PHP tests ADA yang GAGAL ($failCount):"
    $phpTest | Where-Object { $_ -match "FAILED|fail|Error" } | Select-Object -First 10 | ForEach-Object { Info "  $_" }
} elseif ($phpTestStr -match "Tests:") {
    $summary = $phpTest | Where-Object { $_ -match "Tests:" } | Select-Object -Last 1
    Pass "PHP tests semua PASSED: $summary"
} else {
    Info "PHP tests: $phpTestStr"
}

# JS/React Tests (vitest)
Info "Menjalankan React tests (vitest)..."
$jsTest = npm test 2>&1
$jsTestStr = $jsTest -join "`n"
if ($jsTestStr -match "FAIL|failed") {
    Fail "React/Vitest tests ADA yang GAGAL:"
    $jsTest | Where-Object { $_ -match "FAIL|Error|failed" } | Select-Object -First 10 | ForEach-Object { Info "  $_" }
} elseif ($jsTestStr -match "passed|Tests") {
    $jsSummary = $jsTest | Where-Object { $_ -match "passed|Tests" } | Select-Object -Last 1
    Pass "React tests semua PASSED: $jsSummary"
} else {
    Warn "React tests tidak bisa diverifikasi -- cek manual dengan: npm test"
}

# ============================================================
# 11. RINGKASAN AKHIR
# ============================================================
Section "11. RINGKASAN AKHIR"

$TOTAL = $PASS + $FAIL + $WARN
$SCORE = if ($TOTAL -gt 0) { [math]::Round(($PASS * 100) / $TOTAL) } else { 0 }

Write-Report ""
Write-Report ("  {0,-20} {1}" -f "Total Checks:", $TOTAL)
Write-Report ("  {0,-20} {1}" -f "OK (PASS):", $PASS)
Write-Report ("  {0,-20} {1}" -f "FAIL:", $FAIL)
Write-Report ("  {0,-20} {1}" -f "WARNING:", $WARN)
Write-Report ""
Write-Report "  SKOR KESIAPAN PRODUCTION: $SCORE / 100"
Write-Report ""

if ($FAIL -eq 0 -and $SCORE -ge 90) {
    Write-Report "  [HIJAU] SIAP DEPLOY -- Tidak ada masalah kritis."
} elseif ($FAIL -le 2 -and $SCORE -ge 75) {
    Write-Report "  [KUNING] HAMPIR SIAP -- Perbaiki item FAIL dulu sebelum deploy."
} elseif ($FAIL -le 5) {
    Write-Report "  [ORANGE] BELUM SIAP -- Ada masalah yang harus diperbaiki."
} else {
    Write-Report "  [MERAH] TIDAK SIAP DEPLOY -- Terlalu banyak masalah kritis!"
}

Write-Report ""
Write-Report "  Laporan disimpan di: $REPORT"
Write-Report "============================================================"
