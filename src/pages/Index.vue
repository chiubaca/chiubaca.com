<template>
  <Layout class="blog">

    <h1>Dev.to Blogs</h1>
        <div v-for="blog in $page.devToBlogs.edges" :key="blog.node.id">
        <g-link :to="blog.node.slug">{{ blog.node.title }}</g-link>
    </div>


    <h1>Archived Blogs</h1>
    <div v-for="blog in $page.archivedBlogs.edges" :key="blog.node.id">
      <g-link :to="blog.node.path">{{ blog.node.title }}</g-link>
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
    devToBlogs: allDevToPosts{
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }

</page-query>

<script>
export default {
  metaInfo: {
    title: "Blog",
  },
};
</script>

<style scoped>
.blog > ul {
  list-style: none;
}
</style>