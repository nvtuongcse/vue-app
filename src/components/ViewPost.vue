<template>
  <div class="viewpost">
    <div class="post">
      <div class="post__left">
        <a href="#" class="post__left-title">{{post.title}}</a>
        <img :src="post.imgUrl" class="feature">
        <a href="#" class="post__left-footer">{{createDate}}</a>
        <!-- <div class="reaction-icon">
        <i class="fa fa-heart" aria-hidden="true"></i>
        <i class="fa fa-share-alt" aria-hidden="true"></i>
        </div>-->
      </div>
      <div class="three-d"></div>
      <div class="post__right">
        <div class="post__right-content">
          <div class="post-content">
            <p class="content">{{post.content}}</p>
          </div>
          <a class="n-comment">{{post.comments.lenght}}</a>
        </div>
        <div class="form-comment">
          <form action="writeComment" @submit.prevent="writeComment">
            <input class="write-comment" type="text" v-model="comment">
            <input type="submit" style="display:none">
          </form>
        </div>
        <div class="post__right-footer" ref="listComment">
          <div class="list-comment">
            <ul ref="list">
              <li
                class="line-comment"
                v-for="comment in post.comments"
                :key="comment._id"
                ref="lineComment"
              >{{comment.content}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import axios from "axios";
import moment from "moment";
import io from "socket.io-client";

export default {
  name: "ViewPost",
  async mounted() {
    console.log("On mounted");
    await this.getData();
    let channel = this.post._id;
    const postSocket = io.connect(
      "localhost:3000/post",
      { forceNew: true }
    );
    this.postSocket = postSocket;
    postSocket.on("connect", () => {
      console.log(channel);
      postSocket.emit("join-room", channel);
      postSocket.on("comment-added", post => {
        this.post = post;
        this.$nextTick(() => {
          this.$refs.listComment.scrollTop = 21 * this.post.comments.length;
        });
        this.comment = "";
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
        comments: []
      },
      comment: ""
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
            }"}) {_id title imgUrl decription profileId content comments { profileId content _id } pravicy updatedAt createdAt } } }`
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
    writeComment() {
      if (this.comment != "")
        this.postSocket.emit("add-comment", {
          content: this.comment,
          token: this.$store.state.user.token,
          _id: this.post._id
        });
    }
  },
  destroyed() {
    this.postSocket.disconnect();
  },
  computed: {
    createDate: function() {
      const createdDate = new Date(this.post.createdAt);
      return moment(createdDate).format("MMM Do YY");
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: inherit;
}
html {
  font-size: 62.5%;
}

body {
  background: white;
  box-sizing: border-box;
}
.post {
  position: relative;
  margin: 10rem auto;
  width: 50rem;
  height: 20rem;
  &::after {
    clear: both;
  }
  border-radius: 5px;
}
.post__left {
  top: -1rem;
  left: -1rem;
  border-right: 0.5px solid rgba(128, 128, 128, 0.363);
  position: absolute;
  float: left;
  width: 20rem;
  height: 20rem;
  background: whitesmoke;
  text-align: center;
  position: relative;
  box-shadow: 15px 10px 5px 0px gray;
}
.post__right {
  display: inline-block;
  width: 30rem;
  height: 20rem;
  background: whitesmoke;
  box-shadow: 2px 2px 5px gray;
  border-radius: 2px;
}

.post__right-content {
  background: whitesmoke;
  width: 30rem;
  height: 14rem;
  padding: 0.5rem;
  border-radius: 5px;
}

.post__right-footer {
  background: whitesmoke;
  height: 5rem;
  width: 30rem;
  overflow: scroll;
  border-radius: 5px;
}
.post__left-title {
  text-decoration: none;
  color: gray;
  font-size: 1.2rem;
  margin: auto;
  position: absolute;
  top: 2rem;
  left: 10rem;
  transform: translate(-50%, -50%);
}
.post__left-footer {
  text-decoration: none;
  color: gray;
  font-size: 1rem;
  margin: auto;
  position: absolute;
  bottom: 1rem;
  left: 2rem;
}
.feature {
  position: relative;
  width: 18rem;
  height: 12rem;
  top: 3.2rem;
  object-fit: scale-down;
  box-shadow: 2px 2px 1px 0px gray;
}
.post-content {
  margin: auto;
  width: 25rem;
  height: 13rem;
  background: whitesmoke;
  overflow: scroll;
  box-sizing: border-box;
}
.content {
  margin: 0.5rem;
}
.n-comment {
  margin-left: 5rem;
}

.list-comment {
  width: 25rem;
  height: 5rem;
  margin: 0.4rem auto 0.5rem auto;
}
.line-comment {
  text-align: left;
  height: 1rem;
  width: 24.5rem;
  margin: 0.2rem;
  font-size: 0.75rem;
  background: rgba(245, 245, 245, 0);
}
.form-comment {
  line-height: 0;
  width: 25rem;
  margin: auto;
  margin-bottom: 0.5rem; 
  height: 1rem;
}
.write-comment {
  outline: none;
  border: none;
  width: 25rem;
  border-radius: 4px;
  height: 1rem;
  font-size: 0.75rem;
  padding: 0.1rem;
}

.three-d {
  position: absolute;
  background: linear-gradient(to right, whitesmoke, gray);
  left: 19rem;
  top: -1rem;
  width: 1rem;
  height: 21rem;
  clip-path: polygon(0 0, 100% 1rem, 100% 100%, 0 20rem);
}
</style>
