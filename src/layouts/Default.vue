<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <g-link to="/" tag="h1">
          <div class="nav__logo">
            <p class="nav__title">Alex Chiu</p>
            <p class="nav__sub">/•chiubaca•/</p>
          </div>
        </g-link>
        <ThemeToggle />
      </nav>
    </header>
    <!-- Content is slotted here -->
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ThemeToggle from "@/components/ThemeToggle.vue"
export default Vue.extend({
  components: {
    ThemeToggle,
  },
})
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

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
.nav__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav__title {
  font-size: 1.5rem;
  letter-spacing: 2px;
}
.nav__sub {
  font-size: 0.8rem;
  letter-spacing: 4px;
}
.sub2 {
  letter-spacing: 1.5px;
}
</style>
