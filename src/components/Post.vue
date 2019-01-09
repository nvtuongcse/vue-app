<template>
  <div class="post">
    <h4>{{title}}</h4>
    <img class="thumbnail" :src="imgUrl" @click="onClick">
    <p>{{content}}</p>
    <ul>
      <li></li>
    </ul>
    <div class="w3-modal" v-bind:style="mStyle" @click="onClick">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import axios from "axios";
export default {
  name: "Post",
  props: {
    _id: Number,
    imgUrl: String,
    title: String,
    content: String
  },
  data() {
    return {
      mStyle: {
        display: "none"
      }
    };
  },
  methods: {
    onClick() {
      this.mStyle.display === "block"
        ? (this.mStyle.display = "none")
        : (this.mStyle.display = "block");
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
