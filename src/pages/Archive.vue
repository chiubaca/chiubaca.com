<template>
  <Layout>
    <section>
      <h1>🗄️ Archive</h1>
      <p>> Writings from my old website</p>
      <div
        class="post"
        v-for="(post, index) in $page.archivedBlogs.edges"
        :key="index"
      >
        <g-link :to="post.node.path">{{ post.node.title }}</g-link>
        <p class="timestamp">
          posted on : {{ new Date(post.node.date).toDateString() }}
        </p>
      </div>
    </section>
  </Layout>
</template>

<page-query>
  query {
    archivedBlogs: allArchivedBlogs(order: ASC){
      edges {
        node {
          title
          categories
          path
          date
        }
      }
    }
  }
</page-query>

<script>
import { Pager } from "gridsome";
export default {
  components: {
    Pager,
  },
  metaInfo: {
    title: "Blog",
  },
};
</script>

<style scoped>
.timestamp {
  font-size: 0.8em;
  color: grey;
}

.post {
  padding-top: 10px;
  line-height: 16px;
}

section {
  padding-top: 25px;
}
</style>