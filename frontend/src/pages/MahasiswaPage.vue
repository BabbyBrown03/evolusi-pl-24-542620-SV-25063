<script setup>
import { onMounted, ref } from 'vue'
import { getMahasiswa } from '../api'

const mahasiswa = ref([])
const loading = ref(true)
const error = ref('')

async function loadMahasiswa() {
  loading.value = true
  error.value = ''
  try {
    mahasiswa.value = await getMahasiswa()
  } catch (exception) {
    error.value = exception.message
  } finally {
    loading.value = false
  }
}

onMounted(loadMahasiswa)
</script>

<template>
  <section>
    <h2>Data Mahasiswa</h2>
    <p v-if="loading">Memuat data...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <table v-else>
      <thead><tr><th>NIM</th><th>Nama</th><th>Jurusan</th></tr></thead>
      <tbody>
        <tr v-for="item in mahasiswa" :key="item.id">
          <td>{{ item.nim }}</td><td>{{ item.nama }}</td><td>{{ item.jurusan }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
