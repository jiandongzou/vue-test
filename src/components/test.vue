<template>
  <div>
    <button ref="buttonA" @click="handClickA">buttonA</button>
    <button @click="handClickB">buttonB</button>
  </div>
</template>
<script>
export default {
  name:"login",
  data() {
    return {
    };
  },
  methods: {
    handClickA () {
      console.log('buttonA上的点击事件触发了')
    },
    handClickB () {
      this.$refs.buttonA.$el.click()
    }
  }
};
</script>
