@extends('layouts.app')

@section('content')
    <div class="header">
        <div>
            <h1>Tambah Mahasiswa</h1>
            <p>Masukkan data mahasiswa baru.</p>
        </div>
        <a class="button button-secondary" href="{{ route('mahasiswa.index') }}">Kembali</a>
    </div>

    <div class="form-card">
        <form action="{{ route('mahasiswa.store') }}" method="POST">
            @csrf
            @include('mahasiswa.form')
            <button type="submit">Simpan</button>
        </form>
    </div>
@endsection
