import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { bobot, hitungIP } from '../ip.js';

describe('Pengujian Fungsi bobot() - Skema Nilai Eksak', () => {
  it('harus mengembalikan 4.0 untuk nilai A', () => {
    assert.strictEqual(bobot('A'), 4.0);
  });

  it('harus mengembalikan 3.5 untuk nilai AB', () => {
    assert.strictEqual(bobot('AB'), 3.5);
  });

  it('harus mengembalikan 3.0 untuk nilai B', () => {
    assert.strictEqual(bobot('B'), 3.0);
  });

  it('harus mengembalikan 2.5 untuk nilai BC', () => {
    assert.strictEqual(bobot('BC'), 2.5);
  });

  it('harus mengembalikan 2.0 untuk nilai C', () => {
    assert.strictEqual(bobot('C'), 2.0);
  });

  it('harus mengembalikan 1.0 untuk nilai D', () => {
    assert.strictEqual(bobot('D'), 1.0);
  });

  it('harus mengembalikan 0.0 untuk nilai E', () => {
    assert.strictEqual(bobot('E'), 0.0);
  });

  it('harus menangani huruf kecil dan spasi tambahan (case-insensitive & trim)', () => {
    assert.strictEqual(bobot(' a '), 4.0);
    assert.strictEqual(bobot('ab '), 3.5);
    assert.strictEqual(bobot(' bc'), 2.5);
    assert.strictEqual(bobot('c'), 2.0);
  });

  it('harus mengembalikan 0.0 untuk skema nilai di luar ketentuan resmi', () => {
    // Memastikan skema selain A, AB, B, BC, C, D, E tidak dianggap valid
    assert.strictEqual(bobot('A-'), 0.0);
    assert.strictEqual(bobot('A/B'), 0.0);
    assert.strictEqual(bobot('B+'), 0.0);
    assert.strictEqual(bobot('B-'), 0.0);
    assert.strictEqual(bobot('B/C'), 0.0);
    assert.strictEqual(bobot('C+'), 0.0);
    assert.strictEqual(bobot('C-'), 0.0);
    assert.strictEqual(bobot('D+'), 0.0);
    assert.strictEqual(bobot('F'), 0.0);
    assert.strictEqual(bobot('X'), 0.0);
    assert.strictEqual(bobot(''), 0.0);
    assert.strictEqual(bobot(null), 0.0);
    assert.strictEqual(bobot(undefined), 0.0);
    assert.strictEqual(bobot(100), 0.0);
  });
});

describe('Pengujian Fungsi hitungIP() - IP Semester', () => {
  it('harus mengembalikan 0.0 jika daftar mata kuliah kosong atau bukan array', () => {
    assert.strictEqual(hitungIP([]), 0.0);
    assert.strictEqual(hitungIP(null), 0.0);
    assert.strictEqual(hitungIP(undefined), 0.0);
  });

  it('harus mengembalikan 4.0 jika semua mata kuliah semester ini bernilai A', () => {
    const mkSemester = [
      { sks: 3, nilai: 'A' },
      { sks: 2, nilai: 'A' },
      { sks: 4, nilai: 'A' }
    ];
    assert.strictEqual(hitungIP(mkSemester), 4.0);
  });

  it('harus mengembalikan 0.0 jika semua mata kuliah semester ini bernilai E', () => {
    const mkSemester = [
      { sks: 3, nilai: 'E' },
      { sks: 3, nilai: 'E' }
    ];
    assert.strictEqual(hitungIP(mkSemester), 0.0);
  });

  it('harus menghitung IP Semester dengan benar berdasarkan bobot dan SKS', () => {
    // 3 SKS A (3 * 4.0 = 12.0)
    // 3 SKS AB (3 * 3.5 = 10.5)
    // 2 SKS B (2 * 3.0 = 6.0)
    // 2 SKS BC (2 * 2.5 = 5.0)
    // Total Poin = 33.5, Total SKS = 10 -> IP Semester = 33.5 / 10 = 3.35
    const mkSemester = [
      { sks: 3, nilai: 'A' },
      { sks: 3, nilai: 'AB' },
      { sks: 2, nilai: 'B' },
      { sks: 2, nilai: 'BC' }
    ];
    assert.strictEqual(hitungIP(mkSemester), 3.35);
  });

  it('harus mengabaikan mata kuliah dengan SKS 0 atau tidak valid', () => {
    const mkSemester = [
      { sks: 3, nilai: 'A' },
      { sks: 0, nilai: 'B' },
      { sks: -2, nilai: 'A' },
      { sks: 'invalid', nilai: 'A' }
    ];
    assert.strictEqual(hitungIP(mkSemester), 4.0);
  });

  it('harus mengembalikan 0.0 jika total SKS semester yang valid bernilai 0', () => {
    const mkSemester = [
      { sks: 0, nilai: 'A' },
      { sks: -1, nilai: 'A' }
    ];
    assert.strictEqual(hitungIP(mkSemester), 0.0);
  });
});
