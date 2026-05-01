<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/about/visi-misi', [PageController::class, 'aboutVisiMisi'])->name('about.visi-misi');
Route::get('/about/struktur-tim', [PageController::class, 'aboutStrukturTim'])->name('about.struktur-tim');
Route::get('/about/legalitas', [PageController::class, 'aboutLegalitas'])->name('about.legalitas');
Route::get('/services', [PageController::class, 'services'])->name('services');
Route::get('/services/web-application', [PageController::class, 'serviceWebApplication'])->name('services.web-application');
Route::get('/services/desain-grafis', [PageController::class, 'serviceDesainGrafis'])->name('services.desain-grafis');
Route::get('/services/social-media', [PageController::class, 'serviceSocialMedia'])->name('services.social-media');
Route::get('/services/foto-video-event', [PageController::class, 'serviceFotoVideoEvent'])->name('services.foto-video-event');
Route::get('/services/usaha-makanan', [PageController::class, 'serviceUsahaMakanan'])->name('services.usaha-makanan');
Route::get('/portfolio', [PageController::class, 'portfolio'])->name('portfolio');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

// Dashboard & Auth Routes
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// 404 — Catch-all (must be last)
Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
})->name('errors.404');

