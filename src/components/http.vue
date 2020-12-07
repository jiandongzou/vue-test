<template>
  <div class="hello">
   
     <button @click="getData()">获取数据</button>
    
  </div>

</template>

<script>
export default {
  name: 'http',
    data() {
    return {
		cancle:null
    }
  },
  mounted(){
    console.log(this.$router);
    console.log(this.$route);
  },
  methods:{
    getData(){
      this.$apis.getData({},this,this.cancel).then(rep=>{
         console.log(rep);
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
}
</style>
