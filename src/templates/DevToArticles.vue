<template>
  <Layout>
    <h1 class="title">
      {{ $page.article.title }}
    </h1>
    <p class="timestamp">
      Posted on : {{ new Date($page.article.published_at).toDateString() }}
    </p>
    <p class="timestamp">
      Last updated on : {{ new Date($page.article.edited_at).toDateString() }}
    </p>
    <article class="content" v-html="$page.article.parsed_markdown"></article>
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
    }
  }
</page-query>

<style lang="scss">
.title {
  font-size: 2.5em;
  padding-bottom: 10px;
  word-wrap: break-word;
  .timestamp {
    font-size: 1rem;
  }
}

.timestamp {
  font-style: italic;
  color: #979797;
  font-size: 0.9rem;
}

.content {
  padding-top: 20px;
  line-height: 200%;
}

.content h1 {
  font-size: 2rem;
  padding: 30px 0 15px 0;

  a:before {
    content: "🔗";
  }
}

.content h2 {
  font-size: 1.5rem;
  padding: 25px 0 10px 0;

  a:before {
    content: "🔗";
  }
}

.content img {
  width: 100%;
  height: 100%;
}
</style>