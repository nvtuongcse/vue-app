<template>
  <div class="post">
    <h4>{{title}}</h4>
    <img class="thumbnail" :src="imgScr" @click="onClick">
    <p>{{shortContent}}</p>
    <div class="w3-modal" v-bind:style="mStyle" @click="onClick">
      <img :src="imgScr">
    </div>
  </div>
</template>
<script>
export default {
  name: "Post",
  props: {
    id: Number,
    imgScr: String,
    title: String,
    shortContent: String
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

.right-posts .post {
  position: relative;
  border: 1px solid gray;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 300px;
  height: auto;
  padding: 10px 10px 10px 10px;
  border-radius: 1px;
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
img.thumbnail {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 200px;
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
