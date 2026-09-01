/**
 * Mengubah nilai huruf menjadi bobot angka standar IP Semester.
 * Skema nilai resmi:
 * A  = 4.0
 * AB = 3.5
 * B  = 3.0
 * BC = 2.5
 * C  = 2.0
 * D  = 1.0
 * E  = 0.0
 *
 * @param {string} nilaiHuruf - Nilai huruf mata kuliah
 * @returns {number} Bobot angka (0.0 sampai 4.0)
 */
export function bobot(nilaiHuruf) {
  if (typeof nilaiHuruf !== 'string') {
    return 0.0;
  }

  const nilai = nilaiHuruf.trim().toUpperCase();

  switch (nilai) {
    case 'A':
      return 4.0;
    case 'AB':
      return 3.5;
    case 'B':
      return 3.0;
    case 'BC':
      return 2.5;
    case 'C':
      return 2.0;
    case 'D':
      return 1.0;
    case 'E':
      return 0.0;
    default:
      return 0.0;
  }
}

/**
 * Menghitung Indeks Prestasi (IP) Semester dari daftar mata kuliah yang diambil.
 * Rumus: Total (SKS * Bobot) / Total SKS
 *
 * @param {Array<{sks: number, nilai: string}>} daftarMataKuliah - Daftar mata kuliah semester ini
 * @returns {number} Nilai IP Semester dalam rentang 0.00 sampai 4.00 (dibulatkan 2 desimal)
 */
export function hitungIP(daftarMataKuliah) {
  if (!Array.isArray(daftarMataKuliah) || daftarMataKuliah.length === 0) {
    return 0.0;
  }

  let totalSKS = 0;
  let totalBobotSKS = 0;

  for (const mk of daftarMataKuliah) {
    const sks = Number(mk.sks);
    if (isNaN(sks) || sks <= 0) {
      continue;
    }

    const nilaiBobot = bobot(mk.nilai);
    totalSKS += sks;
    totalBobotSKS += sks * nilaiBobot;
  }

  if (totalSKS === 0) {
    return 0.0;
  }

  const ipSemester = totalBobotSKS / totalSKS;
  return Number(ipSemester.toFixed(2));
}
