import { bobot, hitungIP } from './ip.js';

// State daftar mata kuliah semester ini (menggunakan skema nilai resmi: A, AB, B, BC, C, D, E)
let daftarMataKuliah = [
  { nama: 'Evolusi & Konstruksi Perangkat Lunak', sks: 3, nilai: 'A' },
  { nama: 'Pemrograman Berorientasi Objek', sks: 3, nilai: 'AB' },
  { nama: 'Struktur Data & Algoritma', sks: 3, nilai: 'B' },
  { nama: 'Basis Data Praktik', sks: 2, nilai: 'BC' }
];

// DOM Elements
const formMK = document.getElementById('form-mk');
const inputNama = document.getElementById('nama-mk');
const inputSKS = document.getElementById('sks-mk');
const selectNilai = document.getElementById('nilai-mk');
const tbodyMK = document.getElementById('body-mk');
const elTotalSKS = document.getElementById('total-sks');
const elTotalPoin = document.getElementById('total-poin');
const elNilaiIP = document.getElementById('nilai-ip');
const btnReset = document.getElementById('btn-reset');

/**
 * Merender tabel mata kuliah dan memperbarui rekapitulasi IP Semester.
 */
export function render() {
  tbodyMK.innerHTML = '';

  if (daftarMataKuliah.length === 0) {
    const emptyTr = document.createElement('tr');
    emptyTr.innerHTML = '<td colspan="7" class="empty-row">Belum ada mata kuliah yang ditambahkan untuk semester ini.</td>';
    tbodyMK.appendChild(emptyTr);
  } else {
    daftarMataKuliah.forEach((mk, index) => {
      const bobotNilai = bobot(mk.nilai);
      const poin = Number(mk.sks) * bobotNilai;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="text-center">${index + 1}</td>
        <td><strong>${escapeHTML(mk.nama)}</strong></td>
        <td class="text-center">${mk.sks}</td>
        <td class="text-center">${mk.nilai}</td>
        <td class="text-center">${bobotNilai.toFixed(2)}</td>
        <td class="text-center">${poin.toFixed(2)}</td>
        <td class="text-center">
          <button type="button" class="btn-danger-sm" data-index="${index}" aria-label="Hapus mata kuliah ${escapeHTML(mk.nama)}">Hapus</button>
        </td>
      `;
      tbodyMK.appendChild(tr);
    });
  }

  // Hitung total ringkasan semester
  let totalSKS = 0;
  let totalPoin = 0;

  for (const mk of daftarMataKuliah) {
    const sks = Number(mk.sks) || 0;
    const b = bobot(mk.nilai);
    totalSKS += sks;
    totalPoin += sks * b;
  }

  const nilaiIP = hitungIP(daftarMataKuliah);

  elTotalSKS.textContent = totalSKS.toString();
  elTotalPoin.textContent = totalPoin.toFixed(2);
  elNilaiIP.textContent = nilaiIP.toFixed(2);
}

/**
 * Menghindari potensi XSS saat menampilkan teks user di tabel.
 */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Menangani penambahan mata kuliah dari form.
 */
formMK.addEventListener('submit', (event) => {
  event.preventDefault();

  const nama = inputNama.value.trim();
  const sks = parseInt(inputSKS.value, 10);
  const nilai = selectNilai.value;

  if (!nama || isNaN(sks) || sks <= 0) {
    return;
  }

  daftarMataKuliah.push({ nama, sks, nilai });
  render();

  // Reset form input
  inputNama.value = '';
  inputSKS.value = '3';
  selectNilai.value = 'A';
  inputNama.focus();
});

/**
 * Menangani klik tombol hapus baris.
 */
tbodyMK.addEventListener('click', (event) => {
  const target = event.target;
  if (target && target.classList.contains('btn-danger-sm')) {
    const index = parseInt(target.getAttribute('data-index'), 10);
    if (!isNaN(index) && index >= 0 && index < daftarMataKuliah.length) {
      daftarMataKuliah.splice(index, 1);
      render();
    }
  }
});

/**
 * Menangani reset seluruh data mata kuliah.
 */
btnReset.addEventListener('click', () => {
  daftarMataKuliah = [];
  render();
});

// Render awal saat halaman dimuat
render();
