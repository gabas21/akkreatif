<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('Home');
    }

    public function about()
    {
        return Inertia::render('About/Index');
    }

    public function aboutVisiMisi()
    {
        return Inertia::render('About/VisiMisi');
    }

    public function aboutStrukturTim()
    {
        return Inertia::render('About/StrukturTim');
    }

    public function aboutLegalitas()
    {
        return Inertia::render('About/Legalitas');
    }

    public function services()
    {
        return Inertia::render('Services');
    }

    public function serviceWebApplication()
    {
        return Inertia::render('Services/WebApplication');
    }

    public function serviceDesainGrafis()
    {
        return Inertia::render('Services/DesainGrafis');
    }

    public function serviceSocialMedia()
    {
        return Inertia::render('Services/SocialMedia');
    }

    public function serviceFotoVideoEvent()
    {
        return Inertia::render('Services/FotoVideoEvent');
    }

    public function serviceUsahaMakanan()
    {
        return Inertia::render('Services/UsahaMakanan');
    }

    public function portfolio()
    {
        return Inertia::render('Portfolio');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }
}
