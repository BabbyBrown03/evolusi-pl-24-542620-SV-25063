<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class MahasiswaController extends Controller
{
    public function index(): View
    {
        $mahasiswa = Mahasiswa::latest()->get();

        return view('mahasiswa.index', compact('mahasiswa'));
    }

    public function create(): View
    {
        return view('mahasiswa.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nim' => ['required', 'unique:mahasiswa,nim'],
            'nama' => ['required'],
            'jurusan' => ['required'],
        ]);

        Mahasiswa::create($validated);

        return redirect()->route('mahasiswa.index')
            ->with('success', 'Data mahasiswa berhasil ditambahkan.');
    }

    public function edit(Mahasiswa $mahasiswa): View
    {
        return view('mahasiswa.edit', compact('mahasiswa'));
    }

    public function update(Request $request, Mahasiswa $mahasiswa): RedirectResponse
    {
        $validated = $request->validate([
            'nim' => ['required', 'unique:mahasiswa,nim,' . $mahasiswa->id],
            'nama' => ['required'],
            'jurusan' => ['required'],
        ]);

        $mahasiswa->update($validated);

        return redirect()->route('mahasiswa.index')
            ->with('success', 'Data mahasiswa berhasil diperbarui.');
    }

    public function destroy(Mahasiswa $mahasiswa): RedirectResponse
    {
        $mahasiswa->delete();

        return redirect()->route('mahasiswa.index')
            ->with('success', 'Data mahasiswa berhasil dihapus.');
    }
}
