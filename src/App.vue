<template>
  <div id="app">
    <CitySelect @changeFn="change" @toggleFn="toggle"/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  methods: {
    change: function (val) {
      console.log(val)
    },
    toggle: function (flag) {
      console.log(flag)
    }
  }
}
</script>
