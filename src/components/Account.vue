<template>
  <div class="account">
    <profile
      :nickName="profile.name"
      :fullName="profile.fullName"
      :nFriends="profile.friends.length"
      :nPosts="profile.posts.length"
      :detail="profile.decription"
      v-show="showProfile"
    ></profile>
    <edit-profile
      :nickName="profile.name"
      :fullName="profile.fullName"
      :nFriends="profile.friends.length"
      :nPosts="profile.posts.length"
      :detail="profile.decription"
      v-show="!showProfile"
      save-profile="saveProfile"
    ></edit-profile>
    <input type="image" class="edit-button" src='' @click="editProfile">
    <div class="row">
      <div class="posts" v-show="showPostList">
        <ul>
          <li v-for="post in profile.posts" v-bind:key="post.id">
            <post :title="post.title" :shortContent="post.content" :imgScr="post.imgUrl"></post>
          </li>
        </ul>
      </div>
      <div class="friends" v-show="showFriendList">
        <ul>
          <li v-for="friend in profile.friends" v-bind:key="friend.id">
            <div class="friend-container">
              <img class="sm-avatar" src="https://www.w3schools.com/w3images/falls2.jpg">
              <h6>{{friend.fullName}}</h6>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import Profile from "./Profile.vue";
import EditProfile from "./EditProfile.vue";
import Post from "./Post.vue";
import axios from "axios";
export default {
  name: "Account",
  props: {
    msg: String
  },
  components: {
    Profile,
    EditProfile,
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
      floatMenu: true,
      showProfile: true,
      showFriendList: true,
      showPostList: true,
      edit: "Edit"
    };
  },
  async mounted() {
    this.getAccoutData();
    this.$root.$on("sendData", ({ name, fullName, decription }) => {
      this.profile = {
        ...this.profile,
        name,
        fullName,
        decription
      };
      this.$store.dispatch("updateProfile", {
        record: {
          name,
          fullName,
          decription
        },
        router: this.$router,
        ls: this.$localStorage,
        toast: this.$toasted
      });
    });
  },
  methods: {
    editProfile() {
      this.showProfile = !this.showProfile;
      if (this.edit == "Save") {
        this.edit = "Edit";
        this.$root.$emit("saveProfile");
      } else {
        this.edit = "Save";
        this.$root.$emit("editProfile", {
          name: this.profile.name,
          fullName: this.profile.fullName,
          detail: this.profile.decription
        });
      }
    },
    async getAccoutData() {
      try {
        const res = await axios.post(
          "http://localhost:3000/graphql",
          {
            query:
              "{userQuery {profileFindOne {name fullName decription friends{ _id name fullName decription } posts{title imgUrl decription content pravicy}}}}"
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: this.$store.state.user.token
            }
          }
        );
        if (!res.data.data.userQuery.profileFindOne)
          this.$toasted.error(res.data.errors[0].message);
        else this.profile = res.data.data.userQuery.profileFindOne;
      } catch (error) {
        return error;
      }
    }
  },
  deactivated() {
    this.$root.$off(["sendData", "saveProfile", "editProfile"]);
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
  width: 25%;
  display: flex;
  float: left;
}
.friend-container {
  text-align: center;
  width: 100%;
}
.sm-avatar {
  float: left;
  width: 80px;
  height: 80px;
}
body {
  background: tomato;
}
h6 {
  margin: 0px;
  padding: 0px;
  font-size: 12px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
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
