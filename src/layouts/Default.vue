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
      <p class="sub2">
        👉 Full Stack Developer / Learning In Public / Building For Fun
      </p>
      <p>
        <a class="icon" target="_blank" href="https://twitter.com/chiubaca"> <TwitterIcon /></a>
        <a class="icon" target="_blank" href="https://dev.to/chiubaca"> <DevtoIcon /></a>
        <a class="icon" target="_blank" href="https://www.linkedin.com/in/achiu1/"> <LinkedinIcon /></a>
      </p>
      <hr />
    </header>
    <!-- Content is slotted here -->
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import TwitterIcon from "@/components/TwitterIcon.vue";
import DevtoIcon from "@/components/DevtoIcon.vue";
import LinkedinIcon from "@/components/LinkedinIcon.vue";
export default Vue.extend({
  components: {
    ThemeToggle,
    TwitterIcon,
    DevtoIcon,
    LinkedinIcon,
  },
});
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
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
  padding: 15px 0 15px 0;
}

.icon {
  svg {
    width: 20px;
    height: 20px;
    color: inherit;
    padding: 5px;
      color: var(--primary);
  }
}
</style>
