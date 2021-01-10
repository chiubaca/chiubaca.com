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
        <a class="icon" target="_blank" href="https://github.com/chiubaca">
          <GithubIcon
        /></a>
        <a class="icon" target="_blank" href="https://twitter.com/chiubaca">
          <TwitterIcon
        /></a>
        <a class="icon" target="_blank" href="https://dev.to/chiubaca">
          <DevtoIcon
        /></a>
        <a
          class="icon"
          target="_blank"
          href="https://www.linkedin.com/in/achiu1/"
        >
          <LinkedinIcon
        /></a>
      </p>
      <hr />
    </header>
    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <hr />
      <div>
        <g-link to="/">home</g-link> /
        <a class="icon" target="_blank" href="https://github.com/chiubaca">
          github </a
        >/
        <a class="icon" target="_blank" href="https://twitter.com/chiubaca">
          twitter
        </a>
        /
        <a class="icon" target="_blank" href="https://dev.to/chiubaca">
          dev.to </a
        >/
        <a href="mailto:alexchiu11@gmail.com">email</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import TwitterIcon from "@/components/TwitterIcon.vue";
import DevtoIcon from "@/components/DevtoIcon.vue";
import LinkedinIcon from "@/components/LinkedinIcon.vue";
import GithubIcon from "@/components/GithubIcon.vue";
export default Vue.extend({
  components: {
    ThemeToggle,
    TwitterIcon,
    DevtoIcon,
    LinkedinIcon,
    GithubIcon,
  },
});
</script>

<style lang="scss" scoped>
// TODO: Find a way to anchor the footer to the bottom of the page
//  This chunk of code breaks wrapping on titles
// .layout {
//   // display: grid;
//   // min-height: 100vh;
//   // grid-template-rows: auto 1fr auto;
// }

// .main {
//   grid-row-start: 2;
//   grid-row-end: 3;
// }

// .footer {
//   grid-row-start: 3;
//   grid-row-end: 4;
// }

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
