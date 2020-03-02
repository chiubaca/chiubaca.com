<template>
  <Layout class="blog">
    <ul>
      <li v-for="{ node } in $page.allBlogPost.edges" :key="node.id">
        <router-link :to="node.path">
          <h2 v-html="node.title" />
        </router-link>
        <span v-html="node.date" />
        <div v-html="node.categories" />
      </li>
    </ul>
  </Layout>
</template>

<page-query>
  query Home ($page: Int) {
    allBlogPost (page: $page) {
      edges {
        node {
          id
          title
          date (format: "D MMMM, YYYY")
          categories
          path
        }
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: "Blog"
  }
};
</script>

<style scoped>
.blog > ul {
  list-style: none;
}
</style>