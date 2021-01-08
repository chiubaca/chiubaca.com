<template>
  <Layout>
    <h1>👨‍💻 Dev Blogs</h1>
    <p>Web development and ramblings about programming</p>
    <div v-for="blog in $page.articles.edges" :key="blog.node.id">
      <g-link :to="blog.node.path">{{ blog.node.title }}</g-link>
    </div>

    <h1>📘 Dev Journal</h1>
    <p>Stories of success and mishaps whilst working on side projects</p>
    <div v-for="blog in $page.devDiary.edges" :key="blog.node.id">
      <a :href="blog.node.url">{{ blog.node.title }}</a>
    </div>

    <h1>🗄️ Archive</h1>
    <p>Writings from my old website</p>
    <div v-for="(post, index) in $page.archivedBlogs.edges" :key="index">
      <g-link :to="post.node.path">{{ post.node.title }}</g-link>
    </div>
  </Layout>
</template>

<page-query>
  query {
    archivedBlogs: allArchivedBlogs(order: ASC){
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
    articles: allDevToArticles(filter: {tags: {containsNone: ["devjournal"] }} order: ASC){
      edges {
        node{
          title
          path
        }
      }
    }
    devDiary: allDevToArticles(filter: {tags: {contains: ["devjournal"] }} order: ASC){
      edges {
        node{
          title
          url
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