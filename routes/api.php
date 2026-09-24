<?php

use App\Models\Mahasiswa;
use Illuminate\Support\Facades\Route;

Route::get('/tugas', function () {
    return Mahasiswa::query()
        ->latest()
        ->get(['id', 'nim', 'nama', 'jurusan']);
});
