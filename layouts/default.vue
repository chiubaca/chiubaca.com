<template>
  <div>
    <nav class="nav">
      <NuxtLink to="/" tag="h1">
        <div class="logo">
          <p class="title">Alex Chiu</p>
          <p class="sub">/•chiubaca•/</p>
        </div>
      </NuxtLink>
      <ThemeToggle />
    </nav>
    <p class="sub2">
      👉 Full Stack Developer / Learning In Public / Building For Fun
    </p>
    <hr />
    <Links />
    <Nuxt />
    <footer>
      <hr />
      <Links />
    </footer>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav h1:hover {
  text-decoration: underline;
  cursor: pointer;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 1.5rem;
  letter-spacing: 2px;
}
.sub {
  font-size: 0.8rem;
  letter-spacing: 4px;
}

.sub2 {
  letter-spacing: 1.5px;
}
</style>
