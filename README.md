<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Pipeline CI/CD

Aplikasi ini memakai workflow GitHub Actions dengan urutan:

`build` → `test` → `staging` → `production`

- `build` memasang dependency dengan `composer install`.
- `test` menjalankan `php artisan test`.
- `staging` hanya menulis echo dan tidak melakukan deploy sungguhan.
- `production` hanya berjalan pada event `push` ke branch `main`.
- `production` memakai environment GitHub bernama `production`.

Pada push ke branch fitur dan pada pull request, `build`, `test`, dan
`staging` tetap berjalan, tetapi `production` akan berstatus
`skipped`. Ini disengaja untuk mencegah deploy dari PR. Untuk menjalankan
production, merge perubahan ke `main` dengan membuat PR yang base branch-nya
`main`; jika PR masih menuju `dev`, production tidak akan berjalan.

### Pengaturan reviewer production

`required reviewer` bukan setting yang dapat ditulis di dalam YAML. Di GitHub
repository, buka **Settings → Environments → production**, aktifkan
**Required reviewers**, lalu pilih reviewer. Job production akan menunggu
review tersebut. Pastikan branch `dev` atau `main` memiliki branch protection
yang mengizinkan merge setelah check `Build` dan `Test` berhasil.

### Verifikasi lokal

```bash
composer install
php artisan test
```

Workflow `build` dan `test` harus berhasil sebelum job berikutnya berjalan.
`deploy.sh` menyimpan skrip tujuh langkah deployment dan menggunakan
`set -e`, tetapi workflow sengaja hanya `echo` langkah tersebut dan belum
menjalankan deploy ke server.



## Frontend Vue 3

Frontend berada di `frontend/` dan memiliki dua halaman Vue Router:

- `/` — beranda;
- `/mahasiswa` — menampilkan data dari endpoint Laravel.

Jalankan Laravel dan frontend secara lokal:

```bash
# Terminal 1
php artisan serve

# Terminal 2
cd frontend
npm ci
npm run dev
```

Buat file `frontend/.env` jika ingin mengganti URL API:

```bash
VITE_API_URL=http://localhost:8000
```

Endpoint JSON Laravel tersedia di `GET /api/tugas`. Konfigurasi
CORS mengizinkan frontend lokal dari `http://localhost:5173`.

Perintah frontend:

```bash
npm ci
npm run lint
npm test
npm run build
```

Workflow `.github/workflows/frontend.yml` memiliki empat job berantai:

`lint` → `test` → `build` → `deploy`

Job `build` mengunggah `frontend/dist` sebagai artifact. Job `deploy`
hanya berjalan pada push ke `main`, mengunduh artifact tersebut, dan
menampilkan daftar file `dist/` ke log tanpa menjalankan `npm run build` lagi.
Pada Pull Request, job `deploy` tetap `skipped`, sedangkan lint, test,
dan build tetap berjalan.

 with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
