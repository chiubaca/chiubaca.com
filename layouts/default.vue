<template>
  <div>
    <nav class="nav">
      <NuxtLink to="/" tag="h1">Alex Chiu</NuxtLink>
      <ThemeToggle />
    </nav>
    <p>👉 Full Stack Developer / Learning In Public / Building For Fun</p>
    <hr />
    <Links />
    <Nuxt />
    <footer>
      <hr />
      <Links />
    </footer>
  </div>
</template>

<style>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav h1:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
