<template>
<body>
  <div class="post">
    <div class="post-left">
      <div class="post-left_title">{{post.title}}</div>
      <div class="post-left_title_sub">{{post.title}}</div>
      <div class="post-left_border"></div>
      <div class="post-left_author">
        <p>{{post.decription}}</p>
      </div>
    </div>
    <div class="post-right">
      <div class="post-right_body">
        <p>{{post.content}}</p>
      </div>
      <div class="post-right_footer">
        <div class="post-right_footer_date">
          <p>{{createDate}}</p>
        </div>
        <div class="post-right_footer_pictos">
          <i class="fa fa-heart" aria-hidden="true"></i>
          <i class="fa fa-share-alt" aria-hidden="true"></i>
        </div>
      </div>
      <div class="container">
        <div class="comment-list">
          <ul ref="listComment">
            <li class="line-comment" v-for="comment in post.comments" :key="comment._id">
              <div>
                <h6>{{comment.content}}</h6>
              </div>
            </li>
          </ul>
        </div>
        <div class="form-comment">
          <form action="writeComment" @submit.prevent="writeComment">
            <input class="write-comment" type="text" v-model="comment">
            <input type="submit" style="display:none">
          </form>
        </div>
      </div>
    </div>
  </div>
</body>
</template>
<script>
/*eslint-disable*/
import axios from "axios";
import io from "socket.io-client";
import moment from "moment";

export default {
  name: "ViewPost",
  async mounted() {
    await this.getData();
    let channel = this.post._id;
    const postSocket = io.connect(
      "vue-app-bk-123.herokuapp.com/post",
      { forceNew: true }
    );
    this.postSocket = postSocket;
    postSocket.on(
      "connect",
      function() {
        postSocket.emit("join-room", channel);
        postSocket.on("comment-added", post => {
          this.post = post;
        });
      }.bind(this)
    );
  },
  data() {
    return {
      post: {
        _id: "",
        title: "",
        imgUrl: "",
        content: "",
        author: {},
        comments: []
      },
      comment: ""
    };
  },
  methods: {
    async getData() {
      try {
        const res = await axios.post(
          "https://vue-app-bk-123.herokuapp.com/graphql",
          {
            query: `{ userQuery { postFindOne(filter: {_id: "${
              this.$router.history.current.params.postId
            }"}) {_id title imgUrl decription profileId content author {_id name fullName} comments { profileId content _id } pravicy updatedAt createdAt } } }`
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
      console.log(this.$refs);
      if (this.comment != "")
        this.postSocket.emit("add-comment", {
          content: this.comment,
          token: this.$store.state.user.token,
          _id: this.post._id
        });
    }
  },
  destroyed() {
    // this.postSocket.emit('leave-room', this.post._id);
    // this.postSocket.emit('disconnect')
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
$white: #fefefe;
$dark: #484855;
$greyLight: #d1cfd2;
$greyDark: #9b999e;
$grey: #b9b5be;
$red: #ef5350;
body {
  height: 100vh;
  background: radial-gradient(circle, #d6a664, #f9cd8f);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: roboto;
}

h6 {
  margin: 0;
  padding: 0;
}

.post {
  display: flex;
  width: 1000px;
}
.post-left {
  width: 40%;
  background-color: $dark;
  color: white;
  padding: 3em;
  position: relative;
}
.post-left_title {
  font-size: 2em;
  text-transform: uppercase;
  font-weight: 700;
}
.post-left_title_sub {
  font-size: 2em;
  text-transform: uppercase;
  font-weight: 300;
  margin-top: 0.25em;
}
.post-left_border {
  border: 2px solid $red;
  width: 15%;
  margin-top: 1em;
}
.post-left_author {
  position: absolute;
  bottom: 2em;
  display: flex;
  align-items: center;
  img {
    width: 2.5em;
    margin-right: 1em;
    border: 1px solid $white;
    border-radius: 50%;
  }
}

.post-right {
  position: relative;
  width: 60%;
  background-color: $white;
  color: $dark;
}

.container {
  position: relative;
  height: 20%;
}

.comment-list {
  max-height: 60%;
  // float: left;
  overflow: scroll;
  &::after {
    content: "";
    clear: both;
  }
}

.line-comment {
  display: block;

  // float: left;
  background: #9b999e;
  margin: 0;
  padding: 0;
  &::after {
    content: "";
    clear: both;
  }
}

.form-comment {
  width: 100%;
  text-align: center;
  padding: 5px;
  margin: 2px;
  height: auto;
}

.post-right_body {
  line-height: 2;
  padding: 2em;
  p {
    margin-top: 1em;
    span {
      font-size: 2em;
    }
  }
}
.post-right_footer {
  display: flex;
  position: relative;
  justify-content: space-between;
  box-shadow: 0px -4px 3px -2px rgba(0, 0, 0, 0.1);
  padding: 2em;
}
.post-right_footer_date {
  text-transform: uppercase;

  span {
    font-weight: 700;
  }
}
.post-right_footer_pictos {
  position: relative;
  font-size: 1.5em;
  margin-right: 1em;
  .fa-heart {
    color: $red;
    margin-right: 1em;
  }
}
</style>

