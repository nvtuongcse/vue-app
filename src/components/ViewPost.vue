<template>
  <div class="post">
    <h4>{{post.title}}</h4>
    <img class="thumbnail" :src="post.imgUrl">
    <p>{{post.content}}</p>
    <ul>
      <li
        v-for="comment in post.comments"
        :key="comment._id"
      >{{comment.content}}-{{comment.profileId}}</li>
    </ul>
    <input type="text" v-model="comment">
    <button @click="writeComment">Send</button>
  </div>
</template>
<script>
/*eslint-disable*/
import { socket } from "../socketIO";
import axios from "axios";

export default {
  name: "ViewPost",
  mounted() {
    this.getData();
    socket.on("connect", function() {
      console.log("On connect")
      socket.emit("join-room", this.post._id);
      socket.on("addedComment", post => {
        console.log("On add comment")
        this.post = post;
      });
    });
  },
  data() {
    return {
      post: {
        _id: "",
        title: "",
        imgUrl: "",
        content: "",
        comments: [],
      },
      comment: "",
    };
  },
  methods: {
    async getData() {
      try {
        const res = await axios.post(
          "http://localhost:3000/graphql",
          {
            query: `{ userQuery { postFindOne(filter: {_id: "${
              this.$router.history.current.params.postId
            }"}) { title imgUrl decription profileId content comments { profileId content _id } pravicy updatedAt createdAt } } }`
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: this.$store.state.user.token
            }
          }
        );
        this.post = res.data.data.userQuery.postFindOne;
      } catch (error) {
        return error;
      }
    },
    writeComment(){
      if(this.comment != "")
      socket.emit("addComment", {
        comment: this.comment, profileId: this.$store.state.user.token, _id: this.post._id 
      })
    }
  }
};
</script>
<style scoped>
.post {
  position: relative;
  width: auto;
  height: auto;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px solid gray;
}

h4 {
  text-align: left;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 50px;
  font-size: 15px;
  overflow: hidden;
  font-weight: bold;
  color: black;
}
.thumbnail {
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
}

p {
  padding: 0;
  margin: 0;
  height: 45px;
  font-size: 11px;
  text-align: left;
  justify-content: flex-start;
  overflow: hidden;
  font-family: monospace;
}
</style>
