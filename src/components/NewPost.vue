<template>
  <div class="newPost">
    <div class="container">
      <input type="text" placeholder="Title" v-model="title">
      <img :src="imgUrl" v-show="uploaded">
      <textarea cols="30" rows="10" placeholder="Start writing here..." v-model="content"></textarea>
      <div class="publish">
        <a @click="$refs.fileInput.click()" v-show="!uploaded">Add a feature image...</a>
        <div class="loader" v-show="spiner"></div>
        <input type="file" style="display: none" @change="onFileSelected" ref="fileInput">
        <button class="btn-publish" @click="publish">Ready to publish!</button>
        <select v-model="pravicy">
          <option disabled value>Pravicy</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="friend">Friend</option>
        </select>
      </div>
    </div>
  </div>
</template>


<script>
/*eslint-disable*/
import axios from "axios";
import firebase from "firebase";


var config = {
  apiKey: "AIzaSyBXKNNFRILZTBM6-ef0sC7DEub5-cj5nsg",
  authDomain: "vueapp-7df9f.firebaseapp.com",
  databaseURL: "https://vueapp-7df9f.firebaseio.com",
  projectId: "vueapp-7df9f",
  storageBucket: "vueapp-7df9f.appspot.com",
  messagingSenderId: "451921017761"
};
firebase.initializeApp(config);

export default {
  name: "newPost",
  methods: {
    async onFileSelected(event) {
      this.spiner = true;
      this.imageFile = event.target.files[0];
      const ref = firebase
        .app()
        .storage("gs://vueapp-7df9f.appspot.com/")
        .ref("images/" + this.imageFile.name);
      await ref.put(this.imageFile);
      this.imgUrl = await ref.getDownloadURL();
      this.$toasted.success("Upload successfully!");
      this.uploaded = true;
      this.spiner = false;
    },
    async publish() {
      try {
        const res = await axios.post(
          "http://localhost:3000/graphql",
          {
            query: `mutation{ userMutation{ postCreateOne(record: { title: "${
              this.title
            }" content: "${this.content}" imgUrl: "${this.imgUrl}" pravicy: ${
              this.pravicy
            } }){ recordId } } }`
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: this.$store.state.user.token
            }
          }
        );
        if (!res.data.data.userMutation.postCreateOne.recordId)
          return this.$toasted.error(res.data.errors[0].message);
        this.$toasted.success("Your post has been published!");
        this.$router.push("/account");
      } catch (error) {
        this.$toasted.error(error.message);
      }
    }
  },
  data() {
    return {
      spiner: false,
      imageFile: null,
      uploaded: false,
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/vueapp-7df9f.appspot.com/o/images",
      title: "",
      content: "",
      pravicy: ""
    };
  }
};
</script>

<style scoped>
.newPost {
  background: whitesmoke;
  padding-top: 60px;
  width: 100%;
  min-height: 100%;
}

a {
  float: left;
  font-size: 12px;
  font-family: "Courier New", Courier, monospace;
}
a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.container {
  width: 60%;
  margin: auto;
}
img {
  width: 100%;
  height: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  box-shadow: 1px 1px 1px 1px gray;
}

.publish {
  text-align: center;
}
.publish::after {
  clear: both;
}

.btn-publish {
  height: 20px;
  font-size: 12px;
  float: right;
  margin: 2px;
  border: none;
  border-radius: 2px;
  color: white;
  background: greenyellow;
  outline: none;
  box-shadow: 2px 2px 2px gray;
}
.btn-publish:active {
  border: 1px solid gray;
}

.loader {
  float: left;
  border: 2px solid gray;
  border-radius: 50%;
  border-top: 2px solid greenyellow;
  width: 12px;
  height: 12px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

label {
  margin: 2px;
  float: right;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  color: gray;
}

input[type="text"] {
  border: none;
  background: whitesmoke;
  font-size: 24px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  width: 100%;
  outline: none;
  margin-bottom: 5px; 
  text-align: center;
  box-shadow: 1px 1px 1px 1px gray;
}
select {
  float: right;
  width: auto;
  height: 20px;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  margin: 2px;
  border: none;
  outline: none;
  border-radius: 2px;
  box-shadow: 2px 2px 2px gray;
  background: greenyellow;
  color: white;
}
textarea {
  border: none;
  font-family: "Courier New", Courier, monospace;
  width: 100%;
  margin: auto;
  padding: 5px;
  text-align: start;
  background: whitesmoke;
  /* border: 1px solid gray; */
  outline: none;
  box-shadow: 1px 1px 1px 1px gray;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
