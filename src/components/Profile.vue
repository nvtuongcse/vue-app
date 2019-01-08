<template>
  <div class="profile">
    <div class="container">
      <div class="avatar-container">
        <img class="avatar" src="https://www.w3schools.com/w3images/falls2.jpg" alt="avatar">
      </div>
      <div class="name">
        <h2>{{nickName}}</h2>
        <h5>{{fullName}}</h5>
        <button v-show="isSelf">Add Friend!</button>
      </div>
      <div class="detail">
        <p>{{detail}}</p>
      </div>
    </div>
    <div class="follow">
      <div class="n-posts">
        <h3>{{nPosts}}</h3>
        <h4>Posts</h4>
      </div>
      <div class="line"></div>
      <div class="n-friends">
        <h3>{{nFriends}}</h3>
        <h4>Friends</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {};
  },
  props: {
    isSelf: Boolean,
    nPosts: Number,
    nFriends: Number,
    nickName: String,
    fullName: String,
    detail: String
  }
};
</script>

<style scoped>
.profile {
  min-width: 100%;
  height: auto;
  box-shadow: 2px 2px 2px gray;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.container {
  min-width: 100%;
  display: flex;
}
.detail {
  float: left;
  text-align: center;
  width: 65%;
  position: relative;
}
.avatar-container {
  float: left;
  position: relative;
  margin: auto;
  width: 30%;
  height: auto;
  padding: 5px;
}
.name {
  float: left;
  text-align: left;
  width: 20%;
  margin: auto;
  position: relative;
}

.follow {
  display: flex;
  background: silver;
  height: auto;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.n-posts {
  width: 75%;
  text-align: center;
}
.n-friends {
  width: 25%;
  text-align: center;
}

h3,
h4 {
  font-family: "Courier New", Courier, monospace;
  margin: auto;
  padding: 0px !important;
  color: gray !important;
}

.line {
  background: white;
  width: 2px;
  margin-top: 10px;
  margin-bottom: 10px;
}

button {
  width: 80px;
  height: 25px;
  font-size: 10px;
  color: white;
  background-color: gray;
  outline: none;
  border: none;
  border-radius: 2px;
  margin: 0;
  padding: 5px;
}

button:active {
  color: gray;
  background: white;
  outline: none;
  margin: 0;
  padding: 5px;
}

img.avatar {
  padding: 5px;
  display: block;
  border-radius: 50%;
  border: 1px solid gray;
  width: 120px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
}

h3 {
  font-weight: bold;
  font-size: 15px;
}

h2,
h5 {
  margin: auto;
  padding: auto;
}
h4 {
  font-size: 10px;
  font-weight: lighter;
}

p {
  margin: 0px;
  position: absolute;
  text-align: left;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  font-family: monospace;
  font-size: 12px;
  color: gray;
  width: 300px;
}
</style>
