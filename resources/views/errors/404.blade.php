<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 — Halaman Tidak Ditemukan | AK Kreatif</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0a0a;
            color: #fff;
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            padding: 1.5rem;
        }
        .container { text-align: center; max-width: 480px; }
        .code {
            font-size: clamp(6rem, 20vw, 10rem);
            font-weight: 900;
            line-height: 1;
            background: linear-gradient(135deg, #10b981, #059669);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1.5rem;
        }
        h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; }
        p { color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 2rem; }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            background: #10b981;
            color: #000;
            font-weight: 600;
            text-decoration: none;
            transition: background 0.2s, transform 0.2s;
        }
        .btn:hover { background: #34d399; transform: translateY(-2px); }
        .brand {
            margin-top: 3rem;
            font-size: 0.875rem;
            color: rgba(255,255,255,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="code">404</div>
        <h1>Halaman Tidak Ditemukan</h1>
        <p>Halaman yang Anda cari tidak dapat ditemukan. Mungkin sudah dipindahkan atau tidak pernah ada.</p>
        <a href="/" class="btn">
            ← Kembali ke Beranda
        </a>
        <div class="brand">AK Kreatif — Anak Kalimantan Kreatif</div>
    </div>
</body>
</html>
