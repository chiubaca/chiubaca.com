<template>
  <Layout>
    <h1 class="title">
      {{ $page.post.title }}
      <span class="timestamp">
        {{ new Date($page.post.date).toDateString() }}
      </span>
    </h1>
    <article class="content" v-html="$page.post.content" />
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
};
</script>

<page-query>
  query archivedBlogs ($path: String!) {
    post: archivedBlogs (path: $path) {
      title
      date
      content
    }
  }
</page-query>

<style>
</style>