<template>
  <Layout>
    <h1 class="article__title">
      {{ $page.post.title }}
    </h1>
    <p class="article__timestamp">
     Posted on : {{ new Date($page.post.date).toDateString() }}
    </p>
    <article class="article__content" v-html="$page.post.content" />
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
