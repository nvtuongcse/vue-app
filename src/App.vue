<template>
  <div id="app">
    <ul class="nav-bar">
      <li class="right" v-show="!this.$store.state.user.token">
        <router-link to="/Login">Login</router-link>
      </li>
      <li class="right" v-show="this.$store.state.user.token" @click="logout">
        <a href="/">Logout</a>
      </li>
      <li>
        <img class="logo" src="./assets/logo.png" alt="Logo">
      </li>
      <li>
        <router-link to="/Account">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/">Explore</router-link>
      </li>
    </ul>
    <router-view></router-view>
    <div class="float-menu" v-show="this.$store.state.user.token">
      <img class="float-button" type="image" @click="addPost" src="./assets/pencil.png">
      <button class="float-button" v-show="floatMenu">+</button>
      <button class="float-button" @click="floatMenu=!floatMenu">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      floatMenu: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("logOut", { ls: this.$localStorage });
    },
    addPost() {
      this.$router.push("/new-post");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

li a {
  display: block;
  text-decoration: none;
  line-height: 40px;
  font-weight: bold;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
}
li a:hover {
  color: gray;
}

.float-button {
  text-align: center;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 18px;
  color: white;
  background: gray;
  margin: 5px;
  border: none;
}

.float-menu {
  display: flex;
  z-index: 1;
  width: auto;
  height: auto;
  position: fixed;
  bottom: 25px;
  right: 30px;
  margin: 0px;
}
.nav-bar {
  z-index: 1;
  width: 100%;
  height: 55px;
  align-content: flex-start;
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: hidden;
  position: fixed;
  top: 0;
  background-color: whitesmoke;
  box-shadow: 2px 1px 2px gray;
}
li.right {
  float: right;
  justify-content: center;
  vertical-align: middle;
  display: inline-block;
  margin: 5px 5px 5px 5px;
}
a.router-view {
  height: 100%;
}

li {
  float: left;
  justify-content: center;
  vertical-align: middle;
  display: inline-block;
  margin: 5px 5px 5px 5px;
}
img.logo {
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  width: 30px;
  height: 30px;
}
</style>
