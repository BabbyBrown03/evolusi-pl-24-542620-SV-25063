<div class="form-group">
    <label for="nim">NIM</label>
    <input id="nim" name="nim" type="text" value="{{ old('nim', $mahasiswa->nim ?? '') }}" required>
    @error('nim')
        <p class="error">{{ $message }}</p>
    @enderror
</div>

<div class="form-group">
    <label for="nama">Nama</label>
    <input id="nama" name="nama" type="text" value="{{ old('nama', $mahasiswa->nama ?? '') }}" required>
    @error('nama')
        <p class="error">{{ $message }}</p>
    @enderror
</div>

<div class="form-group">
    <label for="jurusan">Jurusan</label>
    <input id="jurusan" name="jurusan" type="text" value="{{ old('jurusan', $mahasiswa->jurusan ?? '') }}" required>
    @error('jurusan')
        <p class="error">{{ $message }}</p>
    @enderror
</div>
