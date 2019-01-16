<template>
  <div class="account">
    <profile
      :nickName="profile.name"
      :fullName="profile.fullName"
      :nFriends="profile.friends.length"
      :nPosts="profile.posts.length"
      :detail="profile.decription"
    ></profile>
    <div class="row">
      <div class="posts" v-show="showPostList">
        <ul>
          <li v-for="post in profile.posts" v-bind:key="post.id">
            <post :title="post.title" :content="post.content" :imgUrl="post.imgUrl" :createdAt="post.createdAt"></post>
          </li>
        </ul>
      </div>
      <div class="friends" v-show="showFriendList">
        <ul>
          <li v-for="friend in profile.friends" v-bind:key="friend._id">
            <figure class="fir-image-figure">
              <img
                class="fir-author-image fir-clickcircle"
                src="https://fir-rollup.firebaseapp.com/de-sm.jpg"
                alt="David East - Author"
                @click="viewProfile(friend._id)"
              >
              <figcaption>
                <div class="fig-author-figure-title">{{friend.name}}</div>
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import Profile from "./Profile.vue";
import Post from "./post/Post.vue";
import axios from "axios";
export default {
  name: "Account",
  props: {
    msg: String
  },
  components: {
    Profile,
    Post
  },
  data() {
    return {
      profile: {
        name: "",
        fullName: "",
        decription: "",
        posts: [],
        friends: []
      },
      showFriendList: true,
      showPostList: true
    };
  },
  async mounted() {
    this.getAccoutData();
  },
  watch: {
    '$router' (to, from) {
      this.getAccoutData();
    }
  },
  methods: {
    viewProfile(_id) {
      this.$router.push(`/account/${_id}`);
    },
    async getAccoutData() {
      try {
        const res = await axios.post(
          "http://localhost:8000/graphql",
          {
            query: `{ userQuery { profilePaginantion(filter: {_id: "${
              this.$router.history.current.params.profileId
            }"}) { items { _id name decription fullName userId friends{_id name fullName userId} posts{_id title content createdAt} } } } }`
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: this.$store.state.user.token
            }
          }
        );
        if (res.data.errors) this.$toasted.error(res.data.errors[0].message);
        this.profile = res.data.data.userQuery.profilePaginantion.items[0];
      } catch (error) {
        return error;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row:after {
  content: "";
  display: table;
  clear: both;
}

.account {
  position: relative;
  min-width: 100%;
}
.edit-button {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 62px;
  right: 5px;
  border-radius: 50%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}

.posts {
  float: left;
  display: flex;
  width: 75%;
}
.friends {
  float: left;
  width: 25%;
  display: inline-block;
}
.option {
  display: flex;
  align-content: center;
  position: relative;
}
.icon {
  width: 14px;
  height: 14px;
  display: block;
  margin: 8px;
}

.detail a {
  text-decoration: underline;
  margin: 0;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.fir-clickcircle {
  height: 80px;
  width: 80px;
  border-radius: 100px;
  cursor: pointer;
}

.fir-image-figure {
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
}

.fir-image-figure .caption,
.fir-image-figure figcaption {
  padding-left: 15px;
}

.fir-image-figure .fig-author-figure-title {
  font-weight: bold;
  font-size: 12px;
}

.fir-imageover {
  position: relative;
  display: flex;
}

.fir-imageover-image {
  position: absolute;
  top: 0;
  left: 0;
  animation: fadeInFadeOut 2s infinite;
}

@keyframes fadeInFadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

li {
  width: 100%;
}

.detail {
  display: flex;
}

button {
  float: left;
  display: block;
}

.sm-avatar {
  float: left;
  width: 60px;
  height: 60px;
}
body {
  background: tomato;
}
h6 {
  margin: 0px;
  padding: 0px;
  font-size: 12px;
}
.detail h6 {
  float: left;
  margin: auto;
  clear: both;
  font-size: 12px;
  width: 100%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial;
}

.gallery {
  height: auto;
  width: auto;
}

.header {
  text-align: center;
  padding: 32px;
}

.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}
img {
  border-radius: 8px;
  box-shadow: 2px 1px 1px gainsboro;
}

.column img {
  margin-top: 8px;
  vertical-align: middle;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column {
    -ms-flex: 50%;
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    -ms-flex: 100%;
    flex: 100%;
    max-width: 100%;
  }
}
</style>
