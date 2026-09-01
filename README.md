# evolusi-pl-24-542620-SV-25063

Repository tugas Pertemuan 2 — *Manajemen GitHub & Prinsip CI*  
Mata Kuliah: **Evolusi & Konstruksi Perangkat Lunak (2026)**  
Identitas Mahasiswa: **24/542620/SV/25063**

---

## Aplikasi

Kalkulator IP semester berbasis HTML statis. Tidak butuh server: buka `index.html`
langsung di peramban (lewat `npx serve .` atau ekstensi *Live Server*, karena memakai ES module).

| Berkas | Isi |
|---|---|
| `index.html` | Struktur halaman kalkulator semantik & valid W3C |
| `style.css` | Tampilan antarmuka modern & responsif |
| `app.js` | Perekat DOM — membaca tabel, menangani form, memanggil `hitungIP` |
| `ip.js` | Logika murni: konversi `bobot()` dan perhitungan `hitungIP()` semester |
| `test/ip.test.js` | Pengujian dengan `node:test` (bawaan Node.js, tanpa dependensi) |

Logika perhitungan sengaja dipisah dari DOM di `ip.js` supaya bisa diuji tanpa peramban.
Ini pola yang sama yang membuat pipeline CI mudah: **kode yang mudah diuji, mudah di-CI-kan.**

---

## Skema Penilaian Resmi

Aplikasi menggunakan skema nilai huruf dan bobot angka resmi berikut:

| Nilai Huruf | Bobot Angka |
|:---:|:---:|
| **A** | 4.0 |
| **AB** | 3.5 |
| **B** | 3.0 |
| **BC** | 2.5 |
| **C** | 2.0 |
| **D** | 1.0 |
| **E** | 0.0 |

> **Catatan:** Nilai di luar skema resmi di atas akan otomatis dianggap tidak valid dengan bobot `0.0`.

---

## Menjalankan Pengujian

```bash
npm test                     # node --test test/*.test.js
npx --yes html-validate index.html
```

> **Persyaratan:** Node.js versi 20 ke atas. Tanpa perintah `npm install` karena proyek menggunakan nol dependensi pihak ketiga.

---

## Alur Branch (Git Flow)

Kode **tidak pernah** mendarat langsung di `main` maupun `dev`. `main` adalah kondisi akhir yang siap dinilai/rilis.

```text
feature/<sesuatu>  --(PR)-->  dev  --(PR)-->  main
     kerja harian            integrasi       rilis / dinilai
```

| Branch | Peran | Boleh push langsung? |
|---|---|---|
| `feature/<sesuatu>` | Satu fitur/perubahan spesifik, umurnya pendek | Ya |
| `dev` | Tempat semua fitur bertemu dan diuji bersama | Tidak — wajib melalui PR dari `feature/*` |
| `main` | Kondisi stabil yang siap rilis dan dinilai | Tidak — wajib melalui PR dari `dev` saja |

Branch default repository ini adalah `dev`, sehingga Pull Request baru secara otomatis mengarah ke `dev`.

---

## Alur CI (Continuous Integration)

Berkas `.github/workflows/ci.yml` berisi **dua job** yang berjalan secara paralel pada setiap aksi `push` dan `pull_request` ke branch `dev` maupun `main`:

1. **`uji`** — menjalankan seluruh pengujian unit menggunakan `node:test`.
2. **`lint`** — memeriksa kepatuhan markup `index.html` dengan `html-validate`.

Kedua job harus berstatus hijau (*passed*) sebelum sebuah Pull Request diizinkan untuk di-*merge*.

---

## Konfigurasi Branch Protection & Akses Dosen

### 1. Branch Protection Rules di GitHub
Masuk ke menu **Settings** $\rightarrow$ **Branches** $\rightarrow$ **Add branch protection rule**:

- **Aturan untuk branch `dev`**:
  - *Branch name pattern*: `dev`
  - Centang **Require a pull request before merging**
  - Centang **Require status checks to pass before merging**
  - Pilih/cari status check: `uji` dan `lint`

- **Aturan untuk branch `main`**:
  - *Branch name pattern*: `main`
  - Centang **Require a pull request before merging**
  - Centang **Require status checks to pass before merging**
  - Centang **Require branches to be up to date before merging**
  - Pilih/cari status check: `uji` dan `lint`

### 2. Menambahkan Dosen sebagai Collaborator
1. Masuk ke **Settings** repository $\rightarrow$ **Collaborators**.
2. Klik tombol **Add people**.
3. Masukkan username GitHub dosen pengampu.
4. Atur hak akses (*Role / Permission*) ke **Read** (atau Triage).
5. Kirim undangan kolaborasi.

---

## Checklist Tugas (Slide 19)

- [x] Repository publik bernama `evolusi-pl-24-542620-SV-25063`
- [x] Minimal 5 commit bergaya [Conventional Commits](https://www.conventionalcommits.org/)
- [x] Branch `feature/<sesuatu>` dengan satu perubahan nyata
- [x] Pull Request `feature/*` -> `dev`, lalu `dev` -> `main`
- [x] `.github/workflows/ci.yml` dengan minimal dua job yang hijau (`uji` & `lint`)
- [x] Branch protection rule pada `dev` dan `main` + dosen sebagai collaborator (Read)
- [x] `README.md` dan `.gitignore`

---

## Gaya Pesan Commit (Conventional Commits)

Format penulisan pesan commit yang digunakan pada repository ini:

```text
feat:     fitur baru (contoh: feat: buat kalkulator IP semester)
fix:      perbaikan bug
test:     menambah atau memperbaiki pengujian unit
ci:       perubahan pada pipeline CI GitHub Actions
docs:     perubahan atau penambahan dokumentasi
chore:    konfigurasi proyek, dependensi, atau berkas pendukung
refactor: restrukturisasi kode tanpa mengubah perilaku fitur
```

*Peringatan: Commit dengan pesan non-standar seperti `update` polos tidak diperbolehkan.*

---

## Peringatan Keamanan

Jangan pernah melakukan commit pada berkas rahasia seperti `.env`, kredensial, token API, kunci privat SSH, atau kata sandi. Seluruh berkas rahasia wajib terdaftar di `.gitignore`.
