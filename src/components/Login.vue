
<template>
  <div class="login">
    <div class="container">
      <img class="logo" src="../assets/logo.png" alt>
      <h6>If you make customers unhappy in the physical world, they might each tell 6 friends. If you make customers unhappy on the Internet, they can each tell 6,000 friends.</h6>
      <div class="container">
        <form action="/login">
          <div class="row">
            <div class="col-25">
              <label for="email">Email</label>
            </div>
            <div class="col-75">
              <input v-model="email" type="text" placeholder="Email">
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="password">Password</label>
            </div>
            <div class="col-75">
              <input v-model="password" type="password" placeholder="Password">
            </div>
          </div>
          <div class="select">
            <a @click="signInOrSignUp='Sign In'">Already a User!</a>|
            <a @click="signInOrSignUp='Sign Up'">Not a User!</a>
          </div>
        </form>
        <button @click="signInSignUp">{{signInOrSignUp}}</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
/* eslint-disable */
export default {
  name: "Dashboard",
  props: {
    msg: String
  },
  methods: {
    signIn() {
      if (this.email != "" || this.password != "") {
        this.$store.dispatch("signIn", {
          email: this.email,
          password: this.password,
          router: this.$router,
          ls: this.$localStorage,
          toast: this.$toasted
        });
      }
    },
    signUp() {
      if (this.email != "" && this.password != "") {
        this.$store.dispatch("signUp", {
          email: this.email,
          password: this.password,
          router: this.$router,
          ls: this.$localStorage,
          toast: this.$toasted
        });
      }
    },
    signInSignUp() {
      if (this.signInOrSignUp == "Sign In") this.signIn();
      else this.signUp();
    }
  },
  data() {
    return {
      email: "",
      password: "",
      signInOrSignUp: "Sign In"
    };
  }
};
</script>

<style scoped>
.login {
  height: auto;
  width: 100%;
  min-height: 100%;
}
* {
  box-sizing: border-box;
}
h6 {
  font-family: monospace;
  font-size: 10px;
}
.login > .container {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

a:hover {
 cursor: pointer;
 color: aquamarine
}

.col-75 a {
  font-size: 12px;
}
.error-message {
  color: red;
  font-size: 12px;
  font-family: monospace;
}
.select {
  margin: 20px 0px 20px 0px;
}
a {
  text-decoration: underline;
}

img.logo {
  width: 120px;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 50%;
}

form {
  align-self: center;
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

input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 12px;
  height: 20px;
  outline: none;
}

label {
  padding: auto;
  font-size: 12px;
  display: inline-block;
}
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  max-width: 50%;
  margin: auto;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
button:hover {
  background-color: gray;
  border-radius: 4px;
}
button {
  margin: 20px;
  text-align: center;
  width: 80px;
  height: 25px;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
}
@media screen and (max-width: 600px) {
  .col-25,
  .col-75,
  input[type="submit"] {
    width: 100%;
    margin-top: 0;
  }
}

h3 {
  margin: 0;
}
</style>
