<template>
  <div class="find-friend">
    <a class="title">Find your friends...</a>
    <div class="container">
      <form action="submit-email" @submit.prevent="findAFriend">
        <input type="text" v-model="email" placeholder="Your friend's email...">
        <input type="submit" v-show="false">
      </form>
      <div class="loader" v-show="spiner"></div>
      <ul class="list-friend" v-for="user in users" :key="user._id">
        <li @click="sendFriendRequest(user)">
          <figure class="fir-image-figure">
            <img
              class="fir-author-image fir-clickcircle"
              src="https://fir-rollup.firebaseapp.com/de-sm.jpg"
              alt="David East - Author"
              @click="viewProfile(user._profileId)"
            >
            <figcaption>
              <div class="fig-author-figure-title">{{user.email}}</div>
              <div class="option">
                <img src="../assets/checked.png" class="icon">
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import axios from "axios";
import { remove } from 'lodash'
export default {
  name: "findFriend",
  methods: {
    async findAFriend() {
      this.spiner = true;
      try {
        const res = await axios.post(
          "https://vue-app-bk-123.herokuapp.com/graphql",
          {
            query: `{userQuery {userPaginantion(filter: {email: "${
              this.email
            }"}) {items { _id email profileId }}}}`
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: this.$store.state.user.token
            }
          }
        );
        this.users = res.data.data.userQuery.userPaginantion.items;
        this.spiner = false;
      } catch (error) {
        return error;
      }
    },
    sendFriendRequest(user) {
      this.spiner = true;
      axios
        .post(
          "https://vue-app-bk-123.herokuapp.com/graphql",
          {
            query: `mutation{ userMutation{ sendFriendRequest(filter: { _id: "${
              user.profileId
            }"} record: {})}}`
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: this.$store.state.user.token
            }
          }
        )
        .then(res => {
          this.spiner=false;
          remove(this.users, user)
          if (res.data.errors)
            return this.$toasted.error(res.data.errors[0].message);
          this.$toasted.success("Your request has been sent!");
        });
      
    }
  },
  data() {
    return {
      email: "",
      users: [],
      spiner: false
    };
  }
};
</script>

<style scoped>
.find-friend {
  background: whitesmoke;
  width: 100%;
  min-height: 100%;
  padding-top: 60px;
}

.title {
  color: #33691e;
  font-size: 1.5rem;
}

.container {
  width: 45%;
  height: 15rem;
  overflow: scroll;
  margin: auto;
  background-image: linear-gradient(to right, #b2ff59, #ccff90);
  border-radius: 5px;
  box-shadow: 2px 3px 10px gray;
}

.icon {
  width: 1rem;
  height: 1rem;
}

.list-friend {
  width: 20rem;
  margin: auto;
}

input[type="text"] {
  width: 25rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  resize: vertical;
  font-size: 0.75rem;
  height: 1rem;
  outline: none;
  margin-top: 2rem;
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
  animation: fadeInFadeOut 0.2s ease-in;
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
}
.loader {
  margin: auto;
  border: 2px solid gray;
  border-radius: 50%;
  border-top: 2px solid greenyellow;
  width: 12px;
  height: 12px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

@keyframes fadeInFadeOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>

