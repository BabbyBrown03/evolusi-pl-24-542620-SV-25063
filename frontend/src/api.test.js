import { describe, expect, it } from 'vitest'

describe('formatStudentLabel', () => {
  it('menggabungkan NIM dan nama dengan format yang mudah dibaca', () => {
    const formatStudentLabel = (nim, nama) => `${nim} - ${nama}`
    expect(formatStudentLabel('2026001', 'Siti Aminah')).toBe('2026001 - Siti Aminah')
  })
})
