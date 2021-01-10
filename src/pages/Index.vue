<template>
  <Layout>
    <section>
      <h1>👨‍💻 Dev Blogs</h1>
      <p class="subtext">> Web development and ramblings about programming</p>
      <div
        class="post"
        v-for="blog in $page.articles.edges"
        :key="blog.node.id"
      >
        <g-link :to="blog.node.slug">{{ blog.node.title }}</g-link>
        <p class="timestamp">
          posted on : {{ new Date(blog.node.published_at).toDateString() }}
        </p>
      </div>
    </section>

    <section>
      <h1>📘 Dev Journal</h1>
      <p>> Stories of successes and mishaps whilst working on side projects</p>
      <div
        class="post"
        v-for="blog in $page.devDiary.edges"
        :key="blog.node.id"
      >
        <a class="post__link" :href="blog.node.url">
          <p>{{ blog.node.title }}</p>
          <ExternalLinkIcon
        /></a>

        <p class="timestamp">
          posted on : {{ new Date(blog.node.published_at).toDateString() }}
        </p>
      </div>
    </section>

    <section>
      <g-link to="/archive" class="archive">
        <h1>🗄️ Archive</h1>
        <p>> Writings from my old website</p>
      </g-link>
    </section>
  </Layout>
</template>

<page-query>
  query {
    articles: allDevToArticles(filter: {tags: {containsNone: ["devjournal"] }} order: ASC){
      edges {
        node{
          title
          published_at
          slug
        }
      }
    }
    devDiary: allDevToArticles(filter: {tags: {contains: ["devjournal"] }} order: ASC){
      edges {
        node{
          title
          url
          published_at
        }
      }
    }
  }
</page-query>

<script>
import ExternalLinkIcon from "@/components/ExternalLinkIcon.vue";
export default {
  components: {
    ExternalLinkIcon,
  },
  metaInfo: {
    title: "Blog",
  },
};
</script>

<style lang="scss" scoped>
.timestamp {
  font-size: 0.8em;
  color: grey;
}

.post {
  padding-top: 10px;
  line-height: 20px;
}

.post__link {
  display: flex;
  svg {
    padding-left: 5px;
  }
}

.archive * {
  color: var(--primary);
}

section {
  padding-top: 25px;
}
</style>