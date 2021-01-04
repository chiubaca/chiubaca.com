<template>
  <Layout class="blog">
    <h1>👨‍💻 Dev.to Blogs</h1>
    <div v-for="blog in $page.devToBlogs.edges" :key="blog.node.id">
      <g-link :to="blog.node.path">{{ blog.node.title }}</g-link>
    </div>

    <Pager :info="$page.devToBlogs.pageInfo"/>

    <h1>Archived Blogs</h1>
    <div v-for="blog in $page.archivedBlogs.edges" :key="blog.node.id">
      <g-link :to="blog.node.path">{{ blog.node.path }}</g-link>
    </div>
  </Layout>
</template>

<page-query>
  query ($page: Int)  {
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
    devToBlogs: allDevToPosts(perPage: 5, page: $page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          path
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
.blog > ul {
  list-style: none;
}
</style>