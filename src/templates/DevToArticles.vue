<template>
  <Layout>
    <h1 class="article__title">
      {{ $page.article.title }}
    </h1>
    <p class="article__timestamp">
      Posted on : {{ new Date($page.article.published_at).toDateString() }}
    </p>
    <p class="article__timestamp">
      Updated on : {{ new Date($page.article.edited_at).toDateString() }}
    </p>
    <p class="article__timestamp">{{ $page.article.time_to_read }} min read</p>
    <ul class="article__tag-container">
      <li class="tag-container__tag" v-for="(tag, index) in $page.article.tags">
        #{{ tag }}
      </li>
    </ul>
    <article
      class="article__content"
      v-html="$page.article.parsed_markdown"
    ></article>

    <p class="devto-link">
      <a :href="$page.article.url" target="_blank">
        > View this blog over at DEV.to. Feel free to leave a comment.</a
      >
    </p>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.article.title,
    };
  },
};
</script>

<page-query>
  query DevToArticles ($path: String!) {
    article: devToArticles (path: $path) {
      title
      parsed_markdown
      published_at
      edited_at
      tags
      url
      time_to_read
    }
  }
</page-query>

<style lang="scss" scoped>
.devto-link {
  padding: 20px 0;
  margin: 20px 0px;
}
</style>