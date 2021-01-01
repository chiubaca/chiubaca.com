<template>
  <Layout>
    <div class="article">
      <h1>{{ $page.post.title }}</h1>
      <span>{{ $page.post.date }}</span>

      <div class="content" v-html="$page.post.content" />
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.blogPost.title
    };
  }
};
</script>

<page-query>
  query archivedBlogs ($path: String!) {
    post: archivedBlogs (path: $path) {
      title
      date
      content
    }
  }
</page-query>

<style>
/* .header {
    margin-bottom: 70px;
  } */
.article {
  margin-top: 15px;
}
.article h1 {
  font-size: 40px;
}
.article img {
  width: 100%;
  border-radius: 5px;
}
.article a {
  color: #4dba87;
  text-decoration: underline;
}
.article a:hover {
  text-decoration: none;
}
.article span {
  font-size: 80%;
  margin-bottom: 20px;
}
.article ol,
.article ul {
  list-style-position: outside;
}
.article ul {
  list-style: disc;
  padding-left: 20px;
}
.article .content p:first-child {
  margin-top: 15px;
}
.article .content p {
  margin-top: 0;
  margin-bottom: 10px;
  line-height: 1.5;
}
</style>