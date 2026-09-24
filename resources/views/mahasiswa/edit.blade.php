@extends('layouts.app')

@section('content')
    <div class="header">
        <div>
            <h1>Edit Mahasiswa</h1>
            <p>Perbarui data mahasiswa.</p>
        </div>
        <a class="button button-secondary" href="{{ route('mahasiswa.index') }}">Kembali</a>
    </div>

    <div class="form-card">
        <form action="{{ route('mahasiswa.update', $mahasiswa) }}" method="POST">
            @csrf
            @method('PUT')
            @include('mahasiswa.form')
            <button type="submit">Perbarui</button>
        </form>
    </div>
@endsection
