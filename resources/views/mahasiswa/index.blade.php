@extends('layouts.app')

@section('content')
    <div class="header">
        <div>
            <h1>Data Mahasiswa</h1>
            <p>Kelola data mahasiswa dengan mudah.</p>
        </div>
        <a class="button" href="{{ route('mahasiswa.create') }}">Tambah Mahasiswa</a>
    </div>

    <div class="table-card">
        @if ($mahasiswa->isEmpty())
            <div class="empty">Belum ada data mahasiswa.</div>
        @else
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Jurusan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($mahasiswa as $item)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $item->nim }}</td>
                            <td>{{ $item->nama }}</td>
                            <td>{{ $item->jurusan }}</td>
                            <td class="actions">
                                <a class="button button-small" href="{{ route('mahasiswa.edit', $item) }}">Edit</a>
                                <form action="{{ route('mahasiswa.destroy', $item) }}" method="POST" onsubmit="return confirm('Yakin ingin menghapus data ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button class="button-danger button-small" type="submit">Hapus</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
@endsection
