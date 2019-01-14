<template>
  <div class="pro-post">
    <div class="card">
      <div class="thumbnail">
        <img class="left" :src="imgUrl">
      </div>
      <div class="right">
        <h1>{{title}}</h1>
        <div class="author">
          <h2>{{createDate}}</h2>
        </div>
        <div class="separator"></div>
        <p>{{content}}</p>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import axios from "axios";
import moment from "moment";
export default {
  name: "Post",
  props: {
    _id: Number,
    imgUrl: String,
    title: String,
    content: String,
    createdAt: String
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
  },
  computed: {
    createDate: function() {
      const createdDate = new Date(this.createdAt);
      console.log(createdDate);
      return moment(createdDate).format("MMM Do YY");
    }
  }
};
</script>

<style lang="sass" scoped>

@import url(https://fonts.googleapis.com/css?family=Lato)


.pro-post 
	font-family : 'Lato', sans-serif

/* The card */
.card
	position : relative
	height : 360px
	width : 780px
	margin : 20px auto
	background-color : #FFF
  :after 
    bottom: -2px
    right: 1px
    width: 8px
    height: 4px
  :before
    transition: all .15s linear 0s
    content: ''
    position: absolute
    bottom: -4px
    right: 2px
    width: 4px
    height: 4px
    background-color: #404040
    transform: rotate(45deg)
    z-index: -1
    




/* Image on the left side */
.thumbnail 
	float : left
	position : relative 
	left : 15px
	top : -15px
	height : 300px
	width : 500px
	-webkit-box-shadow: 10px 10px 60px 0px rgba(0,0,0,0.75)
	-moz-box-shadow: 10px 10px 60px 0px rgba(0,0,0,0.75)
	box-shadow: 10px 10px 60px 0px rgba(0,0,0,0.75)
	overflow: hidden
/*object-fit: cover;*/
/*object-position: center;*/

img.left
	position: absolute
	left: 50%
	top: 50%
	height: auto
	width: 100%
	-webkit-transform: translate(-50%,-50%)
	-ms-transform: translate(-50%,-50%)
	transform: translate(-50%,-50%)

/* Right side of the card */
.right
	margin-left : 550px
	margin-right : 20px

h1
	padding-top : 15px
	font-size : 1.3rem
	color : #4B4B4B

.author
	background-color : #9ECAFF
	height : 30px
	width : 110px
	border-radius : 20px
  text-align : center

.author>img
	padding-top : 10px
	margin-left : 10px
	float : left
	height : 15px
	width : 15px
	border-radius : 50%

h2
	padding-top : 8px
	margin-right : 10px
	text-align : left
	font-size : 0.8rem
	color :white

.separator
	margin-top : 10px
	border : 1px solid #C3C3C3

p
	text-align: justify
	padding-top : 10px
	font-size : 0.95rem
	line-height: 150%
	color : #4B4B4B

/* DATE of release*/
h5
	position : absolute
	left : 30px
	bottom : -120px
	font-size : 6rem
	color : #C3C3C3

h6
	position : absolute
	left : 30px
	bottom : -55px
	font-size : 2rem
  font-family : "Lato"
	color : #C3C3C3

/* Those futur buttons */
ul
	margin-left : 250px

li
	display: inline
	list-style: none
	padding-right: 40px
	color : #7B7B7B

/* Floating action button */
.fab
	position : absolute
	right : 50px
	bottom : -40px
	box-sizing: border-box
	padding-top: 18px
	background-color : #1875D0
	width : 80px
	height : 80px
	color : white
	text-align : center
	border-radius : 50%
	-webkit-box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75)
	-moz-box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75)
	box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75)
</style>