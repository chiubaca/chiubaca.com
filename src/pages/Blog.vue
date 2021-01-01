<template>
  <Layout class="blog">
    <h1>Archived Blogs</h1>
    <div v-for="blog in $page.archivedBlogs.edges" :key="blog.node.id">
      <h2>{{ blog.node.title }}</h2>
    </div>
  </Layout>
</template>

<page-query>
  query  {
    archivedBlogs: allArchivedBlogs{
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