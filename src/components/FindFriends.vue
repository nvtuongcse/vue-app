<template>
  <div class="find-friend">
    <div class="container">
      <input type="text" v-model="email">
      <input type="submit" @click="findAFriend">
      <ul v-for="user in users" :key="user._id">
        <li @click="sendFriendRequest(user)">{{user.email}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import axios from "axios";
export default {
  name: "findFriend",
  methods: {
    async findAFriend() {
      try {
        const res = await axios.post(
          "http://localhost:3000/graphql",
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
      } catch (error) {
        return error;
      }
    },
    sendFriendRequest(user) {
      console.log(user);
      axios
        .post(
          "http://localhost:3000/graphql",
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
          console.log(res);
          if (res.data.errors)
            return this.$toasted.error(res.data.errors[0].message);
          this.$toasted.success("Your request has been sent!");
        });
    }
  },
  data() {
    return {
      email: "",
      users: []
    };
  }
};
</script>

<style scoped>
.find-friend {
  background: tomato;
  width: 100%;
  min-height: 100%;
  padding-top: 60px;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 12px;
  height: 20px;
  outline: none;
}
</style>

