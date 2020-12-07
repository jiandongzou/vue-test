<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <img src="../assets/logo.png">
     <button @click="getData()">获取数据</button>
      <div class="box"></div>
      <router-link :to="{path: '/http'}">显示商品图片</router-link>
       <test></test>
  </div>

</template>

<script>
import test from './test.vue'
export default {
  name: 'home',
   components: {
  test
  },
  props: {
    msg: String
  },
   components: {
    test
  },
  methods:{
    getData(){
     console.log("111")
      this.$api.getData({}).then(rep=>{
         console.log(rep);
         alert("33333");
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 0px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.box{
  width:100px;
  height:100px;
  background:blue;
  border-radius:50%;
  margin:0 auto;
  transform:translate(0,30px);
}
</style>
