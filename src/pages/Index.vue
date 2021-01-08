<template>
  <Layout>
    <h1>👨‍💻 Dev Blogs</h1>
    <p class="subtext">Web development and ramblings about programming</p>
    <div class="post" v-for="blog in $page.articles.edges" :key="blog.node.id">
      <g-link :to="blog.node.path">{{ blog.node.title }}</g-link>
      <p class="timestamp">posted on : {{ new Date(blog.node.published_at).toDateString() }}</p>
    </div>

    <h1>📘 Dev Journal</h1>
    <p>Stories of success and mishaps whilst working on side projects</p>
    <div class="post" v-for="blog in $page.devDiary.edges" :key="blog.node.id">
      <a :href="blog.node.url">{{ blog.node.title }}</a>
      <p class="timestamp">posted on : {{ new Date(blog.node.published_at).toDateString()}}</p>
    </div>

    <h1>🗄️ Archive</h1>
    <p>Writings from my old website</p>
    <div class="post" v-for="(post, index) in $page.archivedBlogs.edges" :key="index">
      <g-link :to="post.node.path">{{ post.node.title }}</g-link>
      <p class="timestamp">posted on : {{  new Date(post.node.date).toDateString() }}</p>
    </div>
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
    articles: allDevToArticles(filter: {tags: {containsNone: ["devjournal"] }} order: ASC){
      edges {
        node{
          title
          path
          published_at
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
</style>