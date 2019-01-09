<template>
  <div class="explore">
    <div class="content">
      <div class="left-posts">
        <ul>
          <li v-for="post in posts" v-bind:key="post._id" @click="viewPost(post._id)">
            <post :title="post.title" :content="post.content" :imgUrl="post.imgUrl"></post>
          </li>
        </ul>
      </div>
      <div class="right-posts">
        <ul>
          <li v-for="post in posts" v-bind:key="post.id">
            <Post :content="post.title" :imgUrl="post.imgUrl"></Post>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import axios from "axios";
import Post from "./Post";
export default {
  name: "Explore",
  components: {
    Post
  },
  mounted() {
    this.getData();
  },
  methods: {
    viewPost(id) {
      this.$router.push(`/post/${id}`);
    },
    async getData() {
      try {
        const res = await axios.post(
          "http://localhost:3000/graphql",
          {
            query:
              "{userQuery {postPaginantion(sort: CREATEDAT_DESC) {items {_id title imgUrl decription content pravicy updatedAt createdAt}}}}"
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: this.$store.state.user.token
            }
          }
        );
        this.posts = res.data.data.userQuery.postPaginantion.items;
      } catch (error) {
        return error;
      }
    }
  },
  data() {
    return {
      posts: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.explore {
  display: flex;
  min-height: 100%;
  width: 100%;
  overflow: visible;
}

.content {
  width: 80%;
  margin: auto;
  align-self: center;
  display: flex;
}

.left-posts {
  display: flex;
  min-height: 100%;
  width: 75%;
}

.right-posts {
  display: flex;
  min-height: 100%;
  width: 50%;
}

body {
  background: orange;
}
h3 {
  margin: 0;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  height: 100%;
}
ul li:before {
  vertical-align: middle;
}
a {
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  color: #000000;
}
</style>
