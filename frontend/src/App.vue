<template>
  <div class="container">
    <header>
      <h1>CRUD Mahasiswa</h1>
      <nav>
        <RouterLink to="/">Beranda</RouterLink>
        <RouterLink to="/mahasiswa">Data Mahasiswa</RouterLink>
      </nav>
    </header>
    <main><RouterView /></main>
  </div>
</template>
