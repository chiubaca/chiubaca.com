<template>
  <Layout>
    <h1>👨‍💻 Dev Blogs</h1>
    <p> Web development and ramblings about programming</p>
    <div v-for="blog in $page.articles.edges" :key="blog.node.id">
      <g-link :to="blog.node.path">{{ blog.node.title }}</g-link>
    </div>

    <h1>Archived Blogs</h1>
    <p> Old posts. Awkward </p>
    <div v-for="(post, index) in $page.archivedBlogs.edges" :key="index">
      <g-link :to="post.node.path">{{ post.node.title }}</g-link>
    </div>
  </Layout>
</template>

<page-query>
  query {
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
    articles: allDevToArticles{
      edges {
        node{
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