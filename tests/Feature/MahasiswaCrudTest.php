<?php

namespace Tests\Feature;

use App\Models\Mahasiswa;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MahasiswaCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_halaman_daftar_mahasiswa_dapat_diakses(): void
    {
        $this->get('/mahasiswa')
            ->assertOk()
            ->assertSee('Data Mahasiswa');
    }

    public function test_endpoint_api_tugas_mengembalikan_data_mahasiswa(): void
    {
        Mahasiswa::create([
            'nim' => '2026005',
            'nama' => 'Rina Putri',
            'jurusan' => 'Teknik Informatika',
        ]);

        $this->getJson('/api/tugas')
            ->assertOk()
            ->assertJson([
                ['nim' => '2026005', 'nama' => 'Rina Putri', 'jurusan' => 'Teknik Informatika'],
            ]);
    }

    public function test_mahasiswa_dapat_dibuat(): void
    {
        $response = $this->post('/mahasiswa', [
            'nim' => '2026001',
            'nama' => 'Siti Aminah',
            'jurusan' => 'Teknik Informatika',
        ]);

        $response->assertRedirect('/mahasiswa')
            ->assertSessionHas('success');
        $this->assertDatabaseHas('mahasiswa', ['nim' => '2026001']);
    }

    public function test_mahasiswa_dapat_diubah(): void
    {
        $mahasiswa = Mahasiswa::create([
            'nim' => '2026002',
            'nama' => 'Budi Santoso',
            'jurusan' => 'Sistem Informasi',
        ]);

        $this->put("/mahasiswa/{$mahasiswa->id}", [
            'nim' => '2026002',
            'nama' => 'Budi Setiawan',
            'jurusan' => 'Teknik Informatika',
        ])->assertRedirect('/mahasiswa')->assertSessionHas('success');

        $this->assertDatabaseHas('mahasiswa', [
            'id' => $mahasiswa->id,
            'nama' => 'Budi Setiawan',
            'jurusan' => 'Teknik Informatika',
        ]);
    }

    public function test_mahasiswa_dapat_dihapus(): void
    {
        $mahasiswa = Mahasiswa::create([
            'nim' => '2026003',
            'nama' => 'Citra Dewi',
            'jurusan' => 'Manajemen',
        ]);

        $this->delete("/mahasiswa/{$mahasiswa->id}")
            ->assertRedirect('/mahasiswa')
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('mahasiswa', ['id' => $mahasiswa->id]);
    }

    public function test_validasi_mahasiswa_dijalankan(): void
    {
        Mahasiswa::create([
            'nim' => '2026004',
            'nama' => 'Dewi Lestari',
            'jurusan' => 'Akuntansi',
        ]);

        $this->post('/mahasiswa', [
            'nim' => '2026004',
            'nama' => '',
            'jurusan' => '',
        ])->assertSessionHasErrors(['nim', 'nama', 'jurusan']);
    }
}
